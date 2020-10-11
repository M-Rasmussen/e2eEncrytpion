# models.py
import flask_sqlalchemy
from app import db


class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255))
    def __init__(self, b):
        self.message = b
        
    def __repr__(self):
        return '<Chat message: %s>' % self.message

