var express = require('express');
var userController = require('./controllers/userController.js');
var cropController = require('./controllers/cropController.js');
var harvestController = require('./controllers/harvestController.js');
var environmentalDataController = require('./controllers/dataController.js');

module.exports = function(app) {

	app.get('/', function(req, res) {
		console.log('got it!');
		res.send('hello world!');
	})
	// User routes
	//
	// Method to create a user the first time the device is used.
	// Returned values must be sent with every subsequent REST calls
	// Parameters:
	// - email: String
	// - password: String
	// - firstName: String
	// - lastName: String
	// Return values:
	// - userId: String
	// - hashedPassword: String
	app.post('/createUser', userController.createUser);
	// Crop routes
	//
	// Method to get all crops
	// Return values:
	// - crops: array
	app.get('/getAllCrops', cropController.getAllCrops);
	// Method to create a new crop. Returns an ID to reference the crop in subsequent REST calls
	// Parameters:
	// - name: String
	// - subName: String
	// - strain: String 
	// Return values:
	// - crop: Crop
	app.post('/newCrop', cropController.newCrop);
	// Harvest routes
	// 
	// Method to begin a harvest. Returns an ID to reference the harvest in subsequent REST calls
	// Parameters:
	// - userId: String
	// - cropId: String
	// Return values:
	// - harvest: Harvest
	app.post('/startHarvest', _startHarvest);
	// Method to end a harvest
	// Parameters:
	// - harvest: Harvest
	app.post('/endHarvest', _endHarvest);
	// Data routes
	//
	// Method to add a data point to a harvest
	// Parameters:
	// - timestamp: Date
	// - temperature: Number
	// - humidity: Number
	// - uv: Number
	// - lux: Number
	// - co2: Number
	app.post('/addEnvironmentalDataPoint', _addEnvironmentalDataPoint);
	//Method to get all environmental data points for a particular harvest
	app.get('/getDataForHarvest', _getDataForHarvest);
};

var _startHarvest = function(req, res) {
	userController.verifyUser(req, res, function(user) {
		if (user) {
			
			req.user = user;
			cropController.verifyCrop(req, res, function(crop) {
				if (crop) {
					req.crop = crop;
					harvestController.startHarvest(req, res);
				}
			});
		}
	});
};
var _endHarvest = function(req, res) {
	userController.verifyUser(req, res, function(user) {
		if (user) {
			harvestController.endHarvest(req, res);
		}
	});
};
var _addEnvironmentalDataPoint = function(req, res) {
	userController.verifyUser(req, res, function(user) {
		if (user) {
			cropController.verifyCrop(req, res, function(crop) {
				if (crop) {
					req.crop = crop;
					harvestController.verifyHarvest(req, res, function(harvest) {
						if (harvest) {
							req.harvest = harvest;
							environmentalDataController.addEnvironmentalDataPoint(req, res);
						}
					});
				}
			});
		}
	});
};
var _getDataForHarvest = function(req, res) {
	userController.verifyUser(req, res, function(user) {
		if (user) {
			harvestController.verifyHarvest(req, res, function(harvest) {
				if (harvest) {
					req.harvest = harvest;
					environmentalDataController.getDataForHarvest(req, res);
				}
			});
		}
	});
};