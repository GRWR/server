var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HarvestSchema = new Schema({
	startDate: Date,
	endDate: Date,
	active: Boolean,
	crop: Schema.Types.ObjectId,
	user: Schema.Types.ObjectId,
	location: Array
});
var Harvest = mongoose.model("Harvest", HarvestSchema);