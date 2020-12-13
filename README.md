App can be found at https://calm-reef-22903.herokuapp.com/

cd ~/environment && git clone https://github.com/NJIT-CS490/project2-m1-mtr26

1 Set up react and flask

a) pip install flask
b) nvm install 7 
c) npm install  
d) pip install flask-socketio
e) pip install eventlet
f) npm install -g webpack
g) npm install --save-dev webpack
h) npm install socket.io-client --save
i) npm install --save-dev style-loader 
j) npm install --save-dev css-loader 
	if any error messages, then use sudo pip or sudo npm. 

2 Get PSQL to work with python 

a) update yum: sudo yum update
b) upgrade pip: sudo /usr/local/bin/pip install --upgrade pip
c) get psycopg2: sudo /usr/local/bin/pip install psycopg2-binary
d) get SQLAlchemy: sudo /usr/local/bin/pip install Flask-SQLAlchemy==2.1

3) Setting up PSQL

a) install PostGreSQL:sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs
b) initialize PSQL database: sudo service postgresql initdb 
c) Start PSQL: sudo service postgresql start
d) Make a new superuser: sudo -u postgres createuser --superuser $USER
e) Make a new database: sudo -u postgres createdb $USER
f) make sure the user was created errors in the above 2 commands are ok and expected. 
 	i)psql
	ii) \du look for ec2-user as a user
	iii) \l look for ec2-user as a database
g)Make a new user: create user [username] superuser password '[password]'; 
h) \q is to quit
replace username with your username and password pick one. 

i)Then create a sql file with: DATABASE_URL='postgresql://[username]:[password]@localhost/postgres'
	
4) Read/write SQLAlchemy
a)sudo vim /var/lib/pgsql9/data/pg_hba.conf
b) :%s/ident/md5/g ( replace all the ident terms with md5)
c) sudo service postgresql restart

5) RUN APP
a) To run your app enter: npm run watch
b) In a new terminal enter: python app.py
	When you preview the running app then the app will be running.


Set up OAuth fro google. 
1. Install React Component
	a)Run: npm install react-google-login

2. Create Google account and information needed
	a) Go to https://console.developers.google.com/ and create account. 
	b) Create project using the dashboard and name the project. (You do not need to define an organization.)
 	c) Click Credentials and then click "Create Credentials" and then click "OAuth client ID.
		i) If Error or warning stating "To create an OAuth client ID, you must first set a product name on the consent screen"
		ii) Click "CONFIGURE CONSENT SCREEN"
		iii) Choose External
		iv) For "Application name" enter something smiliear to your project name, but not the same.
		v)Press Save
	d)Click Credentials and then click "Create Credentials" and then click "OAuth client ID" then click "web application"
	e) Go to Credentials screen and under OAuth 2.0 Client IDs, be sure to enter the URI's of your 	application. 

