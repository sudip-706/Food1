// const express = require("express") 
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY||require("../config/secrets").JWT_SECRET_KEY;
//nodemailer
const nodemailer=require("nodemailer");

async function signup(req, res) {
  try {
    const newUser = await userModel.create(req.body);
    res.status(201).json({
      status: "user Signedup",
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "user can't be created",
      err,
    });
  }
}

async function login(req, res) {
  try {
    if (req.body.email && req.body.password) {
      // find user
      const user = await userModel
        .findOne({ email: req.body.email })
        .select("+password");
      if (user) {
        if (user.password == req.body.password) {
          const id = user["_id"];
          const token = jwt.sign({id},JWT_SECRET_KEY)
          //header 
          res.cookie("jwt",token,{httpOnly: true});
           return res.status(200).json({
            status: "userLogged In",
            user,
            token
          });
        } else {
          throw new Error("email or password didn't");
        }
      } else {
        throw new Error("User not found");
      }
    }
    throw new Error("Invalid Input");
  } catch (err) {
    res.status(200).json({
      status: "user can't be loggedIn",
      err,
    });
  }
}
async function logout(req,res){
  // token => loggedIN
  res.cookie("jwt", "wrongtoken", { httpOnly: true });
  res.status(200).json({
    status: "user LoggedOut"
  })
}

async function isUserLoggedIn(req,res,next){
  try {
    let token;
    if (req.cookies.jwt) {

      token = req.cookies.jwt;
    }
    if(token){
      const cToken = token;
      const payload = jwt.verify(cToken,JWT_SECRET_KEY);
      if(payload)
      {
        const user = await userModel.findById(payload.id);
        req.role = user.role;
        req.id = payload.id;
        req.userName = user.name;
        next()  
      }
      else{
        next();
      }
    }
    else{ 
      next();
    }
  }
  catch(err){
    // console.log(err);
    next();
  }

}

async function protectRoute(req,res,next){
  try {
    let token;
    if (req.headers.authorization) {

      token = req.headers.authorization.split(" ").pop();
    }else if(req.cookies.jwt){
      token = req.cookies.jwt
    }
    console.log(req.get("User-Agent"))
    if(token){
      const cToken = token;
      const payload = jwt.verify(cToken,JWT_SECRET_KEY);
      if(payload)
      {
        const user = await userModel.findById(payload.id);
        req.role = user.role;
        req.id = payload.id;
        next()  
      }
      else{
        throw new Error("Token is wrong"); 
      }
    }
    else{ 
      throw new Error("invalid input")
    }
  }
  catch(err){
    let clientType = req.get("User-Agent");
    if (clientType.includes("Mozilla") == true) {
      //  backend express 
      return res.redirect("/login");
    }
    else {
      res.status(500).json({
        err: err.message
      });
    }
  }
}

// function isAuthorized(roles) {
//   return function (req, res,next) {
//     if (roles.includes(req.role) == true) {
//       next()
//     } else {
//       res.status(403).json({
//         status: "user not allowed"
//       })
//     }
//   }
// }
function isAuthorized(req, res,next) {
    if (req.role === "admin") {
      console.log("Authorized")
      next()
    } else {
      let clientType = req.get("User-Agent");
      if (clientType.includes("Mozilla") == true) {
        //  backend express 
        
       return res.redirect("/");
       
        
      }else{
      res.status(403).json({
        status: "user not allowed"
      })}
    }
  }

async function forgetPassword(req, res) {
  let email  = req.body.email;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      // create token

      const resetToken = user.createResetToken();
// confirm password
      await user.save({ validateBeforeSave: false });
      // resetPath = "http://localhost:3000/api/users/resetPassword/" + resetToken
      const resetPath = "http://localhost:3000/reset/"+resetToken;
      
      
      async function resetEmail(){
        try{
          const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "83427edb2618b3",
              pass: "b14d260c8bccc4"
            }
          });
        const emailPreface={
          from: "userdatabas@head.com",
          to: user.email,
          subject: "Reset Password",
          text: resetPath,
          html: `<h1>${resetPath}</h1>`
        }
        await transport.sendMail(emailPreface)
        }catch(err){
          console.log(err)
        }
      }
    resetEmail().then(
        res.status(200).json({
            status: "Token send to your email"
      })
      
    )

    } else {
      throw new Error("User not found");
    }

  } catch (err) {
    console.log(err);
    res.status(400).json({
      err,
      status: "cannot reset password"
    }
    )
  }

}

async function resetPassword(req, res) {
  try {
    const token = req.params.token
    const { password, confirmPassword } = req.body;
    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }
    })
    console.log(password+" "+confirmPassword);
    if (user) {
      user.resetPasswordhandler(password, confirmPassword)
      await user.save();
      res.status(200).json({
        status: "Password reset"
      })

    } else {
      throw new Error("Not a valid token");
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Some error occurred",
      err
    })
  }
}
 

module.exports.login = login;
module.exports.signup = signup;
module.exports.protectRoute = protectRoute;
module.exports.isAuthorized = isAuthorized;
module.exports.forgetPassword = forgetPassword
module.exports.resetPassword = resetPassword;
module.exports.isUserLoggedIn = isUserLoggedIn;
module.exports.logout = logout;