const ProfileDetails = await fetch("/profile/MockDetails")

let mock_ratings = [];
let mock_summary = [];
let mock_created_at = [];
let mock_id = [];
let Name;
if (ProfileDetails.status == 401){
    window.location.href = "/login"
}
else{
    const data = await ProfileDetails.json();
    mock_ratings = data.MockRatings;
    mock_summary = data.MockSummary;
    mock_created_at = data.MockCreatedAt;
    mock_id = data.MockId;
    Name = data.Name;
}

document.querySelector(".profile_button").addEventListener("click", ()=>{
    window.location.href = "/profile"
})

const MockHistoryContainer =
document.getElementById("MockHistoryContainer");

document.querySelector(".UserWelcomeMessage").innerHTML = `Hi, ${Name} !`

for(let i = 0; i < mock_ratings.length; i++){
    const card = document.createElement("div");
    card.className = "MockCard";
    card.innerHTML = `
            <div class="MockHeader">
                <div class="MockInfo">
                    <h2>Mock id : ${mock_id[i]}</h2>

                    <p>Given on : ${mock_created_at[i]}</p>
                </div>
                <div class="MockRight">
                    <div class="MockScore">
                        <span class="ScoreNumberMini">
                            ${mock_ratings[i]}
                        </span>
                    </div>
                    <span class="ExpandArrow"></span>
                </div>
            </div>
            <div class="MockSummary hidden">
                <div class="SummaryBlock">
                    <h3>Interview Summary</h3>
                    <p>
                        ${mock_summary[i]}
                    </p>
                </div>
            </div>
            `;
    MockHistoryContainer.appendChild(card);
    const header = card.querySelector(".MockHeader");
    const summary = card.querySelector(".MockSummary");
    header.addEventListener("click", () => {
        summary.classList.toggle("hidden");
        card.classList.toggle("active");
    });
}


const ProfileStart = document.getElementById("ProfileStart");
const ProfileMocks = document.getElementById("ProfileMocks");
const AboutPage = document.getElementById("AboutPage");

const MocksButton = document.getElementById("MocksButton");
const RecentMockButton = document.getElementById("RecentMockButton");
const StartMockButton = document.getElementById("StartMockButton");
const AboutButton = document.getElementById("AboutButton");

const BackButtons = document.querySelectorAll(".BackButton");
MocksButton.addEventListener("click", () => {
    ProfileStart.classList.add("hidden");
    ProfileMocks.classList.remove("hidden");
    history.pushState({}, "", "/profile/mocks");
});
AboutButton.addEventListener("click", () => {
    window.location.href = "/about"
});
StartMockButton.addEventListener("click", () => {
    window.location.href = "/mock";
});

RecentMockButton.addEventListener("click", () => {
    window.location.href = "/summary";
});

BackButtons.forEach(button => {
    button.addEventListener("click", () => {
        ProfileMocks.classList.add("hidden");
        AboutPage.classList.add("hidden");
        ProfileStart.classList.remove("hidden");
        history.pushState({}, "", "/profile");
    });
});
const path = window.location.pathname;
if(path === "/profile/mocks"){
    ProfileStart.classList.add("hidden");
    ProfileMocks.classList.remove("hidden");
}

else if(path === "/profile/about"){
    ProfileStart.classList.add("hidden");
    AboutPage.classList.remove("hidden");
}

function showHome() {
    ProfileMocks.classList.add("hidden");
    AboutPage.classList.add("hidden");
    ProfileStart.classList.remove("hidden");
}

function hideHome() {
    ProfileStart.classList.add("hidden");
}

document.querySelector(".logOutButton").addEventListener("click", async ()=>{
    const LogOut = await fetch("/logout", {
        method:"Post"
    })
    if (LogOut.status == 200){
        window.location.href = "/";
    }
})
