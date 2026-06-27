from fastapi import APIRouter, Request
from fastapi.responses import FileResponse, JSONResponse
import jwt
from jwt.exceptions import InvalidTokenError
from JWT import SECRET_KEY
from resources import database
from resources.database import SessionLocal, Base, get_db

db = SessionLocal()

dash = APIRouter()

def rating_to_number(rating):
    try:
        if isinstance(rating, str) and "/" in rating:
            return float(rating.split("/")[0])
        return float(rating)
    except (TypeError, ValueError):
        return 0

@dash.get("/dashboard")
def dashboard_page():
    return FileResponse("HTML/webcode/dashboard.html")

@dash.get("/dashboard_data")
def dashboard_page_data(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        return JSONResponse({"error": "unauthenticated"}, status_code=401)
    try:
        decoded = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )
    except InvalidTokenError:
        return JSONResponse({"error": "unauthenticated"}, status_code=401)
    user_email = decoded["email"]
    user = db.query(database.Users).filter(database.Users.email == user_email).first()
    if user is None:
        return JSONResponse({"error": "unauthenticated"}, status_code=401)
    mocks = db.query(database.Mocks).filter(database.Mocks.owner_id == user.user_id).all()
    total_mocks = len(mocks)
    recent_mock_query = db.query(database.Mocks).filter(database.Mocks.owner_id == user.user_id).order_by(database.Mocks.created_at.desc()).first()
    if recent_mock_query is None:
        recent_mock_rating = 0
    else :
        recent_mock_rating = rating_to_number(recent_mock_query.mock_rating)
    total = 0
    if total_mocks == 0:
        recent_mock_rating = 0
    else:
        for mock in mocks:
            total += rating_to_number(mock.mock_rating)
    if total_mocks == 0:
        avg = 0
    else:
        avg = round(total/total_mocks, 1)
    user_details = {
        "user_id" : user.user_id,
        "name" :user.name,
        "email": user.email,
        "mock_count": total_mocks,
        "avg_rating" : avg,
        "recent_rating" : recent_mock_rating
    }
    return user_details
