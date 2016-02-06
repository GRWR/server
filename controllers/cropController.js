var mongoose = require('mongoose');
var Crop = mongoose.model('Crop');

exports.newCrop = function(req, res) {
	var crop = new Crop();
	crop.set('name', req.query.name);
	crop.set('subName', req.query.subName);
	crop.set('strain', req.query.strain);
	crop.save(function(err) {
		if (err) {
			res.status(500).send();
			return;
		}
		res.status(200).send(crop);
	});
};
exports.getAllCrops = function(req, res) {
	Crop.find({}, function(err, crops) {
		if (err) {
			res.status(500).send();
			return;
		}
		res.status(200).send(crops);
	});
};
exports.verifyCrop = function(req, res, callback) {
	console.log("cropId: " + req.query.cropId);
	Crop.findById(req.query.cropId, function(err, crop) {
		if (err) {
			res.status(500).send();
			callback(null);
			return;
		}
		console.log("crop verified");
		callback(crop);
	});
};
