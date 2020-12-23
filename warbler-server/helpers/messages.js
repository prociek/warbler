const db = require("../models");

exports.createMessage = async function (req, res, next) {
  try {
    const message = await db.Message.create({
      text: req.body.text,
      user: req.params.id,
    });
    const user = await db.User.findById(req.params.id);
    user.messages.push(message.id);
    await user.save();
    const foundMessage = await db.Message.findById(message.id).populate(
      "user",
      {
        username: true,
        profileImageUrl: true,
      }
    );
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

exports.getMessage = async function (req, res, next) {
  try {
    const message = await db.Message.findById(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};

exports.deleteMessage = async function (req, res, next) {
  try {
    const message = await db.Message.findById(req.params.message_id);
    if (message.user.toString() !== req.params.id) {
      return next(new Error("Unauthorized!"));
    }
    await message.remove();
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};
