const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signIn = async function (req, res, next) {
  try {
    // finding a user
    const user = await db.User.findOne({ email: req.body.email });
    const { id, username, profileImageUrl } = user;
    console.log(user);
    // checking if their password matches
    const isMatch = await user.comparePassword(req.body.password);

    // if matches log in
    if (isMatch) {
      const token = jwt.sign(
        {
          id,
          username,
          profileImageUrl,
        },
        process.env.SECRET_KEY
      );
      res.status(200).json({
        id,
        username,
        profileImageUrl,
        token,
      });
    } else {
      next({
        status: 400,
        message: "Invalid Email/Password",
      });
    }
  } catch (err) {
    next({
      status: 400,
      message: "Invalid Email/Password",
    });
  }
};

exports.signUp = async function (req, res, next) {
  try {
    const user = await db.User.create(req.body); //create a user
    const { id, username, profileImageUrl } = user;
    const token = jwt.sign(
      {
        // creating token
        id,
        username,
        profileImageUrl,
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};
