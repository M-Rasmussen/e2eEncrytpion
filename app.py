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

MESSAGE_RECEIVED_CHANNEL = 'message received'
USER_UPDATE_CHANNEL='user updated'

logging.getLogger("werkzeug").setLevel(logging.ERROR)

app = flask.Flask(__name__)

socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), 'project2.env')
load_dotenv(dotenv_path)

database_uri = os.environ['DATABASE_URL']


app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app

arrayList=[]
def push_new_user_to_db(ident, name, email):
    """
    Pushes new user to database.
    """
    db.session.add(models.AuthUser(ident, name, email))
    db.session.commit()

def add_room_for_user(userid, roomName):
    """
    adds an event, returns the roomid of the new room
    """
    addedRoom = models.Rooms(userid, roomName)
    db.session.add(addedRoom)
    db.session.commit()
    return addedRoom.userid

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

@socketio.on('leave')
def on_leave(data):
    username = data['name']
    room = data['room']
    leave_room(room)
    socketio.send(username + ' has left the room.', room=room)



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
            push_new_user_to_db(userid, data["name"], data["email"])
            add_room_for_user(userid,1)
        all_rooms = [
            record.roomid
            for record in db.session.query(models.Rooms)
            .filter_by(userid=userid)
            .all()
        ]
        socketio.emit(
            "Verified", {"name": data["name"], "roomid": all_rooms}, room=sid
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
    print(data)
    arrayList.append(data)
    return_Message('message received')



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

# def emit_all_messages(channel):
#     all_messages = [ \
#         db_message.message for db_message \
#         in db.session.query(models.Chat).all()]
#     all_names =[\
#         db_name.name for db_name in db.session.query(models.Chat).all() ] 
    
#     arrayList=[]
#     for x in range(len(all_messages)):
#         messageOp=all_names[x]
#         messageOp+= ": "
#         messageOp+=all_messages[x]
#         arrayList.append(messageOp)
#     socketio.emit(channel, {
#         'allMessages': arrayList
#     })
    
# @socketio.on('new message')
# def on_new_number(data):
#     print("Got an event for new number with data:", data)
#     roomid=request.sid
#     new_message = data['message']['message']
#     if not any(d['userid']==request.sid for d in users):
#             errorz="There was an error please make sure you are logged in."
#             print('inside senderror')
#             socketio.emit('messageError', { 
#             'errormessage': errorz
#             },room=roomid)
#     else:
#         urlCheck=urlparse.urlParse(new_message)
#         new_message=urlCheck.checkURL()
#         res = next((sub for sub in users if sub['userid'] == request.sid), None)
#         db.session.add(models.Chat(res.get("name"),new_message));
#         db.session.commit();
#     emit_all_messages(MESSAGE_RECEIVED_CHANNEL)
#     #code to see if the message was a bot, if was figure out response and send it back
#     if(new_message[:2]=="!!"):
#         bCR=botbuild.chatBot(new_message)
#         db.session.add(models.Chat('bot',bCR.botStuff()));
#         db.session.commit();
#         emit_all_messages(MESSAGE_RECEIVED_CHANNEL)    
