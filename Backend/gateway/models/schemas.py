from pydantic import BaseModel

class SignupSchema(BaseModel):
    fullname:str
    email:str
    password:str

class SigninSchema(BaseModel):
    username:str
    password:str
class UserSchema(BaseModel):
    fullname:str
    email:str
    password:str
    role:int
    status:int