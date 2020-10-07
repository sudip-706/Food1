const viewRouter = require("express").Router();
const { getTrialPage,getHomePage,getPlansPage, getLoginPage,getSignupPage,getProfilePage,getForgotPage,getResetPage,getManagePage} = require("../controller/viewController");
const {isUserLoggedIn, logout,protectRoute,isAuthorized} = require("../controller/authController")
viewRouter.use(isUserLoggedIn)
viewRouter.get("/", getHomePage);
viewRouter.get("/trial",getTrialPage);
viewRouter.get("/plans",getPlansPage);
viewRouter.get("/login",getLoginPage);
viewRouter.get("/signup",getSignupPage);
viewRouter.get("/logout",logout);
viewRouter.get("/profile",protectRoute,getProfilePage);
viewRouter.get("/forgot",getForgotPage);
viewRouter.get("/reset/:token",getResetPage);
viewRouter.get("/manageplans",protectRoute,isAuthorized,getManagePage);
module.exports = viewRouter;