var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {type: String, unique: true},
	hashedPassword: String,
	harvests: [Schema.Types.ObjectId]
});
var User = mongoose.model("User", UserSchema);