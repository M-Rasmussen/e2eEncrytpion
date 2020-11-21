# models.py
import flask_sqlalchemy
from app import db

class AuthUser(db.Model):
    """
    Defines AuthHistory table.
    """

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.String(120))
    name = db.Column(db.String(120))

    def __init__(self, userid, name):
        self.userid = userid
        self.name = name

    def __repr__(self):
        return "<User name: {}".format(self.name)

class Chat(db.Model):
    """
    defines Wehre all chats are in
    """
    messageID = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String)
    room = db.Column(db.String)

    def __init__(self, message, room):
        self.message=message
        self.room=room
        
    def __repr__(self):
        return "<{}".format(self.message)