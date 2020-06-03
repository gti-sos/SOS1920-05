module.exports =function (app) {
	
	const dataStore = require("nedb");
	const path = require("path");
	
	const BASE_API_URL = "/api/v1";
	const dbFileName = path.join(__dirname,"books_exports.db");
	

	const db = new dataStore({
		filename: dbFileName,
		autoload: true
		});


	//----------API DIEGO-------//

	
	var books_exports = [] ;
	

	var Initialbooks_exports = [
		{ 
			country: "france",
			year: 2015,
			exp_book: 151040,
			exp_editorial: 58660,
			exp_graphic_sector:92380
		},
		{ 
			country: "italy",
			year: 2016,
			exp_book: 29329,
			exp_editorial: 26000,
			exp_graphic_sector:3329
		},
		{ 
			country: "portugal",
			year: 2017,
			exp_book: 46477,
			exp_editorial: 19952,
			exp_graphic_sector:26254
		},
		{ 
			country: "uk",
			year: 2016,
			exp_book: 57298,
			exp_editorial: 21017,
			exp_graphic_sector:36280
		},
		{ 
			country: "mexico",
			year: 2015,
			exp_book: 61382,
			exp_editorial: 59956,
			exp_graphic_sector:1427
		},
		{ 
			country: "uruguay",
			year: 2015,
			exp_book: 52278,
			exp_editorial: 72827,
			exp_graphic_sector:27278
		},
		{ 
			country: "paraguay",
			year: 2016,
			exp_book: 8787,
			exp_editorial: 866,
			exp_graphic_sector:644
		},
		{ 
			country: "chile",
			year: 2015,
			exp_book: 7887,
			exp_editorial: 78778,
			exp_graphic_sector:7878
		},
		{ 
			country: "argentina",
			year: 2015,
			exp_book: 21552,
			exp_editorial: 2542,
			exp_graphic_sector:2542
		},
		{ 
			country: "polonia",
			year: 2016,
			exp_book: 2282,
			exp_editorial: 282,
			exp_graphic_sector:282
		},
		{ 
			country: "brasil",
			year: 2017,
			exp_book: 28882,
			exp_editorial: 2828,
			exp_graphic_sector:2822
		}
	];


	//LOAD INITIAL DATA de GET /books_exports
	app.get(BASE_API_URL+"/books-exports/loadInitialData", (req,res) =>{
		db.remove({}, { multi: true }, function (err, deleteBooks_exports) {});
		db.insert(Initialbooks_exports);
		res.sendStatus(200);
		console.log("Initial loaded:"+JSON.stringify(Initialbooks_exports,null,2));
	});

	// GET BOOKS EXPORTS

	app.get(BASE_API_URL+"/books-exports", (req,res) =>{
		var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
        
        var country = req.query.country;
        var year = parseInt(req.query.year);
        var exp_book = parseFloat(req.query.exp_book);
        var exp_editorial = parseFloat(req.query.exp_editorial);
        var exp_graphic_sector = parseFloat(req.query.exp_graphic_sector);
        
    
        if(from && to) {
            db.find({ year: {$gte: from, $lte: to}}).skip(offset).limit(limit).exec((err, books_exports)=>{
                if(books_exports.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    books_exports.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(books_exports,null,2));
                	}    
			});
			
        } else if(country || year || exp_book || exp_editorial || exp_graphic_sector) {
              if(!year && !exp_book && !exp_editorial && !exp_graphic_sector ) {
                   db.find({"country":country}).skip(offset).limit(limit).exec((err, books_exports)=>{
                    if(books_exports.length == 0) {
                    	res.sendStatus(404,"NOT FOUND");
                	} else { 
                   		books_exports.forEach((c) => {
							delete c._id;
						});
						res.send(JSON.stringify(books_exports,null,2));
                		}  
                	});
                  
              }  else if(!country && !exp_book && !exp_editorial && !exp_graphic_sector ) {
				  db.find({"year":year}).skip(offset).limit(limit).exec((err, books_exports)=>{
					   if(books_exports.length == 0) {
						res.sendStatus(404,"NOT FOUND");
                	} else { 
                    	books_exports.forEach((c) => {
							delete c._id;
						});
						res.send(JSON.stringify(books_exports,null,2));
                	} 
                });
				  
        } else if(!country && !year && !exp_editorial && !exp_graphic_sector) {
                   db.find({"exp_book":exp_book}).skip(offset).limit(limit).exec((err, books_exports)=>{
                    if(books_exports.length == 0) {
                    	res.sendStatus(404,"NOT FOUND");
               	 	} else { 
                   		books_exports.forEach((c) => {
							delete c._id;
						});
						res.send(JSON.stringify(books_exports,null,2));
                		} 
                	}); 
			
        }  else if(!country && !year && !exp_book && !exp_graphic_sector ) {
                   db.find({"exp_editorial":exp_editorial}).skip(offset).limit(limit).exec((err, books_exports)=>{
                    if(books_exports.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    books_exports.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(books_exports,null,2));
                	} 
                });
			
        } else if(!country && !year && !exp_editorial && !exp_book ) {
                   db.find({"exp_graphic_sector":exp_graphic_sector}).skip(offset).limit(limit).exec((err, books_exports)=>{   
				if(books_exports.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    books_exports.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(books_exports,null,2));
                	} 
                });
        }  else if(!exp_book && !exp_editorial && !exp_graphic_sector ) {
            db.find({"country":country, "year": year}).skip(offset).limit(limit).exec((err, books_exports)=>{
                        if(books_exports.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    books_exports.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(books_exports,null,2));
                	} 
                });
        }	else  {
            db.find({"country":country, "year": year, "exp_editorial":exp_editorial, "exp_graphic_sector":exp_graphic_sector}).skip(offset).limit(limit).exec((err, books_exports)=>{
                        if(books_exports.length == 0) {
                    res.sendStatus(404,"NOT FOUND");
                } else { 
                    books_exports.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(books_exports,null,2));
                	} 
                });
        }
        } else {
			
            db.find({}).skip(offset).limit(limit).exec((err, books_exports)=>{
                    books_exports.forEach((c) => {
						delete c._id;
					});
					res.send(JSON.stringify(books_exports,null,2));
				});      
            };
    
	});


	// POST BOOKS EXPORTS

	app.post(BASE_API_URL+"/books-exports",(req,res) =>{

		var newBooks_exports = req.body;

		db.find({country : newBooks_exports.country, year : newBooks_exports.year},function (err,books_exports){
			if (books_exports.length > 0){
				res.sendStatus(409,"CONFLITCT");
			}else if((newBooks_exports == "") || (newBooks_exports.country == null) || (newBooks_exports.country == "") || (newBooks_exports.year == null) || (newBooks_exports.year == "")|| (newBooks_exports.exp_book == null) || (newBooks_exports.exp_book == "")|| (newBooks_exports.exp_editorial == null) || (newBooks_exports.exp_editorial == "")|| (newBooks_exports.exp_graphic_sector == null) || (newBooks_exports.exp_graphic_sector == "")){
				res.sendStatus(400,"BAD REQUEST");
			} else {
				db.insert(newBooks_exports); 	
				res.sendStatus(201,"CREATED");
			}
		});
	});
	app.post(BASE_API_URL+"/books-exports/:country/:year",(req,res) =>{
		res.sendStatus(405);
	});


	// DELETE BOOKS EXPORTS

	app.delete(BASE_API_URL+"/books-exports/", (req,res)=>{
		db.remove({}, { multi: true }, function (err, deleteBooks_exports) {});
		res.sendStatus(200);
	});


	// GET BOOKS EXPORTS/XXX

	app.get(BASE_API_URL+"/books-exports/:country/:year", (req,res)=>{

		var country = req.params.country;
		var year = parseInt(req.params.year);

		db.find({"country" : country, "year" : year},function (err,filteredBooks_exports){
			if(filteredBooks_exports.length >= 1){
				res.send(filteredBooks_exports.map((c)=>{
						delete c._id;
						return c;
					})[0]);
			}else{
				res.sendStatus(404,"BOOKS EXPORTS NOT FOUND");
			}
		})
	});

	// PUT BOOKS EXPORTS/XXX
	
	app.put( BASE_API_URL+"/books-exports/:country/:year", (req, res) => {
		var UpdatedBooks_exports = req.body;
		var country = req.params.country;
		var year = parseInt(req.params.year);

		if((UpdatedBooks_exports.country=="") ||(UpdatedBooks_exports.country!=country) || (UpdatedBooks_exports.year=="")  ||(UpdatedBooks_exports.year!=year)|| (UpdatedBooks_exports.exp_book=="") || (UpdatedBooks_exports.exp_editorial=="")  ||(UpdatedBooks_exports.exp_graphic_sector=="")){
			res.sendStatus(400,"BAD REQUEST");
		}else{
			db.update({"country": country, "year": year}, UpdatedBooks_exports);
			res.sendStatus(200,"OK");
		}
	});


	app.put(BASE_API_URL+"/books-exports/", (req,res)=>{
		res.sendStatus(405);
	});


	// DELETE BOOKS EXPORTS/XXX

	app.delete(BASE_API_URL+"/books-exports/:country/:year", (req,res)=>{

		var country = req.params.country;
		var year =  parseInt(req.params.year);

		db.remove({"country" : country, "year" : year},  {}, function(err, filteredBooks_exports){	
			if(filteredBooks_exports == 1) {
					res.sendStatus(200);
				}else {
					res.sendStatus(404,"BOOKS EXPORTS NOT FOUND");
				}
		});
	});

}
