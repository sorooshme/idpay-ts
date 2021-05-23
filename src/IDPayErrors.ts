import { IDPayErrors } from "./types";

const IDPayErrorCodes: IDPayErrors = {
  "11": { statusCode: 403, persianMessage: "کاربر مسدود شده است." },
  "12": { statusCode: 403, persianMessage: "API Key یافت نشد." },
  "13": {
    statusCode: 403,
    persianMessage:
      "درخواست شما از {ip} ارسال شده است. این IP با IP های ثبت شده در وب سرویس همخوانی ندارد.",
  },
  "14": {
    statusCode: 403,
    persianMessage: "وب سرویس شما در حال بررسی است و یا تایید نشده است.",
  },
  "21": {
    statusCode: 403,
    persianMessage: "حساب بانکی متصل به وب سرویس تایید نشده است.",
  },
  "22": { statusCode: 404, persianMessage: "وب سریس یافت نشد." },
  "23": { statusCode: 401, persianMessage: "اعتبار سنجی وب سرویس ناموفق بود." },
  "24": {
    statusCode: 403,
    persianMessage: "حساب بانکی مرتبط با این وب سرویس غیر فعال شده است.",
  },
  "31": { statusCode: 406, persianMessage: "کد تراکنش id نباید خالی باشد." },
  "32": {
    statusCode: 406,
    persianMessage: "شماره سفارش order_id نباید خالی باشد.",
  },
  "33": { statusCode: 406, persianMessage: "مبلغ amount نباید خالی باشد." },
  "34": {
    statusCode: 406,
    persianMessage: "مبلغ amount باید بیشتر از {min-amount} ریال باشد.",
  },
  "35": {
    statusCode: 406,
    persianMessage: "مبلغ amount باید کمتر از {max-amount} ریال باشد.",
  },
  "36": {
    statusCode: 406,
    persianMessage: "مبلغ amount بیشتر از حد مجاز است.",
  },
  "37": {
    statusCode: 406,
    persianMessage: "آدرس بازگشت callback نباید خالی باشد.",
  },
  "38": {
    statusCode: 406,
    persianMessage:
      "درخواست شما از آدرس {domain} ارسال شده است. دامنه آدرس بازگشت callback با آدرس ثبت شده در وب سرویس همخوانی ندارد.",
  },
  "41": {
    statusCode: 406,
    persianMessage:
      "فیلتر وضعیت تراکنش ها می بایست آرایه ای (لیستی) از وضعیت های مجاز در مستندات باشد.",
  },
  "42": {
    statusCode: 406,
    persianMessage:
      "فیلتر تاریخ پرداخت می بایست آرایه ای شامل المنت های min و max از نوع timestamp باشد.",
  },
  "43": {
    statusCode: 406,
    persianMessage:
      "فیلتر تاریخ تسویه می بایست آرایه ای شامل المنت های min و max از نوع timestamp باشد.",
  },
  "51": { statusCode: 405, persianMessage: "تراکنش ایجاد نشد." },
  "52": { statusCode: 400, persianMessage: "استعلام نتیجه ای نداشت." },
  "53": { statusCode: 405, persianMessage: "تایید پرداخت امکان پذیر نیست." },
  "54": {
    statusCode: 405,
    persianMessage: "مدت زمان تایید پرداخت سپری شده است.",
  },
};

export = IDPayErrorCodes;
