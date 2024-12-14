from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import settings
from sqlalchemy.orm import declarative_base

Base= declarative_base()

SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL
print("Database URL is ",SQLALCHEMY_DATABASE_URL)
engine = create_engine(SQLALCHEMY_DATABASE_URL)


SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)