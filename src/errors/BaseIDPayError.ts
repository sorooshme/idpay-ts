/**
 * All IDPay errors must extend this class.
 */
export abstract class BaseIDPayError extends Error {
  /**
   * Creates an instance of BaseIDPayError.
   *
   * @param name Name of the error.
   * @param message Message of the error.
   */
  constructor(public name: string, message?: string) {
    super(message);
  }
}
