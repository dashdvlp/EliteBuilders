from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import challenges, users, submissions, auth
from .database import create_tables

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

# Create database tables on startup
@app.on_event("startup")
async def startup_event():
    await create_tables()

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(challenges.router, prefix="/api/challenges", tags=["Challenges"])
app.include_router(submissions.router, prefix="/api/submissions", tags=["Submissions"])

@app.get("/")
async def root():
    return {"message": "Welcome to EliteBuilders API"} 