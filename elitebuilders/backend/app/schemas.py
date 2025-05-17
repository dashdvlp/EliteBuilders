from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# Submission Schemas
class SubmissionBase(BaseModel):
    repo_link: str
    deck_link: str
    video_link: str

class SubmissionCreate(SubmissionBase):
    user_id: int  # Mock user ID

class Submission(SubmissionBase):
    id: int
    user_id: int
    challenge_id: int
    mock_status: str
    mock_score: Optional[int] = None
    submitted_at: datetime

    class Config:
        orm_mode = True  # For SQLAlchemy compatibility

# Challenge Schemas
class ChallengeBase(BaseModel):
    title: str
    description: str
    mock_deadline: Optional[str] = None
    mock_data_pack_url: Optional[str] = None
    mock_rubric_url: Optional[str] = None
    category: Optional[str] = None

class ChallengeCreate(ChallengeBase):
    pass

class Challenge(ChallengeBase):
    id: int
    submissions: List[Submission] = []  # To show submissions related to a challenge

    class Config:
        orm_mode = True

# User Schemas (Basic for now)
class UserBase(BaseModel):
    email_or_mock_identifier: str
    mock_github_link: Optional[str] = None
    mock_portfolio_link: Optional[str] = None
    mock_cv_link: Optional[str] = None

class UserCreate(UserBase):
    pass  # No extra fields for creation for now

class User(UserBase):
    id: int
    submissions: List[Submission] = []

    class Config:
        orm_mode = True 