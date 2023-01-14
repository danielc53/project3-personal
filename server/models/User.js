const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

//simple user model
const userSchema = mongoose.Schema(
    {
      name: { type: "String", required: true },
      username: { type: "String", required: false },
      email: { type: "String", unique: true, required: true },
      password: { type: "String", required: true },
      
    },
    { timestaps: true }
  );


  userSchema.methods.matchPassword = async function (enteredPassword) {
    //this will check our password on a login to passwords in the db
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  //Checks to see if the code has been changed before sending it to the next bit
  userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
    //will salt and encrypt the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

const User = mongoose.model("User", userSchema)

module.exports = User;