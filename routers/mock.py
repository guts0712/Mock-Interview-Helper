from resources import database
from resources.database import SessionLocal, Base, get_db
from fastapi import APIRouter, Request, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from questionlogic import questions
from resources import schemas
from JWT import verify_token, send_current_user_email
from faster_whisper import WhisperModel
from ai import get_summary
import json

db = SessionLocal()
Job = {
    "job" : None
}


model_size = "base"
model = WhisperModel(model_size, device="cpu", compute_type="int8")


def transcribe(file):
    segments, _ = model.transcribe(file, beam_size=5)
    all_text = ""
    for segment in segments:
        all_text += segment.text + " "
    return all_text 
mock = APIRouter()

@mock.get("/mock")
def mock_page():
    return FileResponse("HTML/webcode/mock.html")

@mock.post("/Mock_Selection_data")
def Questions(request: Request, data : schemas.MockSelection):
    verification = verify_token(request)
    if verification is True:
        job = data.job
        Job["job"] = job
        difficulty = data.difficulty
        question = questions(job, difficulty)
        return question
    else:
        return verification
    
@mock.post("/transcribe")
async def transcribe_answer(request: Request, audio: UploadFile):
    verification = verify_token(request)
    if verification is not True:
        return JSONResponse({"error": "unauthenticated"}, status_code=401)
    contents = await audio.read()
    with open("temp.webm", "wb") as f:
        f.write(contents)
    return {"currentanswer": transcribe("temp.webm")}
    
@mock.post("/GetSummary")
async def Get_Summary(request: Request, data: dict):
    verification = verify_token(request)
    if verification is not True:
        return verification
    
    try:
        Useremail = send_current_user_email(request)
        payload = dict(data)
        payload.update({"Applied Job" : Job["job"]})
        Summary = get_summary(payload)
        final = Summary

        current_user_details = db.query(database.Users).filter(database.Users.email == Useremail).first()
        if current_user_details is None:
            return JSONResponse({"error": "user not found"}, status_code=401)

        UserId = current_user_details.user_id
        overall_rating = final["rating"]["overall_score"]
        query = database.Mocks(owner_id = UserId, ai_summary = json.dumps(final), mock_rating=overall_rating)
        db.add(query)
        db.commit()
        db.refresh(query)
        return {"success": True}
    except Exception as error:
        db.rollback()
        return JSONResponse({"error": str(error)}, status_code=500)
