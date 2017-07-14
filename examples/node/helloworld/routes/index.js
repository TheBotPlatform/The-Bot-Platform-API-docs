var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	// make sure that there is actually an item here
	if (req.body && req.body.item) {
		res.send({
		  recipient: {
		    id: req.body.fbuser.fbid
		  },
		  message: {
		    text: "You said " + req.body.item.message.text
		  }
		});
	} else {
		// this is probably just the check The Bot Platform does on the URL
		res.send({});
	}
});

module.exports = router;
