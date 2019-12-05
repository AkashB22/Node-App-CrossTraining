var express = require('express');
var cors = require('cors');
var path = require('path');
var fs = require('fs');
var http = require('http');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expHandlebars = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
// var localStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1/loginapp', () => {console.log('Connected to mongoDB local')});

mongoose.connect('mongodb+srv://akashbalu22:*********@cluster0-6l2ig.mongodb.net/crossTrainingPlatform?retryWrites=true&w=majority',() => {console.log('Connected to mongoDB online')});

var db = mongoose.connection;

var handlebarsHelpers = require('./helpers/handlebars');
var admin=require('./routes/admin');
var routes = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');
var tests = require('./routes/tests');
var answers = require('./routes/answers');
var testing = require('./routes/testing');
var auth = require('./routes/auth');
var stripe = require('./routes/stripe');
//var email = require('./routes/email');

var passportSetup = require('./passportService/passport-setup');
var cookieSession = require('cookie-session');

//https certificates
var key = fs.readFileSync('./httpsCertt/key.pem');
var csr = fs.readFileSync('./httpsCertt/cert.pem');

var credentials= {
	'key' : key,
	'cert' : csr
};

var app =express();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expHandlebars({'defaultLayout' : 'layout', helpers : handlebarsHelpers}));
app.set('view engine', 'handlebars');

//use cookieSession
app.use(cookieSession({
	maxAge : 24*60*60*1000,
	keys : ['ThisisAweSome'] 
}));

//passport initialization
app.use(passport.initialize());
app.use(passport.session());

//app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
	secret : 'secret',
	saveUninitialized : 'true',
	resave : 'true'
}));


app.use(expressValidator({
	errorFormatter : function(param, msg, value){
		var namespace = param.split('.'),
		 root = namespace.shift(),
		 formParam = root;

		while(namespace.length){
			formParam = '[' + namespace.shift() + ']';
		}
		return{
			param : formParam,
			msg : msg,
			value : value
		};

	}
}));

app.use(flash());
//global variable 
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.session.username || null;
	res.locals.admin = req.session.adminname || null;
	res.locals.testAnsPeoples = req.session.testAnsPeople || null;
	res.locals.status=req.session.status || null;
	next();
});

//Enabling cors
var allowedOrigins= ['http://localhost:4200', 'http://localhost:2019', 'http://localhost:3001'];

app.use(cors({
	origin: function(origin, callback){
		// allow requests with no origin 
		// (like mobile apps or curl requests)
		if(!origin) return callback(null, true);
		if(allowedOrigins.indexOf(origin) === -1){
		  var msg = 'The CORS policy for this site does not ' +
					'allow access from the specified Origin.';
		  return callback(new Error(msg), false);
		}
		return callback(null, true);
	  }
}));

//My Routes
app.use('/', routes);
app.use('/users', users);
app.use('/events', events);
app.use('/tests', tests);
app.use('/answers', answers);
app.use('/admin',admin);
app.use('/testing', testing);
app.use('/auth', auth);
app.use('/stripe', stripe);
//app.use('/email', email);

var server = http.createServer(app)

app.set('port', (process.env.PORT || 3001));

server.listen(app.get('port'), function(){
	console.log('Server started on port ' + app.get('port'));
});
