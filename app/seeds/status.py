from app.models import db, Status, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_status():
    Inquiry = Status(status_type="Inquiry")
    Onboarding = Status(status_type="Onboarding")
    Active = Status(status_type="Active")
    Churned = Status(status_type="Churned")
    db.session.add(Inquiry)
    db.session.add(Onboarding)
    db.session.add(Active)
    db.session.add(Churned)
    db.session.commit()

def undo_status():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.statuses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM statuses"))
        
    db.session.commit()