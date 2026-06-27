const emailbox = document.querySelector("#Emailbox");
const passwordbox = document.querySelector("#passwordbox");
const namebox = document.querySelector("#NameBox");
const Eerror = document.querySelector("#SigninEmailError");
const Perror = document.querySelector("#SignUpPasswordError");
const ENull = document.querySelector("#SigninEmailNullError");
const PNull = document.querySelector("#SigninPassNullError");
const NNull = document.querySelector("#LoginNamelNullError");

let email;
let password;

document.querySelector(".OtherLoginOption").addEventListener("click", () =>{
    window.location.href = "/login";
})

document.querySelector(".js-loginButton").addEventListener("click", ()=>{
    window.location.href = "/login";
})

document.querySelector(".Econtinue").addEventListener("click", () =>{
    ENull.classList.add("hidden");
    Eerror.classList.add("hidden");
    Perror.classList.add("hidden");
    const Enteredemail = document.querySelector("#emailInput").value.trim();
    if (Enteredemail === ""){
        ENull.classList.remove("hidden");
    }
    else{
        const EmailVerifycationResponce = fetch("/verify_email" , {
        method: "Post",
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            email : Enteredemail
        })
        }).then(
            EmailVerifycationResponce => EmailVerifycationResponce.json()
        ).then(
            banana => {
                if (banana.result){
                    emailbox.classList.add("hidden");
                    passwordbox.classList.remove("hidden");
                    email = Enteredemail;
                }
                else {
                    Eerror.classList.remove("hidden")
                }
            }
        )
    }
})

document.querySelector(".Pcontinue").addEventListener("click", () =>{
    PNull.classList.add("hidden");
    Eerror.classList.add("hidden");
    Perror.classList.add("hidden");
    const typedpass = document.querySelector("#Fpassword").value.trim();
    const retypedpass = document.querySelector("#Rpassword").value.trim();
    if(typedpass === "" || retypedpass === ""){
        PNull.classList.remove("hidden")
    }
    else if (typedpass === retypedpass){
        password = typedpass;
        namebox.classList.remove("hidden");
        passwordbox.classList.add("hidden")
    }
    else {
        Perror.classList.remove("hidden");
    }
})

document.querySelector(".Ncontinue").addEventListener("click", () => {
    NNull.classList.add("hidden");
    Eerror.classList.add("hidden");
    Perror.classList.add("hidden");
    const name = document.querySelector("#Name").value.trim();
    if(name === ""){
        NNull.classList.remove("hidden");
        return
    }
    const UserCreation = fetch("/createuser", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            name : name,
            email : email,
            password : password
            })
        }).then(
            UserCreation => UserCreation.json()
        ).then(
            apple => {
                if (apple.result){
                    alert("User Created..!! Kindly Login");
                    window.location.href = "/login";
                }
            }
        )
})