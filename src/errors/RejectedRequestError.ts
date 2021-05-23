import { PlainObjectType } from "../types";
import { BaseIDPayError } from "./BaseIDPayError";

/**
 * RejectedRequestError Error.
 */
export class RejectedRequestError extends BaseIDPayError {
  /**
   * Creates an instance of RejectedRequestError.
   *
   * @param errorCode IDPay numeric error code.
   * @param statusCode Response status code.
   * @param persianMessage Persian description of the error.
   * @param url Url of the request.
   * @param action Action of the request.
   * @param body Body of the response.
   */
  constructor(
    public errorCode: string,
    public statusCode: number,
    public persianMessage: string,
    public url: string,
    public action: string,
    public body: PlainObjectType
  ) {
    super(
      "RejectedRequestError",
      `Response with status of ${statusCode} and error code of ${errorCode} with persian message of ${persianMessage} received when '${action}' with url of '${url}', body is available at .body`
    );
  }
}
