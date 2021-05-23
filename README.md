# Installation

```
npm install idpay-ts
```

# Intro

This package is written in TypeScript, you can use it in both TypeScript and JavaScript.

# Usage

```ts
import { IDPay } from "idpay-ts";

const idpay = new IDPay("your-idpay-merchant-code-goes-here", {
  sandbox: true,
  timeout: 5000,
});

(async () => {
  const createdPayment = await idpay.createPayment({
    amount: 1000,
    callback: "https://my-website",
    orderId: "my-order-id",
    description: "This is a description for my payment.",
    payer: {
      emailAddress: "payer@email.com",
      name: "PayerNameGoesHere",
      phoneNumber: "09123456789",
    },
  });

  // Gives out link and id of the created transaction. send customer to 'link'

  const verifiedPayment = await idpay.verifyPayment({
    id: createdPayment.body.id,
    orderId: "my-order-id",
  });
})();
```

# License - MIT
