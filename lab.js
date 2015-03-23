var config = require('./settings');

var fs = require('fs');
var util = require('util');

var _ = require('lodash');

var mailgun = require('mailgun-js')({apiKey: config.mailgun_api_key, domain: config.mailgun_domain});
var Handlebars = require('handlebars');

// Load template
var rawTemplate = fs.readFileSync('templates/lab.hbs',{encoding:"utf-8"});
console.log(rawTemplate)
// Load userlist
var list = require(config.sender_input)

//Compile Template
var template = Handlebars.compile(rawTemplate);

_.each(list,function(user){
	user.isE1 = user.year == 'E1';
	user.isE2 = user.year == 'E2';
	user.isE3 = user.year == 'E3';
	user.isE4 = user.year == 'E4';
	user.isE5 = user.year == 'E5';
	var text = template(user);
	
	var data = {
	  from: 'Zéphyr <zephyr@mail.baslesmasqu.es>',
	  to: user.email,
	  subject: 'Merci ' + user.firstName + ' !',
	  text: text
	};
	mailgun.messages().send(data, function (error, body) {
		console.log(user.email);
		console.log(body);
		
	});
	
});



/*
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
*/

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