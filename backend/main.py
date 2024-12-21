from datetime import datetime
from os import stat
from typing import List, Annotated
from uuid import UUID
from config import settings
from db.session import Base,engine, SessionLocal
from fastapi import FastAPI, HTTPException, Depends,status
from models import Tracker, TrackerUpdateRequest
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError


def start_application():
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    Base.metadata.create_all(bind=engine)
    return app

app = start_application()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.get("/truck/{truck_no}")
async def fetch_tracker(truck_no: str, db: db_dependency):
    tracker = db.query(Tracker).filter(Tracker.truck_no == truck_no).first()
    if not tracker:
        raise HTTPException(status_code=404, detail="Tracker not found")
    return tracker


# @app.post("/truck", status_code=status.HTTP_201_CREATED)
# async def create_tracker(
#     truck_no: str,
#     truck_type: str,
#     location_enter: str,
#     location_exit: str,
#     time_stamp_enter: datetime,
#     time_stamp_exit: datetime,
#     db: Session = db_dependency
# ):
#     try:
#         # Validate input data (if needed)
#         if not all([truck_no, truck_type, location_enter, location_exit]):
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST,
#                 detail="All fields (truck_no, truck_type, location_enter, location_exit) must be provided."
#             )

#         # Manually create the SQLAlchemy object
#         new_tracker = Tracker(
#             truck_no=truck_no,
#             truck_type=truck_type,
#             location_enter=location_enter,
#             location_exit=location_exit,
#             time_stamp_enter=time_stamp_enter,
#             time_stamp_exit=time_stamp_exit,
#         )
        
#         # Add to DB and commit
#         db.add(new_tracker)
#         db.commit()
#         db.refresh(new_tracker)

#         return {"message": "Tracker created successfully!", "data": new_tracker}

#     except SQLAlchemyError as e:
#         db.rollback()  # Rollback the transaction on error
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Database error occurred: {str(e)}"
#         )

#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"An unexpected error occurred: {str(e)}"
#         )
# @app.put("/")
# async def update_tracker(tracker_update: TrackerUpdateRequest, tracker_id: UUID, db: db_dependency):
#     tracker = db.query(Tracker).filter(Tracker.id == tracker_id).first()  # Find the tracker by ID
#     if not tracker:
#         raise HTTPException(status_code=404, detail=f"Tracker with id: {tracker_id} does not exist")

#     if tracker_update.truck_no is not None:
#         tracker.truck_no = tracker_update.truck_no
#     if tracker_update.truck_type is not None:
#         tracker.truck_type = tracker_update.truck_type
#     if tracker_update.time_stamp is not None:
#         tracker.time_stamp = tracker_update.time_stamp
#     if tracker_update.location is not None:
#         tracker.location = tracker_update.location

#     db.commit() 
#     db.refresh(tracker)
#     return tracker


@app.delete("/trackers/{truck_no}")
async def delete_tracker(truck_no: str, db: db_dependency):
    tracker = db.query(Tracker).get(truck_no)
    if not tracker:
        raise HTTPException(status_code=404, detail="Tracker not found")
    
    db.delete(tracker)
    db.commit()
    return {"detail": "Tracker deleted successfully"}

