from fastapi import APIRouter
from models.schemas import ReviewSchema
import httpx

router = APIRouter(prefix="/review")

SPRING_URL = "http://localhost:8081/"

@router.post("/save")
async def save_review(R: ReviewSchema):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            SPRING_URL + "review/save",
            json=R.model_dump()
        )
    return response.json()

@router.get("/all")
async def get_all_reviews():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            SPRING_URL + "review/all"
        )
    return response.json()