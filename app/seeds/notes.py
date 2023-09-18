from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_notes():
    luffy_note1 = Note(
        patient_id= 2,
        text="After eatting the Gum-Gum fruit, patient has turned into a rubber man"
    )
    luffy_note2 = Note(
        patient_id= 2,
        text="Appetite is huge, he could even eat while he is sleeping"
    )
    luffy_note3 = Note(
        patient_id= 2,
        text="2Years not 3Days"
    )

    zoro_note1=Note(
        patient_id=3,
        text="3 Swords are better than 1."
    )
    zoro_note2=Note(
        patient_id=3,
        text="Fighting machine"
    )
    zoro_note3=Note(
        patient_id=3,
        text="Why is he always getting lost"
    )

    db.session.add(luffy_note1)
    db.session.add(luffy_note2)
    db.session.add(luffy_note3)
    db.session.add(zoro_note1)
    db.session.add(zoro_note2)
    db.session.add(zoro_note3)

    db.session.commit()


def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))
        
    db.session.commit()