var mongoose = require('mongoose');
var EnvironmentalData = mongoose.model('EnvironmentalData');

exports.addEnvironmentalDataPoint = function(harvestId, temp, humidity, uv, lux, co2) {
	console.log("adding data point!");
	var dataPoint = new EnvironmentalData();
	dataPoint.set('timestamp', new Date());
	dataPoint.set('harvest', harvestId);
	dataPoint.set('temperature', temp);
	dataPoint.set('humidity', humidity);
	dataPoint.set('uv', uv);
	dataPoint.set('lux', lux);
	dataPoint.set('co2', co2);
	dataPoint.save();
}
exports.getDataForHarvest = function(req, res) {
	EnvironmentalData.find({harvest: req.harvest.id}).sort('timestamp').exec(function(err, dataPoints) {
		if (err) {
			res.status(500).send();
			return;
		}
		var body = '';
		for (var i = 0; i < dataPoints.length; i++) {
			var dataPoint = dataPoints[i];
			body += dataPoint.timestamp.toString();
			body += ',';
			body += dataPoint.temperature.toString();
			body += ',';
			body += dataPoint.humidity.toString();
			body += ',';
			body += dataPoint.uv.toString();
			body += ',';
			body += dataPoint.lux.toString();
			body += ',';
			body += dataPoint.co2.toString();
			if (i < dataPoints.length - 1) body += '\n';
		}
		console.log(body);
		res.status(200).send(body);
	});
}