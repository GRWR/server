var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CropScema = new Schema({
	name: String,
	subName: String,
	strain: String,
	harvests: [Schema.Types.ObjectId]
});
var Crop = mongoose.model("Crop", CropScema);