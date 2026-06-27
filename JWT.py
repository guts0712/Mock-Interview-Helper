from datetime import datetime, timedelta, timezone
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Request
from jwt.exceptions import InvalidTokenError
from fastapi.responses import FileResponse, JSONResponse
from config import secret_key


SECRET_KEY = secret_key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 300

def create_acess_token(data : dict):
    to_encode = data.copy()
    expire = datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp" : expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

def verify_token(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        return JSONResponse({"error": "unauthenticated"}, status_code=401)
    try:
        decoded = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )
        return True
    except InvalidTokenError:
        return JSONResponse({"error": "unauthenticated"}, status_code=401)

def send_current_user_email(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        return JSONResponse({"error": "unauthenticated"}, status_code=401)
    try:
        decoded = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )
        return decoded["email"]
    except InvalidTokenError:
        return JSONResponse({"error": "unauthenticated"}, status_code=401)