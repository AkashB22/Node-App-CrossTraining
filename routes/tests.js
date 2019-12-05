let  express = require('express');
let  router = express.Router();
let  session = require('express-session');
let  tests = require('../models/test');
let  Event = require('../models/event');
router.get('/createTest', ensureAuthenticated, function(req, res){
	res.render('createtest');
});

router.post('/testQuestions',function(req,res)
{   
    let  full = req.body;
    let  next = '';
    let  submit = '';
    let  questions=req.body.question;
    let  options=[];
    let  optiona=req.body.optiona;
    let  optionb=req.body.optionb;
    let  optionc=req.body.optionc;
    let  optiond=req.body.optiond;
    options.push(optiona,optionb,optionc,optiond);
    let  answer=req.body.correctanswer;
    next = req.body.next;
    submit = req.body.submit;
    
    console.log(full);



let  newtest=new tests({
    questions:questions,
    options:options,
    answer:answer

});
if(submit == 'submit'){
    tests.storeAdminQuestions(newtest,function(req,res)
    {
    
        console.log("submitted");
        
    });
    res.redirect('/events/allEvent');
}
else if(next == 'next')
{
    tests.storeAdminQuestions(newtest,function(req,res)
    {
       
        console.log("next question");
        
    }); 
    
    res.render('createtest');
}
});

router.get('/displayTest', ensureAuthenticated, function(req, res){
    tests.getAdminQuestions(function(req, testquestions){
        console.log(testquestions);
        res.render('displayTest', { tests : testquestions});
    });
});
router.get('/displaystatus', ensureAuthenticated, function(req, rest){
    Event.status(function(req, stats){
        //console.log(testquestions);
        rest.render('displaystatus', { status : stats});
    });
});
function ensureAuthenticated(req, res, next){
	if(req.session.username){
		return next();
	} else{
		req.flash('error_msg', 'You are not logged in');
		res.redirect('/users/login');
	} 
}

module.exports =router;



