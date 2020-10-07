const planModel = require("../model/planModel")
const userModel = require("../model/userModel")
function getTrialPage(req,res){
    let name = req.userName;
    console.log("reached")

    res.render("trial.pug",{
        titleofThePage: "Trial Page",name
    })
}
function getHomePage(req,res){
    let name = req.userName;
    res.render("home.pug",{
    title: "Home Page",name})
}

async function getPlansPage(req,res){
    let plans = await planModel.find();
    let name = req.userName;
    res.render("planPage.pug",{
    title: "Plan Page", plans,name})
}

function getLoginPage(req, res) {
    let name = req.userName;
    res.render("login.pug", {
      title: "Login",name
    })
  }

function getSignupPage(req,res){
    let name = req.userName;
    res.render("signup.pug"),{
        title: "Sign Up" , name
    }
}

async function getProfilePage(req,res){
    let user = await userModel.findById(req.id);
    const name = req.userName
    res.render("profile.pug",{
        title: "Profile",user,name
    })
    
}
async function getForgotPage(req,res){
    let name = req.userName;
    res.render("forgot.pug"),{
        title: "Forgot Password" , name
    }
}
async function getResetPage(req,res){
    let name = req.userName;
    res.render("reset.pug"),{
        title: "Reset Password" , name
    }
}
async function getManagePage(req,res){
    let name = req.userName;
    res.render("manageplans.pug",{
        title: "Manage Plans" , name
    })
}

module.exports.getTrialPage = getTrialPage;
module.exports.getHomePage = getHomePage;
module.exports.getPlansPage= getPlansPage;
module.exports.getLoginPage= getLoginPage;
module.exports.getSignupPage=getSignupPage;
module.exports.getProfilePage=getProfilePage;
module.exports.getForgotPage=getForgotPage;
module.exports.getResetPage=getResetPage;
module.exports.getManagePage=getManagePage;