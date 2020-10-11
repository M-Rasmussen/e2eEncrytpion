import os
import flask
import flask_socketio
from os.path import join, dirname
from dotenv import load_dotenv
import flask_sqlalchemy
import models 

MESSAGE_RECEIVED_CHANNEL = 'message received'

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


db.create_all()
db.session.commit()

def emit_all_messages(channel):
    all_messages = [ \
        db_message.message for db_message \
        in db.session.query(models.Chat).all()]
        
    socketio.emit(channel, {
        'allMessages': all_messages
    })


@socketio.on('connect')
def on_connect():
    print('Someone connected!')
    socketio.emit('connected', {
        'test': 'Connected'
    })
    
    emit_all_messages(MESSAGE_RECEIVED_CHANNEL)

@socketio.on('disconnect')
def on_disconnect():
    print ('Someone disconnected!')

@socketio.on('new message')
def on_new_number(data):
    print("Got an event for new number with data:", data)
    new_message = data['message']['value']
    userName= 'abc'
    
    db.session.add(models.Chat(data['message']['value']));
    db.session.commit();
    
    emit_all_messages(MESSAGE_RECEIVED_CHANNEL)
    
    
    
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
