from resources.database import engine
from resources import database
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from JWT import verify_token
from routers import dashboard,login_router, signup_router, mock, summary, profile, about
database.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(dashboard.dash)
app.include_router(login_router.login)
app.include_router(signup_router.signup)
app.include_router(mock.mock)
app.include_router(summary.sm)
app.include_router(profile.p)
app.include_router(about.ab)
app.mount("/HTML", StaticFiles(directory="HTML"), name="HTML")
app.mount("/resources", StaticFiles(directory="resources"), name="resources")



@app.get("/")
def landing_page():
    return FileResponse("HTML/webcode/web.html")

@app.get("/verification123")
def verification(request: Request):
    verify = verify_token(request)
    if verify is True:
        return JSONResponse({"status": "authenticated"}, status_code=200)
    return verify

@app.get("/favicon.ico")
def favicon():
    return FileResponse("resources/media/brain.svg", media_type="image/svg+xml")


