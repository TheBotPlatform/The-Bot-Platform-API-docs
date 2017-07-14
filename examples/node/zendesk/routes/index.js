
var express = require('express');
var router = express.Router();
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
  username:  'username',
  token:     'token',
  remoteUri: 'https://remote.zendesk.com/api/v2',

});

var searchZendesk = function(str, cb) {
	client.search.query(str, function (err, req, results) {
	  if (err) {
	    cb([]);
	    return;
	  }
	  cb(results);
	});
}

var formatZendesk = function(searchString, callback) {
	searchZendesk(searchString, function(results) {
		var cards = [];
		var maxCards = 10;
		results.forEach(function(result, i) {
			if (i >= maxCards ) {
				return;
			}
			// https://developers.facebook.com/docs/messenger-platform/send-api-reference/generic-template
			cards.push({
				title: result.subject.substring(0,80), // 80 characters
				subtitle: result.type.substring(0,80), // 80
        buttons: [{
        	"title": "View " + result.type.substring(0,20),
          "type": "postback",
          "payload": "BP:ZENDESK:TICKET:" + result.id,
        }]
			})
		});
		if (cards.length) {

			var message = {
				"attachment":{
			    "type":"template",
			    "payload":{
			      "template_type":"generic",
			      "elements":cards,

			    }
			  }
		  };
		} else {
			var message = {
				"text": "Sorry, no ticket found on Zendesk with \"" + searchString + "\""
			};
		}

	  callback(message);
	});
}


router.post('/', function(req, res, next) {
	// make sure that there is actually an item here
	var respond = function(message) {
		var resp = {
		  recipient: {
		    id: req.body.fbuser.fbid
		  },
		  message: message
		};
		res.send(resp);
	}
	if (req.body && req.body.item) {
		if (req.body.item.postback) {
			if (req.body.item.postback.payload.indexOf('BP:ZENDESK:TICKET:') > -1) {
				// zendesk
				client.tickets.show(req.body.item.postback.payload.replace('BP:ZENDESK:TICKET:', '') * 1,function(err, res, item){
					respond({text:item.description.substring(0,200)});
				});
			}
			return;
		}
		var inboundMessage = req.body.item.message.text;
		formatZendesk(inboundMessage, respond);

	} else {
		// this is probably just the check The Bot Platform does on the URL
		res.send({});
	}
});

router.get('/', function(req, res, next) {
	var inboundMessage = 'meet';

	formatZendesk(inboundMessage, function(message) {
		res.send({
		  recipient: {
		    id: 1
		  },
		  message: message
		});
	});
})

module.exports = router;

