import os
from sqlalchemy import create_engine, Column, Integer,String,ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql.expression import text
from config import url


DB_URL = url or os.getenv("DATABASE_URL") or os.getenv("database_url") or "sqlite:///./mock_interview_helper.db"
engine_kwargs = {}
if DB_URL.startswith("sqlite"):
    engine_kwargs["connect_args"] = {"check_same_thread": False}
engine = create_engine(DB_URL, **engine_kwargs)
SessionLocal = sessionmaker(autocommit= False, autoflush = False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try :
        yield db
    finally:
        db.close()


class Users(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String,nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hashed = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=False), nullable=False, server_default= text('CURRENT_TIMESTAMP'))
    
class Mocks(Base):
    __tablename__ = "mockdata"
    mock_id = Column(Integer, primary_key=True, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    ai_summary = Column(String, nullable=False)
    mock_rating = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=False), nullable=False, server_default= text('CURRENT_TIMESTAMP'))
    owner = relationship("Users")