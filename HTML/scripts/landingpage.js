document.querySelector(".js-SignInbutton").addEventListener("click", () =>{
    window.location.href = "/signup"
})
document.querySelector(".js-loginButton").addEventListener("click", () =>{
    window.location.href = "/login"
})

async function redirectIfAuthenticated() {
    const verification = await fetch("/verification123")

    if (verification.status == 200){
        window.location.href = "/dashboard"
    }
}

redirectIfAuthenticated()
document.querySelector(".HeroStartButton").addEventListener("click", ()=>{
    window.location.href = "/mock";
})