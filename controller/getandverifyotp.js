import User from "../model/Usermodel.js";
import OTP from "../model/otp.js"
import mailer from "../config/nodemailer.js";

export const getOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(401).json({
        status: false,
        message: "Please Provide a valid email address",
      });
    } else {
      const FindUserByEmail = await User.find({ email: email });
      console.log(FindUserByEmail);
      if (FindUserByEmail.length !== 0) {
        const min = 1000;
        const max = 9999;
        const otp = Math.floor(Math.random() * (max - min + 1)) + min;

        const newOTP = await new OTP({
          otp,
          email
        });

        newOTP.save();

        console.log(newOTP);

        const userEmail = FindUserByEmail[0].email;
        console.log(userEmail);

        mailer(
          userEmail,
          " Verify using this One Time Password",
          otp.toString()
        );
        res.status(201).json({
          status: true,
          message: `Kindly check ${email} for OTP`,
          user: FindUserByEmail,
          otp: newOTP,
        });
      } else {
        res.status(401).json({
          status: false,
          message: "User does not exist",
        });
      }
    }
  } catch (err) {
    res.status(401).json({
      status: false,
      message: err.message,
    });
  }
};

export const VerifyOTP = async (req, res) => {
  const { otp,email } = req.body;
  try {
    if (!otp) {
      res.status(401).json({
        status: false,
        message: "Please provide a valid otp",
      });
    } else {
      const FindOTP = await OTP.find({ otp:otp, email:email });
      console.log(FindOTP);
      if (FindOTP.length === 0) {
        res.status(401).json({
          status: false,
          message: "OTP is invalid or expired",
          otp: FindOTP,
        });
      } else {
        const deleteOTP = await OTP.findOneAndDelete({ otp });
        console.log(deleteOTP);
        res.status(201).json({
          status: true,
          message: "OTP is valid",
        });
      }
    }
  } catch (err) {
    res.status(401).json({
      status: false,
      message: err.message,
    });
  }
};
