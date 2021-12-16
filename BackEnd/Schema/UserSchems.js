const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require:[true , "Please Enter Name"],
        maxLength:[35 , "name cannot be more than 35 characters"],
        minLength:[3, "Name Should be atLeast 3 characters"]
    },
    email:{
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter valid Email"],
    }, 
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [5, "Password should be greater than 5 characters"],
        select: false,
      },
      isAdmin:{
        type: Boolean,
        default: false,
      }

},{timestamps:true})

userSchema.pre("save", async function(next){

  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password , 10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
  };

const UserSchema = mongoose.model("Users" , userSchema)

module.exports = UserSchema