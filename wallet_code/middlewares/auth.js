const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearer = req.headers["authorization"];
  if (typeof bearer !== "undefined") {
    let bearer_header = bearer.split(" ");
    let bearer_token = bearer_header[1];

    req.token = bearer_token;
  }
  if (!bearer) {
    return res.status(403).send("A token is required for authentication");
  }

  const decoded = jwt.verify(req.token, process.env.TOKEN_KEY, (err) => {
    if (err) return res.status(401).send("Invalid Token");
  });
  req.user = decoded;

  return next();
};

module.exports = verifyToken;
