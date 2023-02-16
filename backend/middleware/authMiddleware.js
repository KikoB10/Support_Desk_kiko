const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Get token from header (must remember its in the Bearer Token, so we make it into an array nd then we split with the space (' ') so that Bearer is the first item ([0]) in the array and then the token is second [1])
      token = req.headers.authorization.split(' ')[1];
      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized');
      }

      next(); //missed this next all and therefore the GET response was failing
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

module.exports = { protect };
