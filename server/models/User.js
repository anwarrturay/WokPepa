const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  // For OAuth users
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
  isVerified:{
    type:Boolean,
    default: false
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  telephone: {
    type: String,
  },
  image: {
    type: String,
  },
  profession: {
    type: String,
  },

  password: {
    type: String,
  },

  roles: {
    USER: {
      type: Number,
      default: 2004,
    },
    ADMIN: {
      type: Number,
      default: null,
    },
  },
  resetToken: {
      type: String,
      required: false,
      default: null
  },
  tokenExpiry:{
      type: Date,
      required: false,
      default: null
  },
  refreshToken: {
    type: String,
  },
  cloudinaryId: {
    type: String,
  }
}, { timestamps: true });


module.exports = mongoose.model("User", usersSchema);