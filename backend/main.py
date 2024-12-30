from datetime import datetime
import logging
from os import stat
from typing import List, Annotated
from uuid import UUID
from config import settings
from db.session import Base, engine, SessionLocal
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from models import Tracker, TrackerUpdateRequest
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text


def start_application():
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    Base.metadata.create_all(bind=engine)
    
    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Allow all origins; restrict as needed
        allow_credentials=True,
        allow_methods=["*"],  # Allow all HTTP methods
        allow_headers=["*"],  # Allow all headers
    )
    return app


app = start_application()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.get("/")
async def fetch_tracker(db: db_dependency):
    tracker = db.query(Tracker).all()
    if not tracker:
        raise HTTPException(status_code=404, detail="Tracker not found")
    return tracker


@app.get("/truck/{truck_no}")
async def fetch_tracker(truck_no: str, db: db_dependency):
    tracker = db.query(Tracker).filter(Tracker.truck_no == truck_no).first()
    if not tracker:
        raise HTTPException(status_code=404, detail="Tracker not found")
    return tracker


@app.delete("/truck/{truck_no}")
async def delete_tracker(truck_no: str, db: db_dependency):
    try:
        # Attempt to fetch the tracker
        tracker = db.query(Tracker).get(truck_no)
        if not tracker:
            raise HTTPException(status_code=404, detail="Tracker not found")
        
        # Delete the tracker and commit the changes
        db.delete(tracker)
        db.commit()
        
        return {"detail": f"Tracker with truck number {truck_no} deleted successfully"}
    
    except HTTPException as http_exc:
        # Re-raise HTTP exceptions directly
        raise http_exc

    except Exception as e:
        # Log the error and raise a general HTTP exception
        logging.error(f"Error while deleting tracker with truck_no {truck_no}: {e}")
        raise HTTPException(
            status_code=500, detail="An error occurred while deleting the tracker"
        )

from pydantic import BaseModel
from typing import Optional

# Pydantic model for request validation
class TrackerCreateRequest(BaseModel):
    id:Optional[int]
    truck_no: str
    truck_type: str
    location_enter: str
    location_exit: str
    time_stamp_enter: datetime
    time_stamp_exit: datetime
    location_p: Optional[datetime] = None
    location_q: Optional[datetime] = None
    location_r: Optional[datetime] = None
    location_s: Optional[datetime] = None
    location_t: Optional[datetime] = None
    location_u: Optional[datetime] = None
    location_v: Optional[datetime] = None
    location_w: Optional[datetime] = None

@app.post("/truck", status_code=status.HTTP_201_CREATED)
async def create_tracker(request: TrackerCreateRequest, db: db_dependency):
    try:
        # Check if the truck with the same truck_no already exists
        logging.info(f"Incoming request: {request}")
        existing_truck_query = text("""
        SELECT COUNT(*) FROM truck WHERE truck_no = :truck_no
        """)
        existing_truck_count = db.execute(existing_truck_query, {"truck_no": request.truck_no}).scalar()

        if existing_truck_count > 0:
            raise HTTPException(status_code=400, detail="Tracker with this truck number already exists.")

        # SQL query to insert data into the 'truck' table
        insert_query = text("""
        INSERT INTO truck (truck_no, truck_type, location_enter, location_exit, time_stamp_enter, time_stamp_exit, 
                           location_p, location_q, location_r, location_s, location_t, location_u, location_v, location_w) 
        VALUES (:truck_no, :truck_type, :location_enter, :location_exit, :time_stamp_enter, :time_stamp_exit, 
                :location_p, :location_q, :location_r, :location_s, :location_t, :location_u, :location_v, :location_w)
        """)

        # Values to insert
        values = {
            "truck_no": request.truck_no,
            "truck_type": request.truck_type,
            "location_enter": request.location_enter,
            "location_exit": request.location_exit,
            "time_stamp_enter": request.time_stamp_enter,
            "time_stamp_exit": request.time_stamp_exit,
            "location_p": request.location_p,
            "location_q": request.location_q,
            "location_r": request.location_r,
            "location_s": request.location_s,
            "location_t": request.location_t,
            "location_u": request.location_u,
            "location_v": request.location_v,
            "location_w": request.location_w,
        }

        # Execute query using raw SQL
        db.execute(insert_query, values)
        db.commit()

        return {"detail": "Tracker created successfully."}
    except Exception as e:
        logging.error(f"Error while creating tracker: {e}")
        raise HTTPException(
            status_code=500, detail="An error occurred while creating the tracker"
        )

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


