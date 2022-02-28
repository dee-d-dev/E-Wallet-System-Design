var request = require("request");
exports.verifyAccount = (req, res) => {
  var options = {
    method: "GET",
    url: `https://api.paystack.co/bank/resolve?account_number=${req.body.ACCOUNT_NUMBER}&bank_code=${req.body.BANK_CODE}`,
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
    },
    formData: {},
  };
  console.log(req.body.ACCOUNT_NUMBER);
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
  });
};
