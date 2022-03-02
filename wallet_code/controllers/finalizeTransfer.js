var request = require("request");
const User = require("../db/models/User");
const Wallet = require("../db/models/wallet");

exports.finalizeTransfer = (req, res) => {
  let options = {
    method: "POST",
    url: "https://api.paystack.co/transfer/finalize_transfer",
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    form: {
      transfer_code: "TRF_vsyqdmlzble3uii",
      otp: "928783",
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
  });
};
