from .db import db, environment, SCHEMA, add_prefix_for_prod

class Status(db.Model):
    __tablename__ = "statuses"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Keys: ID, Stauts Type,
    # -------------------------------------------------- 
    id = db.Column(db.Integer, primary_key=True)
    status_type = db.Column(db.String(55), nullable=False,unique=True,default="Inquiry")

    # ------------------------
    # Incorpotate an Updated at in the future?
    # - Why?:
    #   - Data on the whole life cycle of a patient  
    #   - eg(Inquiry => Onboarding, Onboarding => Active, Active => Chruned)
    #   - Allow to get a better grasp on which part of the system are working 
    # 
    # ------------------------
    
    # -------------------------------------------------- 

    # Foreign Keys 
    patient_status = db.relationship("Patient",back_populates="status")

    def to_dict(self):
        return{
            "id":self.id,
            "type":self.status_type
        }
