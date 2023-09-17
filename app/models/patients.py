from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixina

class Patient(db.Model):
    __tablename__= "patients"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    # Name
    first_name = db.Column(db.String(55),nullable=False)
    middle_name = db.Column(db.String(55),nullable=True)
    last_name = db.Column(db.String(55),nullable = False)

    # Provider ID
    provider_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("user.id")),
        nullable=False
        )

    # Status:[Inquiry,Onboarding,Active, Churned]
    status_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("status.id")),
        nullable=False
        )

    # Address
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100),nullable=False)
    state = db.Column(db.String(2),nullable=False)

    # Birthday
    date_of_birth = db.Column(db.DateTime,nullable=False)
    
    created_at =  db.Column(db.DateTime,nullable=False)

    # Foreign Keys
    status = db.relationship("Category", back_populates="transaction")
    provider = db.relationship("User", back_populates="user")

    # Function to return an JSON object 
    def to_dict(self):
        return{
            "id": self.id,
            "first_name": self.first_name,
            "middle_name": self.middle_name,
            "last_name": self.last_name,
            "provider_id": self.provider_id,
            "status_id": self.status_id,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "date_of_birth": self.date_of_birth,
            }