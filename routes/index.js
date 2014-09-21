var express = require('express');
var router = express.Router();

var dbCollection = "swapcollection";
/* GET home page. */
router.get('/', function(req, res) {
	res.sendfile('./public/views/index.html'); // load our public/index.html file
	console.log("Router index page");
});

router.get('/swaps', function(req, res) {
	console.log("GET");
	var db = req.db;
	var Swaps = db.get(dbCollection);
	//console.log(dbCollection);
	var result = Swaps.find({}, {fields: {ImageURL: 1}}, function(err, swaps) {
		//console.log(swaps);
		if (err)
			res.send(err);
		res.json(swaps); //return all swaps in json format
	});
	//console.log(result);
	console.log("GET bottom");
});

router.get('/swaps/:swapid', function(req, res) {
	console.log("GETBYID");
	console.log("swapId");
	var db = req.db;
	var Swaps = db.get(dbCollection);
	//Get full object by ID
	Swaps.find({_id:req.params.swapid.toString()},{},function(err, swaps) {
		console.log(swaps+"    swaps");
		if (err)
			res.send(err);
		res.json(swaps); //return swap obj in json format
	});
	console.log("GETBYID bottom");
});

router.post('/swaps', function(req, res) {
	console.log("POST");
	console.dir(req.body + "req body");
	var igLink = req.body.InstagramLink == null ? null : req.body.InstagramLink;
	var swapObj = {
		"Title":req.body.SwapTitle, 
		"Seller": req.body.Seller,
		"Latitude": req.body.lat,
		"Longitude": req.body.lng,
		"Price": req.body.Price,
		"Size": req.body.Size,
		"ImageURL": req.body.ImageURL,
		"Description": req.body.Description,
		"InstagramLink": igLink,
		"ContactInfo": req.body.ContactInfo
	};
	//validation of obj
	var db = req.db;
	var Swaps = db.get(dbCollection);
	Swaps.insert(swapObj, function(err, doc) {
		if (err) {
			res.send("There was a problem adding the information to the database");
		}
		else {
			res.send(doc);
		}
	});
	console.log("POST bottom");
});

router.delete('/swaps/:swapid', function(req, res) {
	console.log("DELBYID");
	var swapId = req.params.swapid;

	var db = req.db;
	var Swaps = db.get(dbCollection);
	//Get full object by ID
	Swaps.remove({_id : swapId});
	console.log("DELBYID bottom");
});


module.exports = router;
