const paystack = require("paystack-api")(
  "sk_test_723267d27d39f05c69be023050abd2bf2e48684e"
);

const request = require("request");

// paystack.{resource}.{method}
// paystack.customer
//   .list()
//   .then(function (body) {
//     console.log(body);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// const helper = new paystack.FeeHelper();
// console.log(helper.addFeesTo(5000));

const paystack = (request) => {
  const MySecretKey = `Bearer ${process.env.MERCHANT_KEY} `;
  // sk_test_xxxx to be replaced by your own secret key
  const initializePayment = (form, mycallback) => {};
  const verifyPayment = (ref, mycallback) => {};
  return { initializePayment, verifyPayment };
};

const initializePayment = (form, mycallback) => {
  const options = {
    url: "https://api.paystack.co/transaction/initialize",
    headers: {
      authorization: process.env.MERCHANT_KEY,
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
    form,
  };

  const callback = (error, response, body) => {
    return mycallback(error, body);
  };
  request.post(options, callback);
};

const verifyPayment = (ref, mycallback) => {
  const options = {
    url:
      "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
    headers: {
      authorization: process.env.MERCHANT_KEY,
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
  };
  const callback = (error, response, body) => {
    return mycallback(error, body);
  };
  request(options, callback);
};