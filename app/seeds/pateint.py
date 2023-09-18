from app.models import db, Patient, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_patients():
    Jacob = Patient(
        first_name="Jacob",
        last_name="Smith",
        provider_id=2,
        status_id=1,
        date_of_birth=datetime.today(),
    )
    Luffy = Patient(
        first_name="Luffy",
        middle_name="D.",
        last_name="Monkey",
        provider_id=1,
        status_id=1,
        date_of_birth=datetime.today(),
    )
    Zoro = Patient(
        first_name="Zoro",
        last_name="Roronoa",
        provider_id=1,
        status_id=1,
        date_of_birth=datetime.today(),
    )

    db.session.add(Jacob)
    db.session.add(Luffy)
    db.session.add(Zoro)
    db.session.commit()


def undo_patients():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.patients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM patients"))
        
    db.session.commit()