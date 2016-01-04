var AWS = require('aws-sdk');
var bucketName = "grwr";
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.credentials = credentials;
var bucket = new AWS.S3({params: {Bucket: bucketName}});

exports.getFile = function(type, strain) {
	var fileTitle = type + "_" + strain + ".csv";
}