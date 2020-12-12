import os
import logging
import flask
import flask_socketio
from os.path import join, dirname
from dotenv import load_dotenv
import flask_sqlalchemy
import models
from google.oauth2 import id_token
from google.auth.transport import requests
from flask_socketio import join_room, leave_room
import datetime




MESSAGE_RECEIVED_CHANNEL = 'message received'
USER_UPDATE_CHANNEL='user updated'

logging.getLogger("werkzeug").setLevel(logging.ERROR)

app = flask.Flask(__name__)

socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), 'project2.env')
load_dotenv(dotenv_path)

database_uri = os.environ['DATABASE_URL']
p_key = os.environ['PRIVATE_KEY']



app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app

arrayList=[]
FAKEDB={}





def push_new_user_to_db(ident, name):
    """
    Pushes new user to database.
    """
    db.session.add(models.AuthUser(ident, name))
    db.session.commit()

# def add_room_for_user(userid, roomName):
#     """
#     adds an event, returns the roomid of the new room
#     """
#     addedRoom = models.Rooms(userid, roomName)
#     db.session.add(addedRoom)
#     db.session.commit()
#     return addedRoom.userid


def add_message_with_room_id(roomName, message):
    db.session.add(models.Chat(message, roomName))
    db.session.commit()
    if roomName in FAKEDB:
        FAKEDB[roomName].append(message)
    else:
        FAKEDB[roomName] = [message]

def check_if_room_exists(room):
    send_message_history(room)

    if room in FAKEDB:
        send_message_history(room)


def send_message_history(room):
    arrayList=[ \
        db_message.message for db_message \
        in db.session.query(models.Chat).filter_by(room=room).all()]
        # db.session.query(models.AuthUser.userid).filter_by(userid=userid).all()

    
    
    
    # arrayList=FAKEDB.get(room)
    socketio.emit('message received',{
        'allMessages': arrayList
    },room=room)
    
    
def return_Message(channel):
    socketio.emit(channel,{
        'allMessages': arrayList
    })

def get_sid():
    '''
    returns sid
    '''
    sid = flask.request.sid
    return sid
    
##SOCKET EVENTS
@socketio.on("connect")
def on_connect():
    """
    Runs on connect.
    """
    print("Someone connected!")


@socketio.on("disconnect")
def on_disconnect():
    """
    Runs on disconnect.
    """
    print("Someone disconnected!")


@socketio.on('join')
def on_join(data):
    username = data['name']
    room = data['room']
    join_room(room)
    print(room)
    print(username)
    socketio.emit("joinedRoom",{'name': username, 'room':room}, room=room)
    check_if_room_exists(room)
    
@socketio.on('leave')
def on_leave(data):
    username = data['name']
    room = data['room']
    leave_room(room)
    socketio.send(username + ' has left the room.', room=room)

@socketio.on('getk')
def on_get(data):
    sid=get_sid()
    socketio.emit(
        "key", {'key':p_key}, room=sid)



@socketio.on("new google user")
def on_new_google_user(data):
    """
    Runs verification on google token.
    """
    print("Beginning to authenticate data: ", data)
    sid = get_sid()
    try:
        idinfo = id_token.verify_oauth2_token(
            data["idtoken"],
            requests.Request(),
            "713754122186-g61h2i8np8ekhbtn7idqs3rlsi9t5jhn.apps.googleusercontent.com",
        )
        userid = idinfo["sub"]
        print("Verified user. Proceeding to check database.")
        exists = (
            db.session.query(models.AuthUser.userid).filter_by(userid=userid).scalar()
            is not None
        )
        if not exists:
            push_new_user_to_db(userid, data["name"])
        
        socketio.emit(
            "Verified", {"name": data["name"] }, room=sid
        )
        return userid
    except ValueError:
        # Invalid token
        print("Could not verify token.")
        return "Unverified."
    except KeyError:
        print("Malformed token.")
        return "Unverified."

@socketio.on("chat")
def on_new_message(data):
    print(data["message"])
    message=data["message"]
    print(data["roomid"])
    roomName=data["roomid"]
    add_message_with_room_id(roomName, message)
    send_message_history(roomName)

    # arrayList.append(data)
    # return_Message('message received')



@app.route('/')
def index():
    models.db.create_all()
    db.session.commit()
    return flask.render_template('index.html')


if __name__ == '__main__': 
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
