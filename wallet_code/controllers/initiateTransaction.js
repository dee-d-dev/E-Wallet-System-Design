const request = require("request");
const uuid = require("uuidv4");

exports.initiateTransaction = (req, res) => {
  var options = {
    method: "POST",
    url: "https://api.paystack.co/transfer",
    headers: {
      Authorization: `Bearer ${process.env.SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    form: {
      source: "balance",
      reason: req.body.reason,
      amount: req.body.amount,
      recipient: req.body.recipient,
    },
  };
  console.log(options.form.recipient);
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
  });
};
