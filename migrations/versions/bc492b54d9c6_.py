"""empty message

Revision ID: bc492b54d9c6
Revises: 228c1a88ca23
Create Date: 2023-09-22 11:52:34.291357

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bc492b54d9c6'
down_revision = '228c1a88ca23'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('notes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.String(length=50), server_default='Note', nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('notes', schema=None) as batch_op:
        batch_op.drop_column('title')

    # ### end Alembic commands ###