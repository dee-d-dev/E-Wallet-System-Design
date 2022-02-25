const User = require("../db/models/User");

const reg_user = async (req, res) => {
  const user = await new User(req.body);
  await user.save((err) => {
    if (err) return res.send(err.message);
    return res.send(user);
  });
};

module.exports = reg_user;
