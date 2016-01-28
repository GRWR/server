var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EnvironmentalDataSchema = new Schema({
	time: Date,
	harvest: Schema.Types.ObjectId,
	temperature: Number,
	humidity: Number,
	uv: Number,
	lux: Number,
	co2: Number
});
var EnvironmentalData = mongoose.model("EnvironmentalData", EnvironmentalDataSchema);