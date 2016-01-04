var mongoose = require('mongoose');
var Harvest = mongoose.model('Harvest');

exports.startHarvest = function(req, res) {
	var harvest = new Harvest();
	harvest.set('startDate', new Date());
	harvest.set('user', req.body.userId);
	harvest.set('crop', req.body.cropId);
	harvest.set('active', true);
	harvest.save(function(err) {
		if (err) {
			res.status(500).send();
			return;
		}
		req.harvest = harvest;
		req.user.harvests.push(harvest.id);
		req.crop.harvests.push(harvest.id);
		res.status(500).send({
			harvestId: harvest.id
		});
	});
};
exports.endHarvest = function(req, res) {
	Harvest.findById(req.body.harvestId, function(err, harvest) {
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
	Harvest.findById(req.body.harvestId, function(err, harvest) {
		if (err) {
			res.status(500).send();
			callback(null);
			return;
		}
		callback(harvest);
	});
};