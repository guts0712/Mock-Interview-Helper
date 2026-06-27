(async () => {
    try{
        const response = await fetch("/dashboard_data");
        if(!response.ok){
            if(response.status === 401){
                window.location.href = "/login";
                return;
            }
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        document.getElementById("UserName").textContent = data.name;
        document.querySelector(".NoOfMocks").textContent = data.mock_count;
        document.querySelector(".AvgScore").textContent = data.avg_rating;
        document.querySelector(".RecentMock").textContent = data.recent_rating;
    }
    catch(error){
        console.error(error);
        document.getElementById("UserName").textContent = "User";
    }
})();
document.querySelector(".MockButton").addEventListener("click", () => {
    window.location.href = "/mock";
});
document.querySelector(".profile_button").addEventListener("click", () => {
    window.location.href = "/profile";
});

document.querySelector(".StatCard_latest").addEventListener("click", ()=>{
  window.location.href = "/summary"
})