export class DomainRuleError extends Error {
  constructor(message?: string) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message)

    this.name = 'DomainRuleError'

    if (message) {
      this.message = message
    }

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DomainRuleError)
    }
  }
}
