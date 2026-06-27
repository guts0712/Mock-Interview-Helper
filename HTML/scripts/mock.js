const JobSelection = document.getElementById("job");
const TimeDuration = document.getElementById("Time");
const Difficulty = document.getElementById("Difficulty");
const error = document.querySelector("#Error");
const GiveMock = document.querySelector("#MainMockMiddleBox");
const Instruction = document.querySelector("#MiddleMockInterviewInstructions");

let recorder;
let audioChunks = [];
let Allquestions;
let answers = [];
let currentAnswer = "";
let content = {};
let isSubmitting = false;

document.querySelector(".profile_button").addEventListener("click", ()=>{
    window.location.href = "/profile"
})



function ShowProcessingPopup(title, text){
    document.querySelector(".ProcessingTitle").textContent = title;
    document.querySelector(".ProcessingText").textContent = text;
    document.querySelector("#ProcessingPopup").classList.remove("hidden");
}

function HideProcessingPopup(){
    document.querySelector("#ProcessingPopup").classList.add("hidden");
}

function UpdateMockContinueButton(Questions){
    const MockContinueButton = document.querySelector(".MockContinueButton");
    if(currentquestion >= Questions.length){
        MockContinueButton.textContent = "Submit";
    }
    else{
        MockContinueButton.textContent = "Continue";
    }
}

const response = await fetch("/verification123")
if (response.status === 401){
    window.location.href = "/login"
}

document.querySelector(".SpeakButton").addEventListener("click", ()=>{
    const currentQuestion = document.querySelector(".Questions").textContent.trim();

    if(!currentQuestion || currentQuestion === "Question"){
        return;
    }

    if(!("speechSynthesis" in window)){
        alert("Text to speech is not supported in this browser");
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(currentQuestion);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
})


function StartCountdown(duration){
    let timeLeft = duration*60;
    const countdown = setInterval(()=>{
        const Minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.querySelector(".Time").textContent = `${Minutes}:${seconds.toString().padStart(2,"0")}`;
        if(timeLeft <= 0){
            clearInterval(countdown);
            SubmitInterview();
        }
        timeLeft--;
    }, 1000);
}

async function StartRecording(){
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
    });
    recorder = new MediaRecorder(stream);
    audioChunks = [];
    recorder.ondataavailable = (event)=>{
        audioChunks.push(event.data);
    }
    recorder.start();
}
let audioBlob;
async function StopRecording(){
    return new Promise((resolve)=>{
        recorder.onstop = ()=>{
            audioBlob =
                new Blob(audioChunks,{
                    type:"audio/webm"
                });
            resolve(audioBlob);
        }
        recorder.stop();
    });
}


document.querySelector(".AddAnswerButton").addEventListener("click", async ()=>{
                document.querySelector("#RecordingPopup").classList.remove("hidden");
                await StartRecording();
            })


document.querySelector(".StopRecordingButton").addEventListener("click", async ()=>{
    try{
        document.querySelector("#RecordingPopup").classList.add("hidden");
        ShowProcessingPopup(
            "Processing Answer...",
            "Converting speech to text and analyzing your response. Please wait a moment."
        );
        audioBlob = await StopRecording();
        const formData = new FormData();
        formData.append("audio",audioBlob,"answer.webm");
        const GetAnswer = await fetch("/transcribe", {
            method:"POST",
            body:formData
        });

        if(!GetAnswer.ok){
            const errorData = await GetAnswer.json();
            throw new Error(errorData.error || "Failed to transcribe answer");
        }

        const apple = await GetAnswer.json();
        currentAnswer += apple.currentanswer;
        document.querySelector(".Answers").textContent = `${currentAnswer}`;
    }
    catch(error){
        console.error(error);
        alert(error.message || "Failed to transcribe answer");
    }
    finally{
        HideProcessingPopup();
    }
})

let currentquestion = 0;
function Interview(Questions, Time){
    StartCountdown(Time);
    UpdateMockContinueButton(Questions);
    document.querySelector(".MockContinueButton").addEventListener("click", ()=>{
        if(isSubmitting){
            return;
        }
        if (currentAnswer === ""){
            currentAnswer = "Unable To Answer"
        }
        answers.push(currentAnswer);
        currentAnswer = ""

        if(currentquestion < Questions.length){
            document.querySelector(".Questions").textContent = `${Questions[currentquestion]}`;
            currentquestion++;
            document.querySelector(".Answers").textContent = "";
            UpdateMockContinueButton(Questions);
        }
        else{
            SubmitInterview();
        }
    })
}

async function SubmitInterview(){
    if(isSubmitting){
        return;
    }
    isSubmitting = true;
    ShowProcessingPopup(
        "Generating Summary...",
        "Your mock interview is being analyzed. Please wait while we prepare your feedback."
    );
    document.querySelector(".MockContinueButton").disabled = true;
    try{
        if(answers.length < Allquestions.length){
            if (currentAnswer === ""){
                currentAnswer = "Unable To Answer"
            }
            answers.push(currentAnswer);
            currentAnswer = ""
        }
        for(let i = 0; i < Allquestions.length; i++){
            content[Allquestions[i]]=answers[i];
        }
        const response =await fetch("/GetSummary",
            {
                method:"POST",
                headers:{
                    "Content-Type":
                    "application/json"
                },
                body:JSON.stringify(content)
            }
        );

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to generate summary");
        }
        await response.json();
        window.location.href =
        "/summary";
    }
    catch(error){
        console.error(error);
        HideProcessingPopup();
        isSubmitting = false;
        document.querySelector(".MockContinueButton").disabled = false;
        alert(
            error.message || "Failed to generate summary"
        );
    }
}





document.querySelector(".NextButton").addEventListener("click", ()=>{
    if ((JobSelection.value == "")|| (TimeDuration.value == "")|| (Difficulty.value == "")){
        error.classList.remove("hidden")
    }
    else{
        const MockSelectionData = fetch("/Mock_Selection_data", {
            method : "Post",
            headers : {
                "Content-Type": "application/json"},
            body: JSON.stringify({
                "job" : JobSelection.value,
                "time" : TimeDuration.value,
                "difficulty" : Difficulty.value
            })
        }).then(
            MockSelectionData => {
                if(MockSelectionData.status === 401){
                    window.location.href = "/login";
                    return;
                }
                return MockSelectionData.json();}
                ).then(
                    response =>{
                        console.log(response)
                        if(!response) return;
                        Allquestions = response.Allquestion;
                        Instruction.classList.remove("hidden");
                        document.querySelector("#MiddleMockSelectionBox").classList.add("hidden");
                        document.querySelector(".InstructionsContinueButton").addEventListener("click", ()=>{
                            GiveMock.classList.remove("hidden");
                            Instruction.classList.add("hidden");
                            document.querySelector(".Questions").textContent = `${Allquestions[currentquestion]}`;
                            currentquestion++;
                            UpdateMockContinueButton(Allquestions);
                            Interview(Allquestions, TimeDuration.value);
                        })
                    }
                )
    }
})
