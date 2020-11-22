//secrets--config
const DB_LINK = process.env.DB_LINK||require("../config/secrets").DB_LINK;
//crypto--forgotpassword
const cryto = require("crypto");
// mongoose => promise based library
const mongoose = require("mongoose");
// connection
mongoose
  .connect(
    DB_LINK,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then(function (db) {
    // console.log(db);
    console.log("userDB connected");
  })
  .catch(function (err) {
    console.log(err);
  });

// schema
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
  password: {
    type: String,
    minlength: 7,
    required: true,
    select: false,
  },
  confirmPassword: {
    type: String,
    minlength: 7,
    validate: function () {
      return this.password == this.confirmPassword;
    },
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "farmer", "delivery person"],
    default: "user",
  },
  profileImage: {
    type:String,
    default:"img/users/default.jpg"
  },
  resetToken: String,
  resetTokenExpires: Date
});

// hooks
userSchema.pre("save", function () {
  // db => confirmpassword
  this.confirmPassword = undefined;
});

// methdos => document=> createResetToken
userSchema.methods.createResetToken = function () {
  // token generate
  const resetToken = cryto.randomBytes(32).toString("hex");

  this.resetToken = resetToken;

  this.resetTokenExpires = Date.now() + 1000 * 10 * 60;

  return resetToken;

}
userSchema.methods.resetPasswordhandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
  this.resetToken = undefined;
  this.resetTokenExpires = undefined;

}
const userModel = mongoose.model("NewUserModel", userSchema);

module.exports = userModel;