from datetime import datetime, time
from typing import Optional
from uuid import UUID, uuid4
from sqlalchemy import Column, DateTime, Integer, String
from db.session import Base,engine

class Tracker(Base):
    __tablename__ = "truck"
    id= Column(String(50), primary_key=True)
    truck_no= Column(String(50), nullable=False)
    truck_type= Column(String(50), nullable=False)
    location_enter= Column(String(100), nullable=False)
    location_exit= Column(String(100), nullable=False)
    time_stamp_enter= Column(DateTime, default=datetime)
    time_stamp_exit= Column(DateTime, default=datetime)
    location_p = Column(DateTime, default=datetime)
    location_q = Column(DateTime, default=datetime)
    location_r = Column(DateTime, default=datetime)
    location_s = Column(DateTime, default=datetime)
    location_t = Column(DateTime, default=datetime)
    location_u = Column(DateTime, default=datetime)
    location_v = Column(DateTime, default=datetime)
    location_w = Column(DateTime, default=datetime)


class TrackerUpdateRequest(Base):
    __tablename__ = "truck"
    truck_no=Optional[str]
    truck_type=Optional[str]
    time_stamp=Optional[time]
    location=Optional[str]


Base.metadata.create_all(engine)

