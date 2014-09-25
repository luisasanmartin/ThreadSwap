module.exports = function(app, db) {

	//var router = app.Router();
	var dbCollection = "swapcollection";
	/* GET home page. */
	app.get('/', function(req, res) {
		res.sendfile('./public/views/index.html'); // load our public/index.html file
		console.log("Router index page");
	});

	app.get('/swaps', function(req, res) {
		console.log("GET");
		var Swaps = db.get(dbCollection);
		var result = Swaps.find({}, {fields: {ImageURL: 1}}, function(err, swaps) {
			if (err)
				res.send(err);
			res.json(swaps); //return all swaps in json format
		});
		console.log("GET bottom");
	});

	app.get('/swaps/:swapid', function(req, res) {
		console.log("GETBYID");
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

	app.post('/swaps', function(req, res) {
		console.log("POST");
		console.dir(req.headers+"  req headers");
		console.dir(req.body + "   req body");

		var igLink = req.body.InstagramLink == null ? null : req.body.InstagramLink;
		var swapObj = {
			"Title":req.body.Title, 
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
		console.log(swapObj);
		//validation of obj
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

	app.delete('/swaps/:swapid', function(req, res) {
		console.log("DELBYID");
		var swapId = req.params.swapid;

		var Swaps = db.get(dbCollection);
		console.log("debug1");
		//Get full object by ID
		Swaps.remove({_id : swapId});
		console.log("DELBYID bottom");
		res.end();
	});

	//app.use('/', router);
}
//module.exports = router;
