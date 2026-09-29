from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .config import settings
from .database import Base, engine
from .routers import auth_router, users_router

# Creates the database tables if they do not exist yet.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Visionary AI Studio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(users_router.router)


@app.get("/")
def root():
    return {"status": "ok", "message": "Visionary AI Studio API is running."}