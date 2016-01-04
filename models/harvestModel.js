var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HarvestSchema = new Schema({
	startDate: Date,
	endDate: Date,
	active: Boolean,
	crop: Schema.Types.ObjectId,
	data: String,
	metaData: [String],
	user: Schema.Types.ObjectId
});
var Harvest = mongoose.model("Harvest", HarvestSchema);