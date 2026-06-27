from fastapi import APIRouter,Response, Request
from fastapi.responses import FileResponse, JSONResponse
from resources import schemas
from createuser import email_must_exist, password_check
from JWT import create_acess_token, verify_token
login = APIRouter()

@login.get("/login")
def login_page():
    return FileResponse("HTML/webcode/login.html")

@login.get("/login_verification")
def verification(request: Request):
    token = verify_token(request)
    if token is True:
        return JSONResponse({"authenticated": True}, status_code=200)
    return JSONResponse(
        {"authenticated": False},
        status_code=401
    )

@login.post("/checkemail")
def check_email(checkemail : schemas.EmailRequest):
    check_email = email_must_exist(checkemail.email)
    return {"result": check_email}
        
@login.post("/checkpassword")
def checkpassword(data : schemas.PasswordRequest):
    check_password = password_check(data.email, data.password)
    if check_password:
        return {
            "result" : True
        }
    else :
        return {
            "result" : False
        }

@login.post("/createjwt")
def create_jwt(data : schemas.TokenDetails, response: Response):
    token = create_acess_token(data.model_dump())
    response.set_cookie(
        key="access_token",
        value = token,
        httponly=True
    )
    return {"token": token}

