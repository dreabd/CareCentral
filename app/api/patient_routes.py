from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Patient, Note,Address

from app.forms.patient_form import PatientForm, PatinentAddressForm, PatientNotesForm

patient_routes = Blueprint("patient", __name__)


# Get All Patients Under a Provider
@patient_routes.route("/")
@login_required
def get_all_patients():
    """
    This route will grab all the patients asscociated with a particular
    provider.
    """

    # Queries Patient Table for Patients whose Provider is the Current User
    user_patients = Patient.query.filter(Patient.provider_id == current_user.id).all()

    # Transforms this list into a JSON obj
    patients = [patient.to_dict() for patient in user_patients]

    # Sends the JSON Object
    return {"patients": patients}


# Create a new Patient
@patient_routes.route("/", methods=["POST"])
@login_required
def add_new_patient():
    """
    This route will add a new patient to the current provider
    """

    form = PatientForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        new_patient = Patient(
            first_name=data["first_name"],
            middle_name=data["middle_name"],
            last_name=data["last_name"],
            provider_id=data["provider_id"],
            status_id=data["status_id"],
            date_of_birth=data["date_of_birth"],
        )

        db.session.add(new_patient)
        db.session.commit()
        return {"new_patient": new_patient.to_dict()}

    if form.errors:
        return {"errors": form.errors}, 400


# Add Note to a patient
@patient_routes.route("/<int:id>/note", methods=["POST"])
@login_required
def add_patient_note(id):
    """
    This route will allow providers to add notes to a patient's profile
    """

    patient = Patient.query.filter(Patient.id == id).first()

    if current_user.id != patient.provider_id:
        return {"error": "unauthorized"}, 401

    form = PatientNotesForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        new_note = Note(title=data["title"], text=data["text"], patient_id=id)
        print("👀👀👀👀👀👀👀👀👀👀👀👀👀👀👀👀👀👀👀", new_note)

        db.session.add(new_note)
        db.session.commit()
        return {"newNote": new_note.to_dict()}

    if form.errors:
        return {"errors": form.errors}, 400


# Add an Address to a Single Patient
@patient_routes.route("/<int:id>/address",methods=["POST"])
@login_required
def add_patient_address(id):
    '''
    This route will allow a provider to add an address to the patients profile
    '''

    patient = Patient.query.filter(Patient.id == id).first()

    if patient is None:
        return {"errors": "Patient Could not be found"},404
    
    if (current_user.id != patient.provider_id):
        return{"Error":"Unauthorized"},401
    
    form = PatinentAddressForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    
    if form.validate_on_submit():
        data = form.data

        new_address = Address(
            address = data["address"],
            city = data["city"],
            state = data["state"],
            isCurrent = data["isCurrent"],
            patient_id = id
        )

        db.session.add(new_address)
        db.session.commit()
        return {"newNote":new_address.to_dict()}

    if form.errors:
        return{"errors":form.errors},400

# Get Single Patient Info
@patient_routes.route("/<int:id>")
@login_required
def get_single_patient(id):
    """
    This route will grab a specific patient by their id and return the following:
    - Notes
    - Addresses
    """

    patient = Patient.query.filter(Patient.id == id).first()

    if current_user.id != patient.provider_id:
        return {"error": "unauthorized"}, 401

    res = patient.single_patient_dict()

    return {"patient": res}


# Edit a Single Patient's Information
@patient_routes.route("/<int:id>", methods=["PUT"])
@login_required
def put_single_patient(id):
    """
    ONLY THE CURRENT PROVIDER COULD ADJUST ASPECTS OF A PATIENTS INFO
    This route will allow the current provider change a patient's information
    """

    patient = Patient.query.filter(Patient.id == id).first()

    if patient is None:
        return {"errors": "Patient Could not be found"}, 404

    if current_user.id != patient.provider_id:
        return {"Error": "Unauthorized"}, 401

    form = PatientForm()
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
        return {"errors": form.errors}, 400


# Edit a Single Patient Address
@patient_routes.route("<int:id>/address/<int:address_id>",methods=["PUT"])
@login_required
def edit_patient_address(id,address_id):
    '''
    Proividers will be able to edit address that they previously added
    '''
    patient = Patient.query.filter(Patient.id == id).first()
    editted_address = Address.query.filter(Address.id == address_id).first()

    if patient is None:
        return {"errors": "Patient Could not be found"},404

    if (current_user.id != patient.provider_id):
        return{"Error":"Unauthorized"},401
    
    if editted_address is None:
        return {"errors": "Address Could not be found"},404

    form = PatinentAddressForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        if data["address"]:
            editted_address.address = data["address"]
        if data["city"]:
            editted_address.city = data["city"]
        if data["state"]:
            editted_address.state = data["state"]
        if data["isCurrent"]:
            editted_address.isCurrent = data["isCurrent"]

        db.session.commit()
        return {"address": editted_address.to_dict()}

    if form.errors:
        return{"errors":form.errors},400

# Edit Patient Note
@patient_routes.route("/<int:id>/note/<int:note_id>", methods=["PUT"])
@login_required
def edit_patient_note(id, note_id):
    """
    This will allow providers to edit notes that have made in the past
    """

    patient = Patient.query.filter(Patient.id == id).first()
    edited_note = Note.query.filter(Note.id == note_id).first()

    if patient is None:
        return {"errors": "Patient Could not be found"}, 404

    if edited_note is None:
        return {"errors": "Note Could not be found"}, 404

    if current_user.id != patient.provider_id:
        return {"Error": "Unauthorized"}, 401

    form = PatientNotesForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        if data["text"]:
            edited_note.text = data["text"]

        if data["title"]:
            edited_note.title = data["title"]

        db.session.commit()
        return {"note": edited_note.to_dict()}

    if form.errors:
        return {"errors": form.errors}, 400
