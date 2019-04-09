var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	employeeid:{
		type:String,
	
	},
	password:{
		type:String
	},
	password2:{
		type:String
	},
	username:{
		type:String
	},
	email:{
		type:String
	},
	phonenumber:{
		type:String
	},
	domain:{
		type:String
	}
});


var user = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
		bcrypt.genSalt(10,function(err, salt){
			bcrypt.hash(newUser.password, salt, function(err,hash){
					newUser.password = hash;
					newUser.save(callback);
			});
		});	
};

//passport
// module.exports.getUserByEmployeeid =  function(employeeid, callback){
// 	var query = {employeeid : employeeid};
// 	User.findOne(query,callback);
// }

module.exports.getUserByEmployeeId =  function(newUser , callback){
	var employeeid = newUser.employeeid;
	console.log(employeeid);
	var query = {employeeid : employeeid};
	user.findOne(query,callback);
};

module.exports.getUserById = function(newUser, callback){
	var query = {_id : newUser.id}
	user.findOne(query, callback);
}

//passport
// module.exports.comparePassword = function(candidatePassword,hash, callback){
// 	bcrypt.compare(candidatePassword, hash, function(err,isMatch) {
// 		if(err) throw err;
// 		callback(null, isMatch);
// 	});

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err,isMatch) {
		if(err) throw err;
		console.log('matching111'+isMatch);
		callback(null, isMatch);
	});

};

module.exports.findOrCreate = function(profileObj, callback){
	if(profileObj){
		profileObj.save(callback);
		console.log("profileId object saved");
	} else{
		console.log("Missing profileId object");
	}
}