import { PlainObjectType } from "../types";
import { BaseIDPayError } from "./BaseIDPayError";

/**
 * RejectedRequestWithInvalidErrorCode Error.
 */
export class RejectedRequestWithInvalidErrorCode extends BaseIDPayError {
  /**
   * Creates an instance of RejectedRequestWithInvalidErrorCode.
   *
   * @param errorCode IDPay numeric error code.
   * @param statusCode Response status code.
   * @param url Url of the request.
   * @param action Action of the request.
   * @param body Body of the response.
   */
  constructor(
    public errorCode: string,
    public statusCode: number,
    public url: string,
    public action: string,
    public body: PlainObjectType
  ) {
    super(
      "RejectedRequestWithInvalidErrorCode",
      `Response with status of ${statusCode} and invalid error code of ${errorCode} without persian message was received when '${action}' with url of '${url}', body is available at .body`
    );
  }
}
