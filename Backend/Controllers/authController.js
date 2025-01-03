import { userModel } from "../Models/userModel.js";
import { generateTokenAndSetCookies } from "../Utils/generateTokenAndSetCookies.js";
import { verificationCode } from "../Utils/generateVerificationCode.js";
import {
  sendResetPasswordEmail,
  sendSuccessPasswordEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../Utils/Mailtrap/email.js";
import { comparing, hashing } from "../Utils/passwordHash.js";
import crypto from "crypto" 

//REGISTER CONTROLLER
export const registerController = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      req.body;

    //VALIDATION
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).send({
        success: false,
        message: "ALL FEILDS ARE REQUIRED TO FILLED",
      });
    }

    //CONFIRM PASSWORD MATCH CHECK
    if (password !== confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "PASSWORDS DO NOT MATCH, PLEASE RE-ENTER",
      });
    }

    //CHECK USER
    const userExist = await userModel.findOne({ email });

    //EXISTING USER
    if (userExist) {
      return res.status(200).send({
        success: false,
        message: "EMAIL IS ALREADY REGISTERED, PLEASE LOGIN TO CONTINUE",
      });
    }

    //PASSWORD HASH
    const hashedPassword = await hashing(password);

    //VERIFICATION CODE
    const verificationToken = verificationCode();

    //SAVING DATA AS NEW USER IN DATABASE
    const user = new userModel({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      verificationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000, //24hours
    }).save();

    generateTokenAndSetCookies(res, user._id);

    await sendVerificationEmail(email, verificationToken);

    res.status(201).send({
      success: true,
      message: "USER REGISTERED SUCCESFULLY",
      user: { firstName, lastName, email, phone, verificationToken },
    });
  } catch (error) {
    console.log(`ERROR IN REGISTRATION : ${error}`);
    res.status(500).send({
      success: false,
      message: "ERROR IN REGISTRATION",
    });
  }
};

//VERIFY PASSWORD
export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const existingUser = await userModel.findOne({
      verificationToken: code,
      verificationTokenExpireAt: { $gt: Date.now() },
    });

    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "INVALID OR EXPIRED VERIFICATION CODE",
      });
    }

    //save as a
    existingUser.verified = true;
    existingUser.verificationToken = undefined;
    existingUser.verificationTokenExpireAt = undefined;

    const verifiedUser = await existingUser.save();

    await sendWelcomeEmail(verifiedUser.email, verifiedUser.firstName);

    res.status(200).send({
      success: true,
      message: "Email verified successfully",
      user: verifiedUser,
    });
  } catch (error) {
    console.log(`ERROR IN VERIFICATION : ${error}`);
    res.status(500).send({
      success: false,
      message: "ERROR IN VERIFICATION",
    });
  }
};

//LOGIN CONTROLLER
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //VALIDATION
    if (!email || !password ) {
      return res.status(400).send({
        success: false,
        message: "ALL FEILDS ARE REQUIRED TO FILLED",
      });
    }

    //EXISTENCE OF USER
    const existingUser = await userModel.findOne({email})
    if(!existingUser){
      return res.status(400).send(
        {
          success:false,
          message:"USER DOES NOT EXIST, PLEASE REGISTER"
        }
      )
    }

    //PASSWORD MATCH
    const comparedPassword = await comparing(password, existingUser.password)
    if (!comparedPassword) {
      return res.status(400).send(
        {
          success:false,
          message:"INVALID CREDENTIALS"
        }
      )
    }

    generateTokenAndSetCookies(res,existingUser._id)
    existingUser.lastLogin = new Date()

    await existingUser.save()
    res.status(200).send(
      {
        success:true,
        message:"LOGIN SUCCESFULL",
        user:existingUser
      }
    )

  } catch (error) {
    console.log(`ERROR IN LOGIN : ${error}`)
    res.status(500).send(
      {
        success:false,
        message:"ERROR IN LOGIN"
      }
    )
  }
};

//FORGOT CONTROLLER
export const forgotPassController = async (req, res) => {
  try {
    const {email} = req.body;

    const existingUser = await userModel.findOne({email})

    if(!existingUser){
      return res.status(400).send(
        {
          success:false,
          message:"PLEASE ENTER REGISTERED EMAIL"
        }
      )
    }

    //GENERATE RESET PASSWORD TOKEN
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 Hour

    existingUser.resetPasswordToken = resetToken
    existingUser.resetPasswordExpiresAt = resetTokenExpiresAt
    await existingUser.save()

    //SEND EMAIL 
    sendResetPasswordEmail(existingUser.email,`http://localhost:5173/reset-password/${resetToken}`)

    res.status(200).send(
      {
        success:true,
        message:"PASSWORD RESET LINK SEND TO EMAIL"
      }
    )

  } catch (error) {
    console.log(error)
    res.status(500).send(
      {
        success:true,
        message:"ERROR IN FORGOT PASSWORD"
      }
    )
  }
}

//RESET CONTROLLER
export const resetPassController = async(req,res)=>{
  try {
    const { password, confirmPassword } = req.body;
    const {token} = req.params

    //VALIDATION
    if(!password || !confirmPassword){
      return res.status(400).send(
        {
          success:false,
          message:'ALL FEILD REQUIRED'
        }
      )
    }

    const tokenExist = await userModel.findOne(
      {
        resetPasswordToken:token,resetPasswordExpiresAt:{$gt: Date.now()}
      }
    )

    if(!tokenExist){
      return res.status(400).send(
        {
          success:false,
          message:"INVALID OR EXPIRED RESET TOKEN"
        }
      )
    }

    // UPDATE PASSWORD // PASSWORD HASH
    const hashGeneratedPassword = await hashing(password)

    tokenExist.password = hashGeneratedPassword;
    tokenExist.resetPasswordToken = undefined
    tokenExist.resetPasswordExpiresAt = undefined
    await tokenExist.save()

    await sendSuccessPasswordEmail(tokenExist.email)

    res.status(200).send(
      {
        success:true,
        message:"PASSWORD RESET SUCCESSFULLY"
      }
    )

  } catch (error) {
    res.status(500).send(
      {
        success:false,
        message:"ERROR IN RESET PASSWORD"
      }
    )
  }
}

//VERIFY AUTH ACCESS
export const verifyAuthAccess = async(req,res)=>{
  try {
    const user = await userModel.findById( req.userid)

    if(!user){
      return res.status(400).send(
        {
          success:false,
          message:"USER NOT FOUND"
        }
      )
    }

    res.status(200).send(
      {
        success:true,
        message:"USER IS AUTHORIZED TO ACCESS PAGE",
        user
      }
    )
  } catch (error) {
    res.status(500).send(
      {
        success:false,
        message:"ERROR IN CHECKING AUTH ACESSES PASSWORD"
      }
    )
  }
}