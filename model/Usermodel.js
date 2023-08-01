import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    date:{
      type: String,
        }, 
        course:{
          type: String,
            },
            
title:{
    type: String,
      },
      gender : {
        type: String
      },
      church : {
        type: String
      },
      city : {
        type: String
      },
      zone : {
        type: String
      },
      state : {
        type: String
      },
      country : {
        type: String
      },
      campus : {
        type: String
      },

    fullname: {
      type: String,
      required: [true, "you must provide a name"],
    },

    email: {
      type: String,
      required: [true, "Must provide a valid email"],
      validate: {
        validator: function (value) {
          // Regular expression pattern for email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    phone: {
      type: String,
      required: [true, "must provide a valid phone"],
    },
    password: {
      type: String,
      required: [true, "must provide a valid password"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User",UserSchema);
export default User;
