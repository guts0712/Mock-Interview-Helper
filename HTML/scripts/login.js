const emailbox = document.querySelector("#emailbox");
const passwordbox = document.querySelector("#passwordbox");
const Eerror = document.querySelector("#LoginEmailError");
const Perror = document.querySelector("#LoginPasswordError");
const ENull = document.querySelector("#LoginEmailNullError");
const PNull = document.querySelector("#LoginPassNullError");

let email;
let password;
let token;
document.querySelector(".OtherSignUpOption").addEventListener("click", () =>{
    window.location.href = "/signup"
})

document.querySelector(".js-SignInbutton").addEventListener("click", ()=>{
    window.location.href = "/signup";
})

const verification = await fetch("login_verification")
if (verification.status == 201){
    window.location.href = "/dashboard"
}

document.querySelector(".Econtinue").addEventListener("click", () => {
    ENull.classList.add("hidden");
    Eerror.classList.add("hidden");
    Perror.classList.add("hidden");
    const Enteredemail = document.querySelector("#EmailEnter").value.trim();
    if(Enteredemail === ""){
        ENull.classList.remove("hidden");
        return
    }
    const EmailVerify = fetch("/checkemail", {
        method : "Post",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            email : Enteredemail
        })
    }).then(
        EmailVerify => EmailVerify.json()
    ).then(
        banana => {
            if (banana.result) {
                emailbox.classList.add("hidden");
                passwordbox.classList.remove("hidden");
                email = Enteredemail;
            }
            else {
                Eerror.classList.remove("hidden");
            }
        }
    )
})
document.querySelector("#Pcontinue").addEventListener("click", async () => {
    PNull.classList.add("hidden");
    Eerror.classList.add("hidden");
    Perror.classList.add("hidden");
    const EnteredPass = document.querySelector("#PassEnter").value.trim();
    if (EnteredPass === ""){
        PNull.classList.remove("hidden");
        return
    }
    try {
        const PassVerify = await fetch("/checkpassword", {
            method : "Post",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                email : email,
                password : EnteredPass
            })
        });
        const apple = await PassVerify.json();
        if (apple.result){
            alert("Well login successfull");
            password = EnteredPass
            const JWTtoken = await fetch("/createjwt", {
                method : "Post",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email : email
                })
            });
            const strawberry = await JWTtoken.json();
            token = strawberry.token;
            window.location.href = "/dashboard";
        }
        else{
            Perror.classList.remove("hidden");
        }
    } catch (error) {
        console.error("Login error:", error);
        Perror.classList.remove("hidden");
    }
})