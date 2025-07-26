(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-authorized (err u101))
(define-constant err-child-not-registered (err u102))
(define-constant err-invalid-address (err u103))
(define-constant err-already-registered (err u104))
(define-constant err-inactive-contract (err u999))

(define-map parent-child-registry 
  { parent: principal, child: principal } 
  {
    registration-date: uint,
    monitoring-enabled: bool,
    activity-count: uint
  }
)

(define-map child-activities
  { child: principal, activity-id: uint }
  {
    transaction-type: (string-ascii 50),
    amount: uint,
    timestamp: uint, ;; will be set to 0
    recipient: (optional principal),
    memo: (optional (string-ascii 100))
  }
)

(define-map child-activity-counters principal uint)
(define-data-var total-registrations uint u0)
(define-data-var contract-active bool true)

(define-public (register-child-wallet (child-address principal))
  (let (
    (parent tx-sender)
    (existing (map-get? parent-child-registry { parent: parent, child: child-address }))
  )
    (begin
      (asserts! (var-get contract-active) err-inactive-contract)
      (asserts! (not (is-eq parent child-address)) err-invalid-address)
      (asserts! (is-none existing) err-already-registered)

      (map-set parent-child-registry 
        { parent: parent, child: child-address }
        {
          registration-date: u0,
          monitoring-enabled: true,
          activity-count: u0
        })

      (map-set child-activity-counters child-address u0)
      (var-set total-registrations (+ (var-get total-registrations) u1))

      (ok {
        success: true,
        child: child-address,
        parent: parent
      })
    )
  )
)

(define-public (log-child-activity 
  (child-address principal)
  (transaction-type (string-ascii 50))
  (amount uint)
  (recipient (optional principal))
  (memo (optional (string-ascii 100)))
)
  (let (
    (parent tx-sender)
    (registration (map-get? parent-child-registry { parent: parent, child: child-address }))
  )
    (begin
      (asserts! (var-get contract-active) err-inactive-contract)
      (asserts! (is-some registration) err-child-not-registered)
      (let (
        (reg (unwrap! registration err-child-not-registered))
        (monitoring (get monitoring-enabled reg))
      )
        (asserts! monitoring err-not-authorized)
        (let (
          (current-id (default-to u0 (map-get? child-activity-counters child-address)))
          (new-id (+ current-id u1))
        )
          (begin
            (map-set child-activities
              { child: child-address, activity-id: new-id }
              {
                transaction-type: transaction-type,
                amount: amount,
                timestamp: u0,
                recipient: recipient,
                memo: memo
              })

            (map-set child-activity-counters child-address new-id)

            (map-set parent-child-registry 
              { parent: parent, child: child-address }
              {
                registration-date: (get registration-date reg),
                monitoring-enabled: (get monitoring-enabled reg),
                activity-count: new-id
              })

            (ok {
              success: true,
              activity-id: new-id,
              child: child-address
            })
          )
        )
      )
    )
  )
)

;; Read-only functions
(define-read-only (get-child-registration (parent principal) (child principal))
  (ok (map-get? parent-child-registry { parent: parent, child: child }))
)

(define-read-only (get-child-activity (child principal) (activity-id uint))
  (ok (map-get? child-activities { child: child, activity-id: activity-id }))
)

(define-read-only (get-child-stx-balance (child principal))
  (ok (stx-get-balance child))
)

(define-read-only (get-child-activity-count (child principal))
  (ok (default-to u0 (map-get? child-activity-counters child)))
)

(define-read-only (get-total-registrations)
  (ok (var-get total-registrations))
)

(define-read-only (is-child-registered (parent principal) (child principal))
  (ok (is-some (map-get? parent-child-registry { parent: parent, child: child })))
)

(define-read-only (get-contract-status)
  (ok {
    active: (var-get contract-active),
    total-registrations: (var-get total-registrations),
    contract-owner: contract-owner
  })
)
