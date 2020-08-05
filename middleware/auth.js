const jwt = require("jsonwebtoken");
require('dotenv').config();

const User = require('../models/User');

const authorize = async function (req, res, next) {
    const authHeader = req.headers.authorization;
  const token = authHeader.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET); // { id: user._id }
  } catch (err) {
    return res.status(401).send("Authorization failed");
  }

  const user = await User.findById(payload.user.id).select('-password');
  req.user = user;

  next();
}

module.exports = authorize;
