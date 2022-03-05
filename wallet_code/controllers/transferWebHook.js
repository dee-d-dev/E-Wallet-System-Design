const webHook = (req, res) => {
  var crypto = require("crypto");
  var secret = process.env.SECRET_KEY;
  // Using Express
  app.post("/my/webhook/url", function (req, res) {
    //validate event
    var hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");
    if (hash == req.headers["x-paystack-signature"]) {
      // Retrieve the request's body
      var event = req.body;
      // Do something with event
    }
    res.send(200);
  });
};
