const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");

const login_user = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.send("email and password is required");
  }

  const schema = joi.object({
    email: joi.string().email(),
    password: joi.string().required(),
  });

  const validation = schema.validate({ email, password });
  if (validation.error) {
    return {
      success: false,
      error: validation.error.details[0].message,
    };
  }

  const user = await User.findOne({ email });
  if (!user) return res.send("cannot find user");

  let authenticate = await bcrypt.compare(password, user.password);
  if (!authenticate) res.send("incorrect email or password");

  //generate token
  let token = jwt.sign(
    { email: user.email, iss: "adedotun" },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );

  user.token = token;

  exports.token;
  res.statusCode(200)
  res.header("x-access-token", token).send({
    login: "success",
    token: token,
  });
};

module.exports = { login_user };
