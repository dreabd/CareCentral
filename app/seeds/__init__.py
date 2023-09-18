from flask.cli import AppGroup
from .users import seed_users, undo_users
from .status import seed_status, undo_status
from .pateint import seed_patients,undo_patients
from .addresses import seed_addresses,undo_addresses
from .notes import seed_notes,undo_notes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_notes()
        undo_addresses()
        undo_status()
        undo_patients()
        undo_users()
    seed_users()
    seed_status()
    seed_patients()
    seed_addresses()
    seed_notes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_notes()
    undo_addresses()
    undo_status()
    undo_patients()
    undo_users()
    # Add other undo functions here