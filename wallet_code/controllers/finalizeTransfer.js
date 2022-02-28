var request = require("request");

exports.finalizeTransfer = (req, res) => {
  var options = {
    method: "POST",
    url: "https://api.paystack.co/transfer/finalize_transfer",
    headers: {
      Authorization: "Bearer SECRET_KEY",
      "Content-Type": "application/json",
    },
    form: {
      transfer_code: "TRF_vsyqdmlzble3uii",
      otp: "928783",
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
};
