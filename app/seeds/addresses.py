from app.models import db, Address, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_addresses():
    luffy_add1 = Address(
        patient_id=2,
        address="Foosha Village",
        city="Kauai",
        state="HI",
        isCurrent=False
    )
    luffy_add2 = Address(
        patient_id=2,
        address="Thousands Sunny",
        city="Oahu",
        state="HI",
        isCurrent=True
    )
    zoro_add1 = Address(
        patient_id=3,
        address="Thousands Sunny",
        city="Oahu",
        state="HI",
        isCurrent=True
    )
    jacob_add1 = Address(
        patient_id=1,
        address="123 Lamps Ave",
        city="Placentia",
        state="CA",
        isCurrent=True

    )
    db.session.add(luffy_add1)
    db.session.add(luffy_add2)
    db.session.add(zoro_add1)
    db.session.add(jacob_add1)
    db.session.commit()


def undo_addresses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.addresses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM addresses"))
        
    db.session.commit()