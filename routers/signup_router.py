from fastapi import APIRouter
from fastapi.responses import FileResponse
from createuser import email_verification, user_creation
from resources import schemas
signup = APIRouter()

@signup.get("/signup")
def signup_page():
    return FileResponse("HTML/webcode/signup.html")

@signup.post("/verify_email")
def verify_email(unverifiedemail : schemas.EmailRequest):
    result = email_verification(unverifiedemail.email)
    return {"result": result}

@signup.post("/createuser")
def creating_new_user(userdata : schemas.UserData):
    create_new_user = user_creation(userdata.name,userdata.email, userdata.password)
    if create_new_user :
        return {
            "result" : True
        }
    return {
        "result": False
    }