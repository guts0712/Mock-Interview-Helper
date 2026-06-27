const sections = [
    document.getElementById("RatingSection"),
    document.getElementById("QuestionSection"),
    document.getElementById("InsightSection"),
    document.getElementById("VerdictSection")
];

const buttons =
document.querySelectorAll(
    ".ContinueButton"
);

buttons.forEach(
    (button,index)=>{

        button.addEventListener(
            "click",
            ()=>{

                if(index < sections.length - 1){

                    sections[index]
                    .classList.add(
                        "hidden"
                    );

                    sections[index + 1]
                    .classList.remove(
                        "hidden"
                    );
                }
                else{

                    window.location.href =
                    "/mock";
                }
            }
        );
    }
);

document.querySelector(".profile_button").addEventListener("click", ()=>{
    window.location.href = "/profile"
})


const GetSummary = await fetch("/summary_data");
if (GetSummary.status === 401){
    window.location.href = "/login"
}
const Summary = await GetSummary.json();
const overall_rating = Summary.overall_rating;
const overall_questions = Summary.overall_questions;
const overall_answers = Summary.overall_answers;
const overall_question_scores = Summary.overall_question_scores;
const overall_question_feedback = Summary.overall_question_feedback;
const overall_question_improved_answers = Summary.overall_question_improved_answers;
const InterviewSummary_strengths = Summary.InterviewSummary_strengths;
const InterviewSummary_weaknesses = Summary.InterviewSummary_weaknesses;
const InterviewSummary_areas_to_improve = Summary.InterviewSummary_areas_to_improve;
const InterviewSummary = Summary.InterviewSummary;
const final_verdict_hire_recommendation = Summary.final_verdict_hire_recommendation;
const final_verdict_verdict = Summary.final_verdict_verdict;

const QuestionContainer = document.getElementById("QuestionContainer");


for(let i = 0; i < overall_questions.length;i++){
    QuestionContainer.innerHTML += `
        <article class="QuestionCard">
            <h2 class="QuestionTitle">Q${i+1}</h2>
            <p class="QuestionLabel">Question</p>
            <p class="QuestionContent">${overall_questions[i]}</p>
            <p class="QuestionLabel">Answer</p>
            <p class="QuestionContent">${overall_answers[i]}</p>
            <p class="QuestionLabel">Feedback</p>
            <p class="QuestionContent">${overall_question_feedback[i]}</p>
        </article>
    `;
}
document.querySelector(".ScoreNumber").textContent = overall_rating;

const InsightContainer = document.getElementById("InsightContainer");

InsightContainer.innerHTML = `
    <article class="InsightCard">
        <h2 class="InsightTitle">Strengths</h2>
        <ul class="InsightText">
            ${
                InterviewSummary_strengths
                .map(
                    strength =>
                    `<li>${strength}</li>`
                )
                .join("")
            }
        </ul>
    </article>
    <article class="InsightCard">
        <h2 class="InsightTitle">Weaknesses</h2>
        <ul class="InsightText">
            ${
                InterviewSummary_weaknesses
                .map(
                    weakness =>
                    `<li>${weakness}</li>`
                )
                .join("")
            }
        </ul>
    </article>
    <article class="InsightCard">
        <h2 class="InsightTitle">Areas To Improve</h2>
        <ul class="InsightText">
            ${
                InterviewSummary_areas_to_improve
                .map(
                    area =>
                    `<li>${area}</li>`
                )
                .join("")
            }
        </ul>
    </article>
    <article class="InsightCard">
        <h2 class="InsightTitle">Overall Summary</h2>
        <p class="InsightText">
            ${InterviewSummary}
        </p>
    </article>
`;
const VerdictContainer = document.getElementById("VerdictContainer");
VerdictContainer.innerHTML = `
    <h2 class="VerdictTitle">
        ${final_verdict_hire_recommendation}
    </h2>
    <br>
    <p class="VerdictDescription">
        ${final_verdict_verdict}
    </p>
`;
