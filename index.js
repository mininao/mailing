var csv = require('csv');
var config = require('./settings');
var mailgun = require('mailgun-js')({apiKey: config.mailgun_api_key, domain: config.mailgun_domain});