from fastapi import APIRouter,Request
from fastapi.responses import FileResponse,JSONResponse
import json

from resources import database
from resources.database import SessionLocal, Base, get_db
from JWT import send_current_user_email, verify_token
db = SessionLocal()
p = APIRouter()



def get_user_mocks(email):
    owner = db.query(database.Users).filter(database.Users.email == email).first()
    owner_name = owner.name
    mock_ratings = []
    mock_summary = []
    mock_created_at = []
    mock_id = []
    mock_details = db.query(database.Mocks).filter(database.Mocks.owner_id == owner.user_id).order_by(database.Mocks.created_at.desc()).all()
    for mock in mock_details:
        mock_ratings.append(mock.mock_rating)
        summary = json.loads(mock.ai_summary)
        mock_summary.append(summary["interview_summary"]["summary"])
        mock_created_at.append(mock.created_at)
        mock_id.append(mock.mock_id)
    return mock_ratings, mock_summary,mock_created_at,mock_id, owner_name



@p.get("/profile")
def summary_page():
    return FileResponse("HTML/webcode/profile.html")
    
    
@p.get("/profile/MockDetails")
def profile_details(request: Request):
    verification = verify_token(request)
    if verification is True:
        user_email = send_current_user_email(request)
        mock_ratings, mock_summary, mock_created_at, mock_id, owner_name = get_user_mocks(user_email)
        return {
            "MockRatings" : mock_ratings,
            "MockSummary" : mock_summary,
            "MockCreatedAt" : mock_created_at,
            "MockId" : mock_id,
            "Name" : owner_name
        }
    else:
        return JSONResponse({"error": "unauthenticated"}, status_code=401)
@p.post("/logout")
def logout():
    response = JSONResponse({"message": "Logged out"}, status_code=200)
    response.delete_cookie("access_token")
    return response