const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next(); // checking if password is modified
    const hashedPassword = await bcrypt.hash(this.password, 10); // hashing password
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword, next) {
  // method for compare id password is match
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    next(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
