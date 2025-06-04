from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.ai_service import analyze_classify, analyze_sentiment

class AnalyzeRequest(BaseModel):
    text: str


router = APIRouter()
@router.post("/analyze/classify/")
async def analyze(request: AnalyzeRequest):
    response = analyze_classify(request.text)
    if not response:
        raise HTTPException(status_code=500, detail="Failed to get classification AI response")
    return {"response": response}

@router.post("/analyze/sentiment")
async def analyze(request: AnalyzeRequest):
    response = analyze_sentiment(request.text)
    if not response:
        raise HTTPException(status_code=500, detail="Failed to get sentiment AI response")
    return {"response": response}