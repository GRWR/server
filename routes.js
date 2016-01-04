var express = require('express');
var userController = require('./controllers/userController.js');
var cropController = require('./controllers/cropController.js');
var harvestController = require('./controllers/harvestController');
var dataController = require('./controllers/dataController');

module.exports = function(app) {
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
	// Method to verify that a user exists and that the hashed password is correct
	// Parameters:
	// - userId: String
	// - hashedPassword: String
	app.post('/verifyUser', userController.verifyUser);
	// Crop routes
	//
	// Method to create a new crop. Returns an ID to reference the crop in subsequent REST calls
	// Parameters:
	// - name: String
	// - subName: String
	// - strain: String 
	app.post('/newCrop', cropController.newCrop);
	// Harvest routes
	app.post('/startHarvest', startHarvest);
	app.post('/endHarvest', harvestController.endHarvest);
	// Data routes
	app.post('/addDataPoint', addDataPoint);
};

var startHarvest = function(req, res) {
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
var addDataPoint = function(req, res) {
	userController.verifyUser(req, res, function(user) {
		if (user) {
			req.user = user;
			cropController.verifyCrop(req, res, function(crop) {
				if (crop) {
					req.crop = crop;
					harvestController.verifyHarvest(req, res, function(harvest) {
						if (harvest) {
							req.harvest = harvest;
							dataController.addDataPoint(req, res);
						}
					});
				}
			});
		}
	});
};