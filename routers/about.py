from fastapi import APIRouter,Request
from fastapi.responses import FileResponse,JSONResponse
from JWT import verify_token

ab = APIRouter()

@ab.get("/about")
def about(request: Request):
    return FileResponse("HTML/webcode/about.html")

@ab.get("/profile_verification")
def verification(request: Request):
    verification_ = verify_token(request)
    if verification_ is True:
        return JSONResponse({"success": "authenticated"}, status_code=200)
    else:
        return JSONResponse({"error": "unauthenticated"}, status_code=401)