var mongooseURL = 'mongodb://AndrewGold:qwedcxza@ds059524.mongolab.com:59524/heroku_rl38df2r'

var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
require('./models/userModel.js');
require('./models/harvestModel.js');
require('./models/cropModel.js');
var mongoStore = require('connect-mongo')({session: expressSession});
var conn = mongoose.connect(mongooseURL);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressSession({
	secret: 'SECRET',
	cookie: {maxAge: 60*60*10000},
	store: new mongoStore({
		url: mongooseURL,
		collection: 'Sessions'
	})
}));
app.set('port', (process.env.PORT || 3000));

require('./routes')(app);
var server = app.listen(app.get('port'), function() {
  console.log('App listening on port: %s', server.address().port);
});
