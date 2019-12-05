let  express = require('express');
let  router = express.Router();
let  events = require('../models/event');
let  acc_dec = require('../models/acc_dec');
let  answers = require('../models/answer');
let  session = require('express-session');

router.get('/', ensureAuthenticated, function(req, res){
	let  allEvents = {};
	let  answered_user = [];
	let  event = req.query.event;
	let  status = req.query.status;
	console.log("event====="+event);
	console.log("status====="+status);

	answers.getanswer(function(err, allAnswer){
		if(err) throw err;
		console.log("allAnswer"+allAnswer);
		for(let  i in allAnswer){
			answered_user.push(allAnswer[i].employeeid); 
		}
	console.log("answered_user--------"+answered_user);
	req.session.testAnsPeople = answered_user;
	events.getAllEvents(function(err, allEvent){
		if(err) throw err;
		allEvents = allEvent;
		let  status="";
		for(let  z in allEvents)
		{
			status=allEvents[z].createrName;
		}
		console.log(status);
		req.session.status=status;
		let  answered_user =[];
                answers.getanswer(function(err5, allAnswer){
                        if(err5) throw err5;
                        console.log("allAnswer"+allAnswer);
                        for(let  i in allAnswer){
                                answered_user.push(allAnswer[i].employeeid); 
                        }
                console.log("answered_user--------"+answered_user);
                req.session.testAnsPeople = answered_user;
                res.locals.testAnsPeoples = req.session.testAnsPeople || null;
		res.render('index', {users : allEvents});
	});
});
});
});

function ensureAuthenticated(req, res, next){
	if(req.session.username ){
		return next();
	} else{
		req.flash('error_msg', 'You are not logged in');
		res.redirect('/users/login');
	} 
}
module.exports = router;