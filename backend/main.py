from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from services.users.router import router as users_router
from services.forum.router import router as forum_router

app = FastAPI(title="Аспандас API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router, prefix="/api")
app.include_router(forum_router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok"}
