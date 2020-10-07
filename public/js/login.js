const d = document;

const loginbtn = d.querySelector(".loginForm");
const emailbox = d.querySelector(".email")
const passwordbox = d.querySelector(".password")
const logoutbtn = d.querySelector(".logout")
const sendemail = d.querySelector(".emailForm")
const resetpsw = d.querySelector(".resetForm")
const cnfpasswordbox = d.querySelector(".cnfpassword")

async function LoginHandler(email,password){
    const backendResponse = await axios.post("/api/users/login",
    {email,password});
    if(backendResponse.data.status==="userLogged In")
    {
        alert("user is logged in");
        //redirecting using front end
        location.assign("/profile");
    }else{
        alert("Wrong email or password");
    }
    console.log(backendResponse.data)
}
async function LogoutHandler(){
    let backendResponse = await axios.get("/logout")
    if(backendResponse.data.status==="user LoggedOut"){
        alert("user loggedOut");
        location.assign("/");
    }
    else{
        alert("logout failed");
    }

}
async function ForgotHandler(email){
    
    backendResponse = await axios.patch("/api/users/forgetPassword",{email});
    if(backendResponse.data.status==="Token send to your email")
    {
        alert("Token send to your email")
    }
    else{
        alert("Wrong Email Id")
    }
    console.log(backendResponse.data)
    
}
async function ResetHandler(password,confirmPassword,resetToken){
    backendResponse = await axios.patch("/api/users/resetPassword/"+resetToken,{
        password,confirmPassword
    })
    if(backendResponse.data.status==="Password reset"){
        alert("Password is reset");
        location.assign("../login")
    }
    else{
        alert("could nor reset");
    }
    console.log(backendResponse.data);
}
if(loginbtn){
loginbtn.addEventListener("submit",function(event){
    event.preventDefault();
    const email = emailbox.value;
    const password = passwordbox.value;
    LoginHandler(email,password);

})}

if (logoutbtn) {
    logoutbtn.addEventListener("click", function () {
      LogoutHandler();
    })
  }

if(sendemail){
    sendemail.addEventListener("submit",function(event){
        event.preventDefault();
        const email = emailbox.value;
        ForgotHandler(email);
    })
} 

if(resetpsw){
    resetpsw.addEventListener("submit",function(event){
        event.preventDefault();
        const resetToken = location.pathname.split("/")[2]
        console.log("token:  " +  resetToken)
        const password = passwordbox.value;
        const cnfpassword = cnfpasswordbox.value;
        ResetHandler(password,cnfpassword,resetToken);
    })
}
