const request = require("request");

exports.cardFund = (req, res) => {
  request("https://api.paystack.co/charge", {
    card: {
      number: "4084084084084081",
      expiry_month: "01",
      expiry_year: "99",
    },
  });
};
