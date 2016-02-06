var mongoose = require('mongoose');
var Harvest = mongoose.model('Harvest');

exports.startHarvest = function(req, res) {
	var harvest = new Harvest();
	harvest.set('startDate', new Date());
	harvest.set('user', req.query.userId);
	harvest.set('crop', req.query.cropId);
	harvest.set('active', true);
	harvest.save(function(err) {
		if (err) {
			res.status(500).send();
			return;
		}
		console.log(harvest);
		req.user.harvests.push(harvest._id);
		req.user.save();
		res.status(200).send(harvest);
	});
};
exports.endHarvest = function(req, res) {
	Harvest.findById(req.query.harvestId, function(err, harvest) {
		if (err) {
			res.status(500).send();
			return;
		}
		harvest.set('endDate', new Date());
		harvest.set('active', false);
		harvest.save(function(err) {
			if (err) {
				res.status(500).send();
				return;
			}
			res.status(200).send();
		});
	});
};
exports.verifyHarvest = function(req, res, callback) {
	Harvest.findById(req.query.harvestId, function(err, harvest) {
		if (err) {
			res.status(500).send();
			callback(null);
			return;
		}
		console.log("harvest verified");
		callback(harvest);
	});
};