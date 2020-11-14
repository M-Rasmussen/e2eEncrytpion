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
    email = db.Column(db.String(120))

    def __init__(self, userid, name, email):
        self.userid = userid
        self.name = name
        self.email = email

    def __repr__(self):
        return "<User name: {}\ntype: {}".format(self.name, self.email)

class Rooms(db.Model):
    """
    Defines ListOfRooms table.
    """

    roomid = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.String(120))
    roomName = db.Column(db.String(120))

    def __init__(self, userid, roomName):
        self.userid = userid
        self.roomName=roomName
    def __repr__(self):
        return "< roomid: {}\nuserid: {}\nroomName: {}".format(self.roomid, self.userid, self.roomName)

class Chat(db.Model):
    roomid = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.String(120))
    roomName = db.Column(db.String(120))