let  express = require('express');
let  router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

//callback from google
router.get('/google/redirect',passport.authenticate('google'), function(req, res){
    //res.send(req.user)
    req.session.username = req.user.username;
    res.redirect('/');
});

module.exports = router;