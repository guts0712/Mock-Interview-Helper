from typing import Dict

from pydantic import BaseModel, EmailStr


class EmailRequest(BaseModel):
    email : EmailStr

class UserData(BaseModel):
    name : str
    email : EmailStr
    password : str

class PasswordRequest(BaseModel):
    email : EmailStr
    password : str

class userin_beforehash(BaseModel):
    name : str
    email : EmailStr
    password : str
class userin_afterhash(BaseModel):
    name : str
    email : EmailStr
    password_hashed : str

class user_get(BaseModel):
    name : str
    user_id : int
    email : EmailStr
    created_at :str

class TokenDetails(BaseModel):
    email : EmailStr
    
class MockSelection(BaseModel):
    job: int
    time: int
    difficulty: str
    