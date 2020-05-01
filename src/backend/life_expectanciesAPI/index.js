module.exports =function (app) {
	
	console.log("life_expectanciesAPI entrace...");
	const dataStore = require("nedb");
	const path = require("path");
	
	const BASE_API_URL = "/api/v1";
	const dbFileName = path.join(__dirname,"life_expectancies.db");
	
	

	const db = new dataStore({
		filename: dbFileName,
		autoload: true
		});
	
	//----- API MATHIAS --------//
	var life_expectancies = [] ;	
	var initialLife_expectancies = [
	{ 
		country: "france",
		year: 2015,
		women_life_expectancy: 85.60,
		men_life_expectancy: 79.20,
		average_life_expectancy: 82.40,
	},
	{ 
		country: "italy",
		year: 2016,
		women_life_expectancy: 85.60,
		men_life_expectancy: 81.00,
		average_life_expectancy: 83.40,
	},
	{ 
		country: "portugal",
		year: 2017,
		women_life_expectancy: 84.60,
		men_life_expectancy: 78.40,
		average_life_expectancy: 81.60,
	},
	{ 
		country: "uk",
		year: 2016,
		women_life_expectancy: 83.00,
		men_life_expectancy: 79.40,
		average_life_expectancy: 81.20,
	},
	{ 
		country: "mexico",
		year: 2015,
		women_life_expectancy: 79.54,
		men_life_expectancy: 74.72,
		average_life_expectancy: 77.12,
	}
];

//LOAD INITIAL DATA de GET /life_expectancies
app.get(BASE_API_URL+"/life_expectancies/loadInitialData", (req,res) =>{
	console.log("New GET .../loadInitialData");
	
	
	db.remove({}, { multi: true }, function (err, deleteLife_expectancies) {});
	
	
	db.insert(initialLife_expectancies);
		res.sendStatus(200);

		console.log("Initial loaded life_expectancies : "+JSON.stringify(initialLife_expectancies,null,2));
	});
	

// GET life_expectancies

app.get(BASE_API_URL+"/life_expectancies", (req,res) =>{
		console.log("New GET .../life_expectancies");
	
		var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        console.log("limit="+limit+", offset="+offset);
	
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
        
        var country = req.query.country;
        var year = parseInt(req.query.year);
        var women_life_expectancy = parseFloat(req.query.women_life_expectancy);
        var men_life_expectancy = parseFloat(req.query.men_life_expectancy);
        var average_life_expectancy = parseFloat(req.query.average_life_expectancy);
       
	console.log("country="+country+", year="+year+", women_life_expectancy="+women_life_expectancy+", men_life_expectancy="+men_life_expectancy+", average_life_expectancy="+average_life_expectancy+", from=from, to="+to); 
    
        if(from && to) {
            db.find({ year: {$gte: from, $lte: to}}).skip(offset).limit(limit).exec((err, life_expectancies)=>{
                if(life_expectancies.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    life_expectancies.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(life_expectancies,null,2));
                	}    
			});
			
        } else if(country || year || women_life_expectancy || men_life_expectancy || average_life_expectancy) {
              if(!year && !women_life_expectancy && !men_life_expectancy && !average_life_expectancy ) {
                   db.find({"country":country}).skip(offset).limit(limit).exec((err, life_expectancies)=>{
                    if(life_expectancies.length == 0) {
                    	res.sendStatus(404,"NOT FOUND");
                	} else { 
                   		life_expectancies.forEach((c) => {
							delete c._id;
						});
						res.send(JSON.stringify(life_expectancies,null,2));
                		}  
                	});
                  
              }  else if(!country && !women_life_expectancy && !men_life_expectancy && !average_life_expectancy ) {
				  db.find({"year":year}).skip(offset).limit(limit).exec((err, life_expectancies)=>{
					   if(life_expectancies.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    life_expectancies.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(life_expectancies,null,2));
                	} 
                });
				  
        } else if(!country && !year && !men_life_expectancy && !average_life_expectancy) {
                   db.find({"women_life_expectancy":women_life_expectancy}).skip(offset).limit(limit).exec((err, life_expectancies)=>{
                    if(life_expectancies.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    life_expectancies.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(life_expectancies,null,2));
                	} 
                	}); 
			
        }  else if(!country && !year && !women_life_expectancy && !average_life_expectancy ) {
                   db.find({"men_life_expectancy":men_life_expectancy}).skip(offset).limit(limit).exec((err, life_expectancies)=>{
                    if(life_expectancies.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    life_expectancies.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(life_expectancies,null,2));
                	} 
                });
			
        } else if(!country && !year && !men_life_expectancy && !women_life_expectancy ) {
                   db.find({"average_life_expectancy":average_life_expectancy}).skip(offset).limit(limit).exec((err, life_expectancies)=>{   
				if(life_expectancies.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    life_expectancies.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(life_expectancies,null,2));
                	} 
                });
        }  else if(!women_life_expectancy && !men_life_expectancy && !average_life_expectancy ) {
            db.find({"country":country, "year": year}).skip(offset).limit(limit).exec((err, life_expectancies)=>{
                        if(life_expectancies.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    life_expectancies.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(life_expectancies,null,2));
                	} 
                });
        }	else {
            db.find({"country":country, "year": year, "men_life_expectancy":men_life_expectancy, "average_life_expectancy":average_life_expectancy}).skip(offset).limit(limit).exec((err, life_expectancies)=>{
                        if(life_expectancies.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    life_expectancies.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(life_expectancies,null,2));
                	} 
                });
        }	
			
        } else {
			
            db.find({}).skip(offset).limit(limit).exec((err, life_expectancies)=>{
                    life_expectancies.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(life_expectancies,null,2));
				});      
            };
    
	});



		// POST life_expectancies

		app.post(BASE_API_URL+"/life_expectancies",(req,res) =>{

			var newLife_expectancies = req.body;

			db.find({country : newLife_expectancies.country, year : newLife_expectancies.year},function (err,life_expectancies){
			if (life_expectancies.length > 0){
				res.sendStatus(409,"CONFLITCT");
			}else if((newLife_expectancies == "") || (newLife_expectancies.country == null) || (newLife_expectancies.country == "") || (newLife_expectancies.year == null) || (newLife_expectancies.year == "") || (newLife_expectancies.women_life_expectancy == null) || (newLife_expectancies.women_life_expectancy == "") || (newLife_expectancies.men_life_expectancy == null) || (newLife_expectancies.men_life_expectancy == "") || (newLife_expectancies.average_life_expectancy == null) || (newLife_expectancies.average_life_expectancy == "")){
				res.sendStatus(400,"BAD REQUEST");
			} else {
				db.insert(newLife_expectancies); 	
				res.sendStatus(201,"CREATED");
			}
		});
	});
		app.post(BASE_API_URL+"/life_expectancies/:country/:year",(req,res) =>{
			 res.sendStatus(405);
			});
	
	// DELETE life_expectancies

		app.delete(BASE_API_URL+"/life_expectancies/", (req,res)=>{
		db.remove({}, { multi: true }, function (err, deleteLife_expectancies) {});
		res.sendStatus(200);
		});


		// GET life_expectancies/XXX

		app.get(BASE_API_URL+"/life_expectancies/:country/:year", (req,res)=>{

		var country = req.params.country;
		var year = parseInt(req.params.year);

		db.find({"country" : country, "year" : year},function (err,filteredLife_expectancies){
			if(filteredLife_expectancies.length >= 1){
				res.send(filteredLife_expectancies.map((c)=>{
						delete c._id;
						return c;
					})[0]);
			}else{
				res.sendStatus(404," life_expectancies NOT FOUND");
			}
		})
	});
	
	
	// PUT life_expectancies/XXX

	app.put( BASE_API_URL+"/life_expectancies/:country/:year", (req, res) => {
		console.log("New PUT .../life_expectancies/:country/:year");
		var updatedLife_expectancies = req.body;
		var country = req.params.country;
		var year = parseInt(req.params.year);
		
		if((updatedLife_expectancies.country=="") ||(updatedLife_expectancies.country!=country) || (updatedLife_expectancies.year=="")  ||(updatedLife_expectancies.year!=year)|| (updatedLife_expectancies.women_life_expectancy=="") || (updatedLife_expectancies.men_life_expectancy=="")  ||(updatedLife_expectancies.average_life_expectancy=="")){
			res.sendStatus(400,"BAD REQUEST");
		}else{
			db.update({"country": country, "year": year}, updatedLife_expectancies);
			res.sendStatus(200,"OK");
		}
/*
		if((updatedLife_expectancies.country==null) ||(updatedLife_expectancies.year==null)  || (updatedLife_expectancies.women_life_expectancy==null) || (updatedLife_expectancies.men_life_expectancy==null)  ||(updatedLife_expectancies.average_life_expectancy==null) || (updatedLife_expectancies == "")){
			res.sendStatus(400,"BAD REQUEST");
		}else{
			db.remove({"country": country, "year": year},{}, function (err, filteredLife_expectancies) {});
			db.insert(updatedLife_expectancies);
			res.sendStatus(200);
		};
	*/	
	});


	app.put(BASE_API_URL+"/life_expectancies/", (req,res)=>{
		res.sendStatus(405, "METHOD NOT ALLOWED");
	});

		
		// DELETE life_expectancies/XXX

		app.delete(BASE_API_URL+"/life_expectancies/:country/:year", (req,res)=>{
		console.log("New DELETE .../life_expectancies/:country/:year");
		var Country = req.params.country;
		var Year =  parseInt(req.params.year);

		db.remove({"country" : Country, "year" : Year},  {}, function(err, filteredLife_expectancies){	
			if(filteredLife_expectancies == 1) {
					res.sendStatus(200);
					console.log("Removed");
				}else {
					res.sendStatus(404);
					console.log("Not found");
				}
		});
	});
	
}
