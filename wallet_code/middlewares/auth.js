const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearer = req.headers["authorization"];
  if (typeof bearer !== "undefined") {
    let bearer_header = bearer.split(" ");
    let bearer_token = bearer_header[1];

    req.token = bearer_token;
  }
  if (!bearer) {
    return res.status(403).send("Unauthorised");
  }

  jwt.verify(req.token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) return res.status(401).send("Invalid Token");
    req.decoded = decoded;
  });

  return next();
};

module.exports = verifyToken;
