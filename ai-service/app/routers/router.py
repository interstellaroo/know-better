from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.ai_service import analyze_classify

class AnalyzeRequest(BaseModel):
    text: str


router = APIRouter()
@router.post("/analyze/classify/")
async def analyze(request: AnalyzeRequest):
    response = analyze_classify(request.text)
    if not response:
        raise HTTPException(status_code=500, detail="Failed to get AI response")
    return {"response": response}