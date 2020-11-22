// const d = document

const signupbtn = d.querySelector(".SignupForm")

const nameBox = d.querySelector(".name");
const emailBox = d.querySelector(".email");
const passwordBox = d.querySelector(".password");
const confirmPasswordBox = d.querySelector(".confirmPassword");
const roleBox = d.querySelector(".role");

async function signupHandler(name,email,password,confirmPassword,role){
    const response = await axios.post("/api/users/signup",
    {name,email,password,confirmPassword,role})

    if(response.data.status === "user Signedup"){
        alert("user Signed up");
    }
    else{
        alert("error in signup try again")
    }
    console.log(response.data);
}

signupbtn.addEventListener("submit",function(e){
    e.preventDefault();
    name = nameBox.value;
    email = emailBox.value;
    password = passwordBox.value;
    confirmPassword = confirmPasswordBox.value;
    role = roleBox.value;

    signupHandler(name,email,password,confirmPassword,role);
})
