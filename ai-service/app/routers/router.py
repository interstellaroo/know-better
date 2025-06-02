from fastapi import APIRouter, HTTPException
from app.core.ai_service import get_ai_eval

router = APIRouter()
@router.post("/analyze/")
async def analyze(text: str):
    response = get_ai_eval(text)
    if not response:
        raise HTTPException(status_code=500, detail="Failed to get AI response")
    return {"response": response}