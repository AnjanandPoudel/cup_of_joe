const mongoose = require("mongoose");
const crypto = require("crypto");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address:{
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
    select: false,
  },
  hashed_password: {
    type: String,
    required: true,
    select: false,
  },
},{timestamps:true});

userSchema
  .virtual("password")
  .set(async function (password) {
    this.real_password = password;
    this.salt = await this.makeSalt();
    this.hashed_password = this.encryptPasswordFunc(password, this.salt);
  })
  .get(function () {
    return this.real_password;
  });

userSchema.methods = {
  authentication(password) {
    const encrypt = this.encryptPasswordFunc(password, this.salt);
    if (!encrypt || !this.hashed_password) return false;
    return encrypt === this.hashed_password;
  },

  encryptPasswordFunc(password, salt) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", salt)
        .update(password) // updating data
        .digest("hex"); // Encoding to be used
    } catch (err) {
      console.log(err);
    }
  },
  makeSalt() {
    const salt = Math.round(new Date().valueOf() * Math.random()) + "";
    return salt;
  },
};

// Create the user model
const User = mongoose.model("User", userSchema);
module.exports = User;
