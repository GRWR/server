var mongoose = require('mongoose');
var Crop = mongoose.model('Crop');

exports.newCrop = function(req, res) {
	var crop = new Crop();
	crop.set('name', req.body.name);
	crop.set('subName', req.body.subName);
	crop.set('strain', req.body.strain);
	crop.save(function(err) {
		if (err) {
			res.status(500).send();
			return;
		}
		res.status(200).send({
			cropId: crop.id
		});
	});
};
exports.verifyCrop = function(req, res, callback) {
	console.log("cropId: " + req.body.cropId);
	Crop.findById(req.body.cropId, function(err, crop) {
		if (err) {
			res.status(500).send();
			callback(null);
			return;
		}
		console.log("crop verified");
		callback(crop);
	});
}