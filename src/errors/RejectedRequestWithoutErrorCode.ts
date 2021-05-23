import { PlainObjectType } from "../types";
import { BaseIDPayError } from "./BaseIDPayError";

/**
 * RejectedRequestWithoutErrorCode Error.
 */
export class RejectedRequestWithoutErrorCode extends BaseIDPayError {
  /**
   * Creates an instance of RejectedRequestWithoutErrorCode.
   *
   * @param statusCode Response status code.
   * @param url Url of the request.
   * @param action Action of the request.
   * @param body Body of the response.
   */
  constructor(
    public statusCode: number,
    public url: string,
    public action: string,
    public body: PlainObjectType
  ) {
    super(
      "RejectedRequestWithoutErrorCode",
      `Response with status of ${statusCode} without error code and persian message was received when '${action}' with url of '${url}', body is available at .body`
    );
  }
}
