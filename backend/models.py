from datetime import time
from typing import Optional
from uuid import UUID, uuid4
from pydantic import BaseModel

class Tracker(BaseModel):
    id: Optional[UUID] = uuid4()
    truck_no: str
    truck_type: str
    time_stamp: time
    location: str

class TrackerUpdateRequest(BaseModel):
    truck_no: Optional[str]
    truck_type:Optional[str]
    time_stamp:Optional[time]
    location: Optional[str]
