from fastapi import APIRouter,Request
from fastapi.responses import FileResponse,JSONResponse
import json

from resources import database
from resources.database import SessionLocal, Base, get_db
from JWT import send_current_user_email, verify_token
db = SessionLocal()
sm = APIRouter()


@sm.get("/summary")
def summary_page():
    return FileResponse("HTML/webcode/summary.html")
    


@sm.get("/summary_data")
def summary_page(request : Request):
    verification = verify_token(request)
    if verification is True:
        Useremail = send_current_user_email(request)
        User_id_querry = db.query(database.Users).filter(database.Users.email == Useremail).first()
        if User_id_querry is None:
            return JSONResponse({"error": "user not found"}, status_code=401)
        User_id = User_id_querry.user_id
        Mock_details_querry = db.query(database.Mocks).filter(database.Mocks.owner_id == User_id).order_by(database.Mocks.created_at.desc()).first()
        if Mock_details_querry is not None:
            final = json.loads(Mock_details_querry.ai_summary)
            overall_questions = []
            overall_answers = []
            overall_question_scores = []
            overall_question_feedback = []
            overall_question_improved_answers = []
            overall_rating = final["rating"]["overall_score"] 
            for  q in (final["questions_and_answers"]):
                overall_questions.append(q["question"])
                overall_answers.append(q["candidate_answer"])
                overall_question_scores.append(q["score"])
                overall_question_feedback.append(q["feedback"])
                overall_question_improved_answers.append(q["improved_answer"])
            InterviewSummary_strengths = final["interview_summary"]["strengths"]
            InterviewSummary_weaknesses = final["interview_summary"]["weaknesses"]
            InterviewSummary_areas_to_improve = final["interview_summary"]["areas_to_improve"]
            InterviewSummary = final["interview_summary"]["summary"]
            final_verdict_hire_recommendation = final["final_verdict"]["hire_recommendation"]
            final_verdict_verdict = final["final_verdict"]["verdict"]
            AllData = {
                "overall_rating" : overall_rating,
                "overall_questions" : overall_questions,
                "overall_answers" : overall_answers,
                "overall_question_scores" : overall_question_scores,
                "overall_question_feedback" : overall_question_feedback,
                "overall_question_improved_answers" : overall_question_improved_answers,
                "InterviewSummary_strengths" : InterviewSummary_strengths,
                "InterviewSummary_weaknesses" : InterviewSummary_weaknesses,
                "InterviewSummary_areas_to_improve" : InterviewSummary_areas_to_improve,
                "InterviewSummary" : InterviewSummary,
                "final_verdict_hire_recommendation" : final_verdict_hire_recommendation,
                "final_verdict_verdict" : final_verdict_verdict
                }
        else:
            AllData = {
                "overall_rating" : "Yet To Take A Mock",
                "overall_questions" : ["Yet To Take A Mock"],
                "overall_answers" : ["Yet To Take A Mock"],
                "overall_question_scores" : ["Yet To Take A Mock"],
                "overall_question_feedback" : ["Yet To Take A Mock"],
                "overall_question_improved_answers" : ["Yet To Take A Mock"],
                "InterviewSummary_strengths" : ["Yet To Take A Mock"],
                "InterviewSummary_weaknesses" : ["Yet To Take A Mock"],
                "InterviewSummary_areas_to_improve" : ["Yet To Take A Mock"],
                "InterviewSummary" : ["Yet To Take A Mock"],
                "final_verdict_hire_recommendation" : ["Yet To Take A Mock"],
                "final_verdict_verdict" : ["Yet To Take A Mock"]
                }
        
        return AllData
    else :
        return JSONResponse({"error": "unauthenticated"}, status_code=401)
