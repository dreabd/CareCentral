from flask import Blueprint, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User,Patient

patient_routes = Blueprint('patient', __name__)

# Get All Patients Under a Provider
@patient_routes.route("/")
@login_required
def get_all_patients():
    '''
    This route will grab all the patients asscociated with a particular 
    provider.
    '''

    # Queries Patient Table for Patients whose Provider is the Current User
    user_patients = Patient.query.filter(Patient.provider_id == current_user.id).all()

    # Transforms this list into a JSON obj 
    patients = [patient.to_dict() for patient in user_patients]

    # Sends the JSON Object 
    return{"patients": patients}

# Get Single Patient Info
@patient_routes.route("/<int:id>")
@login_required
def get_single_patient(id):
    '''
    This route will grab a specific patient by their id and return the following:
    - Notes
    - Addresses 
    '''

    patient = Patient.query.filter(Patient.id == id).first()

    if(current_user.id != patient.provider_id):
        return{"error":"unauthorized"},401

    res =patient.single_patient_dict()

    return {"patient": res}


# Edit a Single Patient's Information
@patient_routes.route('/<int:id>')
@login_required
def put_single_patient(id):
    '''
    ONLY THE CURRENT PROVIDER COULD ADJUST ASPECTS OF A PATIENTS INFO
    This route will allow the current provider change a patient's information
    '''


