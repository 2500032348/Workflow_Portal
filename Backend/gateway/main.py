from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.init import *

app = FastAPI()
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(AuthenticationRouter)
app.include_router(WorkflowRouter)
app.include_router(ApprovalRouter)
app.include_router(ReviewRouter)
app.include_router(WorkflowLogRouter)

@app.get("/")
def home():
    return "Started FastAPI on 15.4.2026...."
