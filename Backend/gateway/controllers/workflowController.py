from fastapi import APIRouter
from models.schemas import WorkflowSchema
import httpx

router = APIRouter(prefix="/workflow")

SPRING_URL = "http://localhost:8081/"



@router.post("/submitleave")
async def submitleave(W: WorkflowSchema):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            SPRING_URL + "workflow/submitleave",
            json=W.model_dump()
        )
    return response.json()


@router.get("/all")
async def getallworkflows():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            SPRING_URL + "workflow/all"
        )
    return response.json()


# NEW API

@router.get("/pending/{role}")
async def get_pending_workflows(role: str):

    async with httpx.AsyncClient() as client:

        response = await client.get(
            NODE_URL + f"workflow/pending/{role}"
        )

    return response.json()

@router.delete("/deleteworkflow/{id}")
async def delete_workflow(id: str):

    async with httpx.AsyncClient() as client:

        response = await client.delete(
            NODE_URL + f"workflow/deleteworkflow/{id}"
        )

    return response.json()