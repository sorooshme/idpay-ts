import { BaseIDPayError } from "./BaseIDPayError";

/**
 * InvalidApiKeyLengthError Error.
 */
export class InvalidApiKeyLengthError extends BaseIDPayError {
  /**
   *
   * @param length Length of a valid API key.
   */
  constructor(length: number) {
    super(
      "InvalidApiKeyLengthError",
      `IDPay API key (MerchantCode) must have a length of ${length} characters.`
    );
  }
}
