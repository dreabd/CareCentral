from .db import db, environment, SCHEMA, add_prefix_for_prod

class Address(db.Model):
    __tablename__ ="addresses"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Keys: ID, Patient ID, Address, Current
    # -------------------------------------------------- 
    id = db.Column(db.Integer,primary_key = True)

    patient_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("patients.id")),
        nullable=False,
        )
    
    # Address
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100),nullable=False)
    state = db.Column(db.String(2),nullable=False)

    # Current
    isCurrent = db.Column(db.Boolean(),nullable=False,default=True)
    # -------------------------------------------------- 

    # Foreign Keys 
    patient_address = db.relationship("Patient",back_populates="address")

    def to_dict(self):
        return{
            "address":self.address,
            "city":self.city,
            "state": self.state,
            "current": self.isCurrent
        }