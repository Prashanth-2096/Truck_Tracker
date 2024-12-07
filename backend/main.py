from typing import List, Annotated
from uuid import UUID
from config import settings
from db.session import engine, SessionLocal
from db.base_class import Base
from fastapi import FastAPI, HTTPException, Depends
from models import Tracker, TrackerUpdateRequest
from sqlalchemy.orm import Session


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


@app.get("/Tracker/details")
async def fetch_Tracker(db: db_dependency):
    trackers = db.query(Tracker).all()  
    return trackers


@app.post("/Tracker/details")
async def register_Tracker(tracker: Tracker, db: db_dependency):
    db.add(tracker)  
    db.commit() 
    db.refresh(tracker)
    return {"id": tracker.id}


@app.put("/Tracker/details/{tracker_id}")
async def update_tracker(tracker_update: TrackerUpdateRequest, tracker_id: UUID, db: db_dependency):
    tracker = db.query(Tracker).filter(Tracker.id == tracker_id).first()  # Find the tracker by ID
    if not tracker:
        raise HTTPException(status_code=404, detail=f"Tracker with id: {tracker_id} does not exist")

    if tracker_update.truck_no is not None:
        tracker.truck_no = tracker_update.truck_no
    if tracker_update.truck_type is not None:
        tracker.truck_type = tracker_update.truck_type
    if tracker_update.time_stamp is not None:
        tracker.time_stamp = tracker_update.time_stamp
    if tracker_update.location is not None:
        tracker.location = tracker_update.location

    db.commit() 
    db.refresh(tracker)
    return tracker


@app.delete("/Tracker/details/{tracker_id}")
async def delete_tracker(tracker_id: UUID, db: db_dependency):
    tracker = db.query(Tracker).filter(Tracker.id == tracker_id).first()  
    if not tracker:
        raise HTTPException(status_code=404, detail=f"Tracker with id: {tracker_id} does not exist")

    db.delete(tracker)  
    db.commit() 
    return {"message": f"Tracker with id {tracker_id} removed successfully"}
