from fastapi import FastAPI
from app.api.main import api_router

app = FastAPI(
    title="AI fact-check API",
    description="AI API service for knowBetter",
    version="1.0.0",
)

app.include_router(api_router)
