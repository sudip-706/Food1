const express = require("express");
const userRouter = express.Router();
const multer = require("multer");
const { signup, login, protectRoute, isAuthorized, forgetPassword, resetPassword} = require("../controller/authController");

const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    updateProfileImage
} = require("../controller/usercontroller");

//Update Profile picture route-------------------------------------------------------------------------------------------------------------------
const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true)
    } else {
      cb(new Error("Not an Image! Please upload an image"), false)
    }
  }
  //storageFilter => file=> jpg,destination
  
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/img/users/");
    },
    filename: function (req, file, cb) {
      cb(null, `user-${Date.now()}.jpeg`)
    }
  })
  // ram
  
  const upload = multer({
    storage: multerStorage,
    fileFilter: filter
  })
  
  //  mutipart data=> everything=> image  , naming , extension => put 
userRouter.patch("/ProfileImage", upload.single("photo"), protectRoute, updateProfileImage);

//------------------------------------------------------------------------------------------------------------------------------------------------------

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.patch("/forgetPassword",forgetPassword);
userRouter.patch("/resetPassword/:token",resetPassword);
// profile page 


userRouter.use(protectRoute);

userRouter.post("/userProfile",getUser)

// admin
// userRouter.use(isAuthorized(["admin"]))
userRouter
   .route("")
   .get(getAllUsers)
//    .post(createUser)


userRouter
    .route("/:id")
    .patch(updateUser)
    .delete(deleteUser)


module.exports = userRouter;