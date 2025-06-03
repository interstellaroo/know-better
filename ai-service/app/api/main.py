from fastapi import APIRouter
from app.routers.router import router

api_router = APIRouter()
api_router.include_router(router, prefix="/ai", tags=["AI"]) 