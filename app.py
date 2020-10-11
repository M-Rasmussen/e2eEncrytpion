import os
import flask
import flask_socketio
from os.path import join, dirname
from dotenv import load_dotenv
import flask_sqlalchemy
import models
import requests
import random
import json

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

# FOR JOKE
def getJoke():
    urledz = "https://joke3.p.rapidapi.com/v1/joke"
    headerzed = {
        'x-rapidapi-host': rapidapihost,
        'x-rapidapi-key': rapidapikey
    }
    responsezed = requests.request("GET", urledz, headers=headerzed)
    jokereturn=responsezed.json()
    funJoke=(json.dumps(jokereturn["content"],indent=2))
    print(funJoke)
    return funJoke
    

def funtranslate(message):
    funurl = "http://api.funtranslations.com/translate/valyrian?text="
    funurl +=message
    funpayload = {}
    funheaders= {}
    funresponse = requests.request("GET", funurl, headers=funheaders, data = funpayload)
    funreturn=funresponse.json()
    funPirate=(json.dumps(funreturn["contents"]["translated"],indent=2))
    
    return(funPirate)


# FOR COIN FLIP
def flipcoins():
    ht=random.randrange(1)
    if (ht==1):
        return "heads"
    else:
        return "tails"
    
    
    
    
def botStuff(botInput):
    rtnMessage=""
    if(botInput[:8]=="!! about" or botInput[:7]=="!!about"):
        rtnMessage= "I tell jokes, flip coins, and translate your language into high valyrian. just put !! infront of the commands and I will return as you please. For more information enter !!help"
    elif(botInput[:7]=="!! help" or botInput[:6]=="!!help"):
        rtnMessage=" !! about and I will tell you about me. !! funtranslate (words), will translate anything after that into high valyrian. !! joke and I will tell you a joke. !! coin flip will result me in flipping a coin and I will tell you the results. "
    elif(botInput[:15]=="!! funtranslate" or botInput[:14]=="!!funtranslate"):
        rtnMessage=funtranslate(botInput[15:])
        print("!! (message)")
    elif(botInput[:7]=="!! joke" or botInput[:6]=="!!joke"):
        rtnMessage=getJoke()
    elif(botInput[:12]=="!! coin flip" or botInput[:11]=="!!coin flip"):
        rtnMessage=flipcoins()
    else:
        rtnMessage="I did not understand you please enter !! help for all of the inputs I respond to"
    db.session.add(models.Chat('bot',rtnMessage));
    db.session.commit();
    emit_all_messages(MESSAGE_RECEIVED_CHANNEL)    


def emit_all_messages(channel):
    all_messages = [ \
        db_message.message for db_message \
        in db.session.query(models.Chat).all()]
    all_names =[\
        db_name.name for db_name in db.session.query(models.Chat).all() ] 
    
    # print(all_names)   
    # print(all_messages)
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
