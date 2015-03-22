var config = require('./settings');

var fs = require('fs');

var _ = require('lodash');
var csv = require('csv');


var rawList = fs.readFileSync(config.user_input);
var csvConf = {columns:['cardId','firstName','lastName','contributor','email','pseudo','null','year']};


csv.parse(rawList, csvConf,function(err, list){
	list = _.map(list,function(user){
		return _.omit(user,"null");
	});
	console.log(list);
	fs.writeFile(config.user_output, JSON.stringify(list, null, '\t'));
});