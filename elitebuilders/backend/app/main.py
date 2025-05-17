from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas
from .database import create_db_and_tables, get_db, engine

app = FastAPI(
    title="EliteBuilders API",
    description="API for the EliteBuilders AI Competition Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables at startup
@app.on_event("startup")
async def startup_event():
    create_db_and_tables()

# Helper Functions
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_challenge(db: Session, challenge_id: int):
    return db.query(models.Challenge).filter(models.Challenge.id == challenge_id).first()

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to EliteBuilders API"}
