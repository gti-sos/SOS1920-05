module.exports =function (app) {
	
	const dataStore = require("nedb");
	const path = require("path");
	
	const BASE_API_URL = "/api/v1";
	const dbFileName = path.join(__dirname,"health_public.db");


	const db = new dataStore({
		filename: dbFileName,
		autoload: true
		});
	

	//----- API MARIO --------//
	
	var health_public = [] ;

	var initialHealth_public = [
		{ 
			country: "france",
			year: 2015,
			total_spending: 76.68,
			public_spending: 15.54,
			public_spending_pib: 8.79,
		},
		{ 
			country: "italy",
			year: 2016,
			total_spending: 74.63,
			public_spending: 13.47,
			public_spending_pib: 6.63,
		},
		{ 
			country: "portugal",
			year: 2017,
			total_spending: 66.32,
			public_spending: 13.40,
			public_spending_pib: 5.95,
		},
		{ 
			country: "uk",
			year: 2016,
			total_spending: 79.48,
			public_spending: 18.88,
			public_spending_pib: 7.71,
		},
		{ 
			country: "mexico",
			year: 2015,
			total_spending: 52.17,
			public_spending: 10.86,
			public_spending_pib: 3.00,
		}
	];
	
	//LOAD INITIAL DATA de GET /health_public

	app.get(BASE_API_URL+"/health_public/loadInitialData", (req,res) =>{
		db.remove({}, { multi: true }, function (err, deleteHealth_public) {});
		db.insert(initialHealth_public);
		res.sendStatus(200);
		console.log("Initial loaded:"+JSON.stringify(initialHealth_public,null,2));
	});

	// GET HEALTH PUBLIC

		app.get(BASE_API_URL+"/health_public", (req,res) =>{
		var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
        
        var country = req.query.country;
        var year = parseInt(req.query.year);
        var total_spending = parseFloat(req.query.total_spending);
        var public_spending = parseFloat(req.query.public_spending);
        var public_spending_pib = parseFloat(req.query.public_spending_pib);
        
    
        if(from && to) {
            db.find({ year: {$gte: from, $lte: to}}).skip(offset).limit(limit).exec((err, health_public)=>{
                if(health_public.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    health_public.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(health_public,null,2));
                	}    
			});
			
        } else if(country || year || total_spending || public_spending || public_spending_pib) {
              if(!year && !total_spending && !public_spending && !public_spending_pib ) {
                   db.find({"country":country}).skip(offset).limit(limit).exec((err, health_public)=>{
                    if(health_public.length == 0) {
                    	res.sendStatus(404,"NOT FOUND");
                	} else { 
                   		health_public.forEach((c) => {
							delete c._id;
						});
						res.send(JSON.stringify(health_public,null,2));
                		}  
                	});
                  
              }  else if(!country && !total_spending && !public_spending && !public_spending_pib ) {
				  db.find({"year":year}).skip(offset).limit(limit).exec((err, health_public)=>{
					   if(health_public.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    health_public.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(health_public,null,2));
                	} 
                });
				  
        } else if(!country && !year && !public_spending && !public_spending_pib) {
                   db.find({"total_spending":total_spending}).skip(offset).limit(limit).exec((err, health_public)=>{
                    if(health_public.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    health_public.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(health_public,null,2));
                	} 
                	}); 
			
        }  else if(!country && !year && !total_spending && !public_spending_pib ) {
                   db.find({"public_spending":public_spending}).skip(offset).limit(limit).exec((err, health_public)=>{
                    if(health_public.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    health_public.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(health_public,null,2));
                	} 
                });
			
        } else if(!country && !year && !total_spending && !public_spending ) {
                   db.find({"public_spending_pib":public_spending_pib}).skip(offset).limit(limit).exec((err, health_public)=>{   
				if(health_public.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    health_public.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(health_public,null,2));
                	} 
                });
        }  else if(!total_spending && !public_spending && !public_spending_pib ) {
            db.find({"country":country, "year": year}).skip(offset).limit(limit).exec((err, health_public)=>{
                        if(health_public.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    health_public.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(health_public,null,2));
                	} 
                });
        }	else {
            db.find({"country":country, "year": year, "total_spending":total_spending, "public_spending":public_spending}).skip(offset).limit(limit).exec((err, health_public)=>{
                        if(health_public.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    health_public.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(health_public,null,2));
                	} 
                });
        }	
			
        } else {
			
            db.find({}).skip(offset).limit(limit).exec((err, health_public)=>{
                    health_public.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(health_public,null,2));
				});      
            };
    
	});



		// POST HEALTH PUBLIC

		app.post(BASE_API_URL+"/health_public",(req,res) =>{

			var newHealth_public = req.body;

			db.find({country : newHealth_public.country, year : newHealth_public.year},function (err,health_public){
			if (health_public.length > 0){
				res.sendStatus(409,"CONFLITCT");
			}else if((newHealth_public == "") || (newHealth_public.country == null) || (newHealth_public.country == "") || (newHealth_public.year == null) || (newHealth_public.year == null) ||
					(newHealth_public.total_spending == "") || (newHealth_public.total_spending == null) ||
					(newHealth_public.public_spending == "") || (newHealth_public.public_spending == null) ||
					(newHealth_public.public_spending_pib == "") || (newHealth_public.public_spending_pib == null)){
	
				res.sendStatus(400,"BAD REQUEST");
			} else {
				db.insert(newHealth_public); 	
				res.sendStatus(201,"CREATED");
			}
		});
	});
		app.post(BASE_API_URL+"/health_public/:country/:year",(req,res) =>{
			 res.sendStatus(405);
			});
	
	// DELETE HEALTH PUBLIC

		app.delete(BASE_API_URL+"/health_public/", (req,res)=>{
		db.remove({}, { multi: true }, function (err, deleteHealth_public) {});
		res.sendStatus(200);
		});


		// GET HEALTH PUBLIC/XXX

		app.get(BASE_API_URL+"/health_public/:country/:year", (req,res)=>{

		var country = req.params.country;
		var year = parseInt(req.params.year);

		db.find({"country" : country, "year" : year},function (err,filteredHealth_public){
			if(filteredHealth_public.length >= 1){
				res.send(filteredHealth_public.map((c)=>{
						delete c._id;
						return c;
					})[0]);
			}else{
				res.sendStatus(404,"HEALTH PUBLIC NOT FOUND");
			}
		})
	});
	
	
	// PUT HEALTH PUBLIC/XXX

	app.put( BASE_API_URL+"/health_public/:country/:year", (req, res) => {
		var updatedHealth_public = req.body;
		var country = req.params.country;
		var year = parseInt(req.params.year);

		if((updatedHealth_public.country=="") ||(updatedHealth_public.country!=country) || (updatedHealth_public.year=="")  ||(updatedHealth_public.year!=year)|| (updatedHealth_public.total_spending=="") || (updatedHealth_public.public_spending=="")  ||(updatedHealth_public.public_spending_pib=="")){
			res.sendStatus(400,"BAD REQUEST");
		}else{
			db.update({"country": country, "year": year}, updatedHealth_public);
			res.sendStatus(200,"OK");
		}
	});


	app.put(BASE_API_URL+"/health_public/", (req,res)=>{
		res.sendStatus(405, "METHOD NOT ALLOWED");
	});

		
		// DELETE HEALTH PUBLIC/XXX

		app.delete(BASE_API_URL+"/health_public/:country/:year", (req,res)=>{

		var country = req.params.country;
		var year =  parseInt(req.params.year);

		db.remove({"country" : country, "year" : year},  {}, function(err, filteredHealth_public){	
			if(filteredHealth_public == 1) {
					res.sendStatus(200);
				}else {
					res.sendStatus(404,"HEALTH PUBLIC NOT FOUND");
				}
		});
	});
	
}
