import { AxiosProxyConfig } from "axios";

/**
 * IDPay Options.
 */
export interface IDPayOptions {
  /**
   * Whether environment is in sandbox or not.
   * @default false
   */
  sandbox?: boolean;

  /**
   * Default timeout for IDPay requests in miliseconds.
   * @default 20000
   */
  timeout?: number;

  /**
   * Proxy config if needed.
   *
   * @default undefined
   */
  proxy?: AxiosProxyConfig;
}

/**
 * Request methods.
 */
export type RequestMethod = "get" | "post";

/**
 * Interface for internal request options.
 */
export interface IDPayRequestOptions {
  /**
   * Relative path of the endpoint (Must start with '/')
   */
  path: string;

  /**
   * Method of the request.
   */
  method: RequestMethod;

  /**
   * Description of the action this request is doing.
   */
  action: string;
}

/**
 * Interface of a plain object.
 */
export interface PlainObjectType {
  /**
   * Any string key with an any value.
   */
  [key: string]: any;
}

/**
 * Interface for internal post request options.
 */
export interface IDPayPostRequestOptions<T = PlainObjectType>
  extends IDPayRequestOptions {
  /**
   * Body of the request.
   */
  body?: T;

  /**
   * Method of the post request.
   */
  method: "post";
}

/**
 * Options for creating an instance of axios.
 */
export interface CreateAxiosOptions {
  /**
   * Timeout for requests in miliseconds.
   */
  timeout: number;

  /**
   * API key of IDPay (MerchantCode)
   */
  apiKey: string;

  /**
   * Indicator for sandbox environment.
   */
  sandbox: boolean;

  /**
   * Proxy config if needed.
   *
   * @default undefined
   */
  proxy?: AxiosProxyConfig;
}

/**
 * Used internally to send request to IDPay.
 */
export interface IDPayCreatePaymentOption {
  order_id: string;
  amount: number;
  callback: string;
  name?: string;
  phone?: string;
  mail?: string;
  desc?: string;
}

/**
 * Creating payment options.
 */
export interface CreatePaymentOption {
  /**
   * Order id in your internal system.
   */
  orderId: string;

  /**
   * Amount of the transaction in Rial, should be between 1,000 and 500,000,000
   */
  amount: number;
  /**
   * Callback url to get redirected after transaction.
   */
  callback: string;

  /**
   * Description of the transaction.
   */
  description?: string;

  /**
   * Payer information.
   */
  payer?: {
    /**
     * Name of the payer.
     */
    name?: string;
    /**
     * Phone number of the payer.
     * @example "9382198592" | "09382198592" | "989382198592"
     */
    phoneNumber?: string;
    /**
     * Email address of the payer.
     */
    emailAddress?: string;
  };
}

/**
 * Interface for IDPay error codes.
 */
export interface IDPayErrors {
  [key: string]: {
    /**
     * Status code of the response.
     */
    statusCode: number;
    /**
     * Persian message from IDPay docs.
     */
    persianMessage: string;
  };
}

/**
 * Interface of IDPay's base response.
 */
export interface IDPayBaseResponse {
  /**
   * Numeric error code.
   */
  error_code?: string | number;
  /**
   * Persian description of the error.
   */
  error_message?: string;
}

/**
 * Formatted response interface.
 */
export interface FormattedResponse<T> {
  /**
   * Status code of the response.
   */
  statusCode: number;
  /**
   * Body of the response.
   */
  body: T;
}

/**
 * Created transaction response.
 */
export interface CreatePaymentResponse {
  /**
   * ID of the transaction.
   */
  id: string;
  /**
   * Link to the transaction gateway.
   */
  link: string;
}

/**
 * Verifying payment options.
 */
export interface VerifyPaymentOption {
  /**
   * Order ID that you sent to IDPay when creating the transaction.
   */
  orderId: string;
  /**
   * ID of the transaction that IDPay returned to you after creating transaction.
   */
  id: string;
}

/**
 * Used internally to send request to IDPay.
 */
export interface IDPayVerifyPaymentOption {
  order_id: string;
  id: string;
}

/**
 * Verified transaction response.
 */
export interface VerifyPaymentResponse {
  /**
   * IDPay status code.
   */
  status: number;
  /**
   * Track id of the transaction.
   */
  track_id: string;
  /**
   * ID of the transaction that IDPay returned to you after creating transaction.
   */
  id: string;
  /**
   * Order ID that you sent to IDPay when creating the transaction.
   */
  order_id: string;
  /**
   * Amount of the transaction in Rial.
   */
  amount: string;
  /**
   * Transaction creation timestamp.
   */
  date: string;
  /**
   * Payment information.
   */
  payment: {
    /**
     * Track id of the payment.
     */
    track_id: string;
    /**
     * Amount of the payment.
     */
    amount: string;
    /**
     * Censored version of the card number.
     */
    card_no: string;
    /**
     * Hash of the payment.
     */
    hashed_card_no: string;
    /**
     * Timestamp of the payment.
     */
    date: string;
  };
  /**
   * Transaction verification information.
   */
  verify: {
    /**
     * Timestamp of the verification.
     */
    date: string;
  };
}
