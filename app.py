import os
import flask
import flask_socketio
from os.path import join, dirname
from dotenv import load_dotenv
import flask_sqlalchemy
import models
import requests


MESSAGE_RECEIVED_CHANNEL = 'message received'
USER_UPDATE_CHANNEL='user updated'

app = flask.Flask(__name__)

socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), 'project2.env')
load_dotenv(dotenv_path)

database_uri = os.environ['DATABASE_URL']
rapidapihost = os.environ['RAPID_URL_HOST']
rapidapikey= os.environ['RAPID_URL_KEY']

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app


   




db.create_all()
db.session.commit()

userCount=0


def getJoke():
    urledz = "https://joke3.p.rapidapi.com/v1/joke"

    headerzed = {
        'x-rapidapi-host': rapidapihost,
        'x-rapidapi-key': rapidapikey
    }

    responsezed = requests.request("GET", urledz, headers=headerzed)

    print(responsezed.text)
def botStuff(botInput):
    if(botInput[:8]=="!! about" or botInput[:7]=="!!about"):
        print("about")
    elif(botInput[:7]=="!! help" or botInput[:6]=="!!help"):
        print("!! help")
    elif(botInput[:15]=="!! funtranslate" or botInput[:14]=="!!funtranslate"):
        print("!! (message)")
    elif(botInput[:7]=="!! joke" or botInput[:6]=="!!joke"):
        print("!! (message)")
        getJoke()
    elif(botInput[:12]=="!! coin flip" or botInput[:11]=="!!coin flip"):
        print("!! (message)")
    else:
        print("enter better shit")


def emit_all_messages(channel):
    all_messages = [ \
        db_message.message for db_message \
        in db.session.query(models.Chat).all()]
    all_names =[\
        db_name.name for db_name in db.session.query(models.Chat).all() ] 
    
    print(all_names)   
    print(all_messages)
    arrayList=[]
    for x in range(len(all_messages)):
        messageOp=all_names[x]
        messageOp+= ": "
        messageOp+=all_messages[x]
        arrayList.append(messageOp)
        
    socketio.emit(channel, {
        'allMessages': arrayList
    })

def emit_num_users(channel):
    socketio.emit(channel, {
        'number': userCount
    })

@socketio.on('connect')
def on_connect():
    print('Someone connected!')
    socketio.emit('connected', {
        'test': 'Connected'
    })
    global userCount
    userCount+=1
    emit_all_messages(MESSAGE_RECEIVED_CHANNEL)
    emit_num_users(USER_UPDATE_CHANNEL)
@socketio.on('disconnect')
def on_disconnect():
    print ('Someone disconnected!')
    global userCount
    userCount-=1
    emit_num_users(USER_UPDATE_CHANNEL)
@socketio.on('new message')
def on_new_number(data):
    print("Got an event for new number with data:", data)
    new_message = data['message']['message']
    userName= data['userName']['userName']
    print(new_message)
    print(userName)
    db.session.add(models.Chat(data['userName']['userName'],data['message']['message']));
    db.session.commit();
    emit_all_messages(MESSAGE_RECEIVED_CHANNEL)
    if(new_message[:2]=="!!"):
        botStuff(new_message)
        
    
    
    # socketio.emit('message received', {
    #     'sentUser': userName,
    #     'sentMessage': new_message
    # })

@app.route('/')
def index():
    emit_all_messages(MESSAGE_RECEIVED_CHANNEL)
    
    return flask.render_template('index.html')


if __name__ == '__main__': 
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
