let request = require("request");
exports.transferRecipient = (req, res) => {
  let options = {
    method: "POST",
    url: "https://api.paystack.co/transferrecipient",
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    form: {
      type: "nuban",
      // name: req.body.name,
      // description: req.body.description,
      email: req.body.email,
      account_number: req.body.account_number,
        bank_code: req.body.bank_code,
      //   currency: req.body.currency,
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
  });

};
