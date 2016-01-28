var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');

function hashPW(pwd) {
	return crypto.createHash('sha256').update(pwd, 'utf8').digest('hex').toString();
}
exports.createUser = function(req, res) {
	console.log(req.body);
	var user = new User();
	user.set('email', req.body.email);
	var hashedPassword = hashPW(req.body.password);
	user.set('hashedPassword', hashedPassword);
	user.set('firstName', req.body.firstName);
	user.set('lastName', req.body.lastName);
	user.save(function(err) {
		if (err) {
			res.status(500).send();
			return;
		}
		res.status(200).send({
			userId: user.id,
			hashedPassword: hashedPassword 
		});
	});	
};
exports.verifyUser = function(req, res, callback) {
	console.log(req.body.userId);
	User.findById(req.body.userId, function(err, user) {
		console.log(err);
		console.log(user);
		if (err) {
			res.status(500).send();
			callback(null);
			return;
		}
		if (user.hashedPassword == req.body.hashedPassword) {
			console.log("user verified");
			callback(user);
			return;
		}
		res.status(400).send();
		callback(null);
	});
};
