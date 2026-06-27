document.querySelector(".profile_button").addEventListener("click", ()=>{
    window.location.href = "/profile";
})

document.querySelector(".js-loginButton").addEventListener("click", ()=>{
    window.location.href = "/login";
})
document.querySelector(".js-SignInbutton").addEventListener("click", ()=>{
    window.location.href = "/signup"
})



const verification = await fetch("/profile_verification")
if (verification.status == 401){
    document.querySelector("#profile_button_box").classList.add("hidden");
}
if (verification.status == 200){
    document.querySelector("#AuthButtons").classList.add("hidden");
}