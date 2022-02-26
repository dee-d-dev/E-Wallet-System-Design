const paystack = require("paystack-api")(
  "sk_test_723267d27d39f05c69be023050abd2bf2e48684e"
);

// paystack.{resource}.{method}
paystack.customer
  .list()
  .then(function (body) {
    console.log(body);
  })
  .catch(function (error) {
    console.log(error);
  });
