from app.models import Patient, Address, Note, Status,db
from flask_login import current_user, login_required
from flask import Blueprint, request

filter_routes = Blueprint("filter", __name__)






# @filter_routes.route("/")
# @login_required
# def get_filtered_patients():
#     '''
#     Frontend will send an Object Eg:
#     { {"state":"CA"} } or {"status":"active"}

#     Then backend will get that key and then 

#     '''
#     return None



