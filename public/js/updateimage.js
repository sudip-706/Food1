if(d!=document){
    d= document
}
const updateProfile = d.querySelector(".updateProfile");


async function updateProfileHelper(mutipartFormData) {
    const response = await axios.patch("api/users/ProfileImage", mutipartFormData);
    console.log(response.data);
    if (response.data.status === "image uploaded") {
      alert("Profile Image updated");
      location.reload();
    } else {
      alert("some error occurred");
    }
  
  }

if (updateProfile) {
    updateProfile.addEventListener("change", function (e) {
      e.preventDefault();
      // capture image so that we could send to backend
      // console.log("change event occurred");
      const mutipartFormData = new FormData();
      mutipartFormData.append("photo", updateProfile.files[0]);
      updateProfileHelper(mutipartFormData);
    })
  }