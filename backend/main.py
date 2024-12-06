from typing import List
from uuid import UUID, uuid4
from fastapi import FastAPI, HTTPException
from models import Tracker, TrackerUpdateRequest

app = FastAPI()

db: List[Tracker]=[
    Tracker(
        id=UUID("ecb76afb-0441-4c98-acf5-f3dd6e4d5c84"),
        truck_no= "TN01AB1234",
        truck_type= "Heavy",
        time_stamp= "14:30:00",  # Valid time format
        location= "Delhi"
    ),
    Tracker(
        id=UUID("ecb75afb-0441-4c98-acf5-f2dd6e5d5c83"),
        truck_no= "KA01BC5468",
        truck_type= "Open",
        time_stamp= "18:30:00",  # Valid time format
        location= "Bangalore"
    )
]

@app.get("/")
async def root():
    return {"Hello : Bro"}

@app.get("/Tracker/details")
async def fetch_Tracker():
    return db;

@app.post("/Tracker/details")
async def register_Tracker(tracker:Tracker):
    db.append(tracker)
    return {"id":tracker.id}

@app.put("/Tracker/details/{tacker_id}")
async def update_tracker(tracker_update: TrackerUpdateRequest, tracker_id: UUID):
    for tracker in db:
        if tracker.id == tracker_id:
            if tracker_update.truck_no is not None:
                tracker.truck_no=tracker_update.truck_no
            if tracker_update.truck_type is not None:
                tracker.truck_type=tracker_update.truck_type
            if tracker_update.time_stamp is not None:
                tracker.time_stamp=tracker_update.time_stamp
            if tracker_update.location is not None:
                tracker.location=tracker_update.location
            return
    raise HTTPException(
        status_code=404,
        detail=f"tracker with id: {tracker_id} does not exist"
    )

@app.delete("/Tracker/details/{tacker_id}")
async def delete_tracker(tracker_id: UUID):
    for tracker in db:
        if tracker.id == tracker_id:
            db.remove(tracker)
            return {"tacker removed"}
    raise HTTPException(
        status_code=404,
        detail=f"tracker with id : {tracker_id} does not exist"
    )

