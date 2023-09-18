from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Patient(db.Model):
    __tablename__= "patients"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    # Keys: ID, Name(F,M,L), Provider ID, Status ID, Birthday, Created At
    # ---------------------------------------------------------------------------
    id = db.Column(db.Integer, primary_key=True)

    # Name
    first_name = db.Column(db.String(55),nullable=False)
    middle_name = db.Column(db.String(55),nullable=True)
    last_name = db.Column(db.String(55),nullable = False)

    # Provider ID
    provider_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        nullable=False
        )

    # # Status:[Inquiry,Onboarding,Active, Churned]
    # # Enum better for the future? 
    status_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("statuses.id")),
        nullable=False
        )

    # Birthday
    date_of_birth = db.Column(db.DateTime,nullable=False)
    
    # Created At
    created_at =  db.Column(db.DateTime,nullable=False,default=datetime.utcnow)
    
    # ---------------------------------------------------------------------------

    # Foreign Keys
    status = db.relationship("Status",back_populates="patient_status")
    provider = db.relationship("User",back_populates="user")
    notes = db.relationship("Note", back_populates="patient_note")
    address = db.relationship("Address",back_populates="patient_address")

    # Function to return an JSON object for Get All Patients
    def to_dict(self):
        return{
            "first_name": self.first_name,
            "middle_name": self.middle_name,
            "last_name": self.last_name,
            "status": self.status.to_dict()["type"],
            "addresses": [address.to_dict() for address in self.address if address.isCurrent],
            "date_of_birth": self.date_of_birth,
            }
    
    # Functio to return a JSON Object for Get Single Patient
    def single_patient_dict(self):
        return{
            "first_name": self.first_name,
            "middle_name": self.middle_name,
            "last_name": self.last_name,
            "status": self.status.to_dict()["type"],
            "addresses": [address.to_dict() for address in self.address],
            "date_of_birth": self.date_of_birth,
            "notes":[note.to_dict() for note in self.notes]
        }
    
