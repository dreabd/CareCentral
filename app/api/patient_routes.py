from flask import Blueprint,request
from flask_login import current_user,login_required
from app.models import db,Patient

from app.forms.patient_form import EditPatientForm,PatinentAddressForm,PatientNotesForm

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
@patient_routes.route('/<int:id>',methods=["PUT"])
@login_required
def put_single_patient(id):
    '''
    ONLY THE CURRENT PROVIDER COULD ADJUST ASPECTS OF A PATIENTS INFO
    This route will allow the current provider change a patient's information
    '''

    patient = Patient.query.filter(Patient.id == id).first()

    if patient is None:
        return {"errors": "Patient Could not be found"},404

    if (current_user.id != patient.provider_id):
        return{"Error":"Unauthorized"},401

    form = EditPatientForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        if data["first_name"]:
            patient.first_name = data["first_name"]
        if not data["middle_name"]:
            patient.middle_name = None
        if data["middle_name"]:
            patient.middle_name = data["middle_name"]
        if data["last_name"]:
            patient.last_name = data["last_name"]
        if data["provider_id"]:
            patient.provider_id = data["provider_id"]
        if data["status_id"]:
            patient.status_id = data["status_id"]
        if data["date_of_birth"]:
            patient.date_of_birth = data["date_of_birth"]

        db.session.commit()
        return {"patient": patient.to_dict()}

    if form.errors:
        return{"errors":form.errors},400

# Edit a Single Patient Address
# Add an Address to a Single Patient

# Add Note to a patient
# Edit Patient Note
