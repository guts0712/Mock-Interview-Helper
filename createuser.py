from resources import database
from resources.database import SessionLocal, Base, get_db
from authenticate import hashing_password, verify_password
from resources import schemas
db = SessionLocal()

def user_creation(name, email, password_creation):
    user_beforehash = schemas.userin_beforehash(name = name, email=email, password = password_creation)
    hashed_password = hashing_password(user_beforehash.password)
    user_afterhash = schemas.userin_afterhash(name = name,email=email, password_hashed= hashed_password)
    querry = database.Users(name = user_afterhash.name, email = user_afterhash.email, password_hashed = user_afterhash.password_hashed)
    db.add(querry)
    db.commit()
    db.refresh(querry)
    return True
    
def email_verification(email):
    querry_email_result = db.query(database.Users).filter(database.Users.email == email).first()
    if querry_email_result is None:
        return True
    else :
        return False

def email_must_exist(email):
    querry_result = db.query(database.Users).filter(database.Users.email == email).first()
    if querry_result is not None:
        return True
    else :
        return False

def password_check(email, password):
    user_details = db.query(database.Users).filter(database.Users.email == email).first()
    if user_details is None:
        return False
    password_confirmation = verify_password(user_details.password_hashed, password)
    return password_confirmation
