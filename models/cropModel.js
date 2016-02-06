var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CropScema = new Schema({
	name: String,
	subName: String,
	strain: String,
});
var Crop = mongoose.model("Crop", CropScema);