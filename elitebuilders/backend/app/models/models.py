from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email_or_mock_identifier = Column(String, unique=True, index=True, nullable=False)
    mock_github_link = Column(String, nullable=True)
    mock_portfolio_link = Column(String, nullable=True)
    mock_cv_link = Column(String, nullable=True)

    # Relationships
    submissions = relationship("Submission", back_populates="owner")

class Challenge(Base):
    __tablename__ = 'challenges'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=False)
    mock_deadline = Column(String, nullable=True)  # e.g., "2025-05-30 23:59 UTC"
    mock_data_pack_url = Column(String, nullable=True)
    mock_rubric_url = Column(String, nullable=True)
    category = Column(String, nullable=True, index=True)  # e.g., "NLP", "Computer Vision"

    # Relationships
    submissions = relationship("Submission", back_populates="challenge")

class Submission(Base):
    __tablename__ = 'submissions'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    challenge_id = Column(Integer, ForeignKey('challenges.id'), nullable=False)
    repo_link = Column(String, nullable=False)
    deck_link = Column(String, nullable=False)
    video_link = Column(String, nullable=False)
    mock_status = Column(String, nullable=False, default='Pending Evaluation')
    mock_score = Column(Integer, nullable=True)
    submitted_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    # Relationships
    owner = relationship("User", back_populates="submissions")
    challenge = relationship("Challenge", back_populates="submissions") 