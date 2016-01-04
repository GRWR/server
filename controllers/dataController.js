var fs = require('fs');

function formatData(dataArray) {
	var data = "";
	for (var i = 0; i < dataArray.length; i++) {
		var element = dataArray[i];
		console.log(element);
		data = data + element;
		if (i < dataArray.length - 1) data = data + ",";
	}
	data += "\n";
	return data;
}
exports.addDataPoint = function(req, res) {
	var fileName = "./data/" + req.harvest.id + ".csv";
	fs.open(fileName, "a", function(err, fd) {
		if (err) {
			res.status(500).send();
			return;
		}
		fs.write(fd, formatData(req.body.data), function() {
			fs.close(fd, function() {
				res.status(200).send();
			});
		});
	});
};