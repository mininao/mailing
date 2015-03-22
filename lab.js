var config = require('./settings');

var fs = require('fs');
var util = require('util');

var _ = require('lodash');
var csv = require('csv');
var mailgun = require('mailgun-js')({apiKey: config.mailgun_api_key, domain: config.mailgun_domain});
var Handlebars = require('handlebars');
var rawList = fs.readFileSync(config.list);
var csvConf = {columns:['cardId','firstName','lastName','contributor','email','pseudo','null','year']};


csv.parse(rawList, csvConf,function(err, list){
	list = _.map(list,function(user){
		return _.omit(user,"null");
	});
	console.log(list);
});


var data = {
  from: 'Zéphyr <zephyr@mail.baslesmasqu.es>',
  to: 'maxence.aici@edu.esiee.fr',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});

/*var list = mailgun.lists('eleves@mail.baslesmasqu.es ');

list.info(function (err, data) {
  // `data` is mailing list info
  console.log(data);
});

var bob = {
  subscribed: true,
  address: 'bob@gmail.com',
  name: 'Bob Bar',
  vars: {age: 26}
};

list.members().create(bob, function (err, data) {
  // `data` is the member details
  console.log(data);
});

list.members().list(function (err, members) {
  // `members` is the list of members
  console.log(members);
});*/