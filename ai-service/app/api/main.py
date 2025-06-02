from fastapi import APIRouter
from app.routers.router import router

api_router = APIRouter()
router.include_router(api_router, prefix="/ai", tags=["AI"])