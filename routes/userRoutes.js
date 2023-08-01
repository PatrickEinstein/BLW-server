import express from 'express';
import { VerifyOTP, getOTP } from '../controller/getandverifyotp.js';
import UserSignUp from '../controller/SignUp.js';
import UserLogin from '../controller/Login.js';
import ChangePassword from '../controller/ResetPasword.js';

const router = express.Router();


router.post("/getOTP", getOTP)
router.post("/verifyotp", VerifyOTP)
router.post("/signup", UserSignUp)
router.post("/login", UserLogin)
router.post("/changepassword",ChangePassword)


export default router;