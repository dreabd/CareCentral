from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField,DateField,BooleanField
from wtforms.validators import DataRequired, Email, ValidationError

class EditPatientForm(FlaskForm):
  first_name = StringField("first_name" ,validators=[DataRequired()])
  middle_name = StringField("middle_name" ,validators=[])
  last_name = StringField("last_name", validators=[DataRequired()])
  provider_id = IntegerField("provider_id" ,validators=[DataRequired()])
  status_id = IntegerField("status_id" ,validators=[DataRequired()])
  date_of_birth = DateField("date_of_birth" ,validators=[DataRequired()])

class PatinentAddressForm(FlaskForm):
  address = StringField("address", validators=[DataRequired()])
  city = StringField("address", validators=[DataRequired()])
  state = StringField("address", validators=[DataRequired()])
  isCurrent = BooleanField("isCurrent", validators=[DataRequired()], default=True)

class PatientNotesForm(FlaskForm):
  text = StringField("text",validators=[DataRequired()])