import {
  InvalidApiKeyLengthError,
  RejectedRequestError,
  RejectedRequestWithInvalidErrorCode,
  RejectedRequestWithoutErrorCode,
} from "./errors";
import {
  CreateAxiosOptions,
  CreatePaymentOption,
  CreatePaymentResponse,
  FormattedResponse,
  IDPayBaseResponse,
  IDPayCreatePaymentOption,
  IDPayOptions,
  IDPayPostRequestOptions,
  IDPayRequestOptions,
  IDPayVerifyPaymentOption,
  VerifyPaymentOption,
  VerifyPaymentResponse,
} from "./types";
import axios, { AxiosInstance, AxiosProxyConfig, AxiosResponse } from "axios";
import IDPayErrorCodes from "./IDPayErrors";

/**
 * IDPay class.
 */
export class IDPay {
  /**
   * Valid API key length.
   */
  public static readonly VALID_APIKEY_LENGTH: number = 36;

  /**
   * IDPay's base API url.
   */
  public static readonly BASE_URL: string = "https://api.idpay.ir/v1.1";

  /**
   * IDPay's header name for API key.
   */
  public static readonly API_KEY_HEADER_NAME: string = "X-API-KEY";

  /**
   * IDPay's header name for sandbox mode.
   */

  public static readonly SANDBOX_HEADER_NAME: string = "X-SANDBOX";

  /**
   * Whether environment is sandbox or not.
   */
  public readonly isSandBox: boolean;

  /**
   * Timeout for requests in miliseconds.
   */
  public readonly timeout: number;

  /**
   * Base Axios to be used for requests.
   */
  private baseAxios: AxiosInstance;

  /**
   * Creates an instance of IDPay
   *
   * @param apiKey Merchant code of your gateway (Must be 36 characters long)
   * @param options IDPay options.
   */
  constructor(public readonly apiKey: string, options?: IDPayOptions) {
    IDPay.checkApiKeyLength(this.apiKey);
    this.isSandBox = options?.sandbox || false;
    this.timeout = options?.timeout || 20000;
    this.baseAxios = IDPay.createAxiosInstance({
      apiKey: this.apiKey,
      sandbox: this.isSandBox,
      timeout: this.timeout,
      proxy: options?.proxy,
    });
  }

  /**
   * Sets a proxy to be used, if needed. (replaces if any other proxy is already configured.)
   *
   * @param proxy Proxy config to be used.
   */
  public setProxy(proxy: AxiosProxyConfig) {
    this.baseAxios = IDPay.createAxiosInstance({
      apiKey: this.apiKey,
      sandbox: this.isSandBox,
      timeout: this.timeout,
      proxy,
    });
  }

  /**
   * Creates an instance of axios to be used for requests.
   *
   * @param option Options for creating axios.
   */
  private static createAxiosInstance(option: CreateAxiosOptions) {
    return axios.create({
      baseURL: IDPay.BASE_URL,
      timeout: option.timeout,
      headers: {
        [IDPay.API_KEY_HEADER_NAME]: option.apiKey,
        [IDPay.SANDBOX_HEADER_NAME]: option.sandbox ? 1 : 0,
      },
      proxy: option.proxy,
      validateStatus(status) {
        return status < 500;
      },
    });
  }

  /**
   * Checks provided API key's length. (MerchantCode)
   *
   * @param apiKey API key to be checked.
   */
  public static checkApiKeyLength(apiKey: string) {
    if (apiKey.length !== IDPay.VALID_APIKEY_LENGTH) {
      throw new InvalidApiKeyLengthError(IDPay.VALID_APIKEY_LENGTH);
    }
  }

  /**
   * Send a request to IDPay's API.
   *
   * @param option Options for sending the request.
   */
  private async request<T>(
    option: IDPayRequestOptions | IDPayPostRequestOptions
  ): Promise<FormattedResponse<T>> {
    const response = await this.baseAxios.request<T>({
      url: option.path,
      method: option.method,
      data: "body" in option ? option.body : undefined,
      timeoutErrorMessage:
        "IDPay request did not receive a response within allowed time frame.",
    });

    this.handleRequestPossibleError(response, option.path, option.action);

    return {
      body: response.data,
      statusCode: response.status,
    };
  }

  private handleRequestPossibleError(
    response: AxiosResponse<IDPayBaseResponse>,
    url: string,
    action: string
  ) {
    if (response.status < 400) {
      return;
    }

    if (response.data.error_code === undefined) {
      throw new RejectedRequestWithoutErrorCode(
        response.status,
        url,
        action,
        response.data
      );
    }
    const idpayErrorCode =
      typeof response.data.error_code === "number"
        ? response.data.error_code.toString()
        : response.data.error_code;

    const errorCode = IDPayErrorCodes[idpayErrorCode];

    if (errorCode === undefined) {
      throw new RejectedRequestWithInvalidErrorCode(
        idpayErrorCode,
        response.status,
        url,
        action,
        response.data
      );
    }

    throw new RejectedRequestError(
      idpayErrorCode,
      response.status,
      errorCode.persianMessage,
      url,
      action,
      response.data
    );
  }

  public async createPayment(option: CreatePaymentOption) {
    const idpayOptions: IDPayCreatePaymentOption = {
      amount: option.amount,
      callback: option.callback,
      order_id: option.orderId,
      desc: option.description,
      mail: option.payer?.emailAddress,
      name: option.payer?.name,
      phone: option.payer?.phoneNumber,
    };

    const response = await this.request<CreatePaymentResponse>({
      path: "/payment",
      method: "post",
      body: idpayOptions,
      action: "Creating Payment",
    });

    return response;
  }

  public async verifyPayment(option: VerifyPaymentOption) {
    const idpayOptions: IDPayVerifyPaymentOption = {
      id: option.id,
      order_id: option.orderId,
    };

    const response = await this.request<VerifyPaymentResponse>({
      path: "/payment/verify",
      method: "post",
      body: idpayOptions,
      action: "Verifying Payment",
    });

    return response;
  }
}
