from fastapi import APIRouter
from models.schemas import WorkflowLogSchema
import httpx

router = APIRouter(prefix="/workflowlog")

SPRING_URL = "http://localhost:8081/"

@router.post("/save")
async def save_log(W: WorkflowLogSchema):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            SPRING_URL + "workflowlog/save",
            json=W.model_dump()
        )
    return response.json()

@router.get("/all")
async def get_all_logs():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            SPRING_URL + "workflowlog/all"
        )
    return response.json()