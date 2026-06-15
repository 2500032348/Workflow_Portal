from fastapi import APIRouter
from models.schemas import ApprovalSchema
import httpx

router = APIRouter(prefix="/approval")

SPRING_URL = "http://localhost:8081/"

@router.post("/save")
async def saveapproval(A: ApprovalSchema):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            SPRING_URL + "approval/save",
            json=A.model_dump()
        )
    return response.json()

@router.get("/all")
async def getallapprovals():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            SPRING_URL + "approval/all"
        )
    return response.json()