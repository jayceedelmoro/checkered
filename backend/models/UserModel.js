const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const personalInfoSchema = new mongoose.Schema(
  {
    lastName: String,
    firstName: String,
    contactNumber: String,
    emailAddress: String,
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  userId: String,
  password: { type: String },
  personalInfo: personalInfoSchema,
  isDeleted: Boolean,
  encodedDate: {
    type: Number,
    default: (new Date()).getTime()
  }, 
});

/**
 * Mongoose middleware that will trigger before the saving
 */
UserSchema.pre('save', async function (next) {
  try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
  } catch (error) {
      next(error);
  }
});

/**
* Define isValidPassword method
* Return: true or false
*/
UserSchema.methods.isValidPassword = async function (password) {
  try {
      return await bcrypt.compare(password, this.password);
  } catch (error) {
      throw error;
  }
}

module.exports = mongoose.model("User", UserSchema);
