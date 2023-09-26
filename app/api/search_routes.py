from app.models import Patient, Address, Note,Status,db
from flask import Blueprint, request

search_routes = Blueprint("search", __name__)


@search_routes.route("/")
def search_patients():
    """
    Searches through all of the patients based on query parameters from the search bar.
    Should return a JSON obj for the fronted to catch
    """
    search_query = request.args.get("query")
    patient_query = (
        db.session.query(Patient)
        .join(Address)
        .join(Note)
        .join(Status)
        .filter(
            (Patient.first_name.ilike(f"%{search_query}%"))
            | (Patient.middle_name.ilike(f"%{search_query}%"))
            | (Patient.last_name.ilike(f"%{search_query}%"))
            | (Address.address.ilike(f"%{search_query}%"))
            | (Address.city.ilike(f"%{search_query}%"))
            | (Address.state.ilike(f"%{search_query}%"))
            | (Note.text.ilike(f"%{search_query}%"))
            | (Note.title.ilike(f"%{search_query}%"))
            | (Status.status_type.ilike(f"%{search_query}%"))

        )
    )
    print("query response from search route: ", patient_query.all())
    response = [patient.to_dict() for patient in patient_query]
    return {"patients": response}
