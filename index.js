const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const books_exportsAPI = require(path.join(__dirname,"./src/backend/books_exportsAPI"));
const health_publicAPI = require(path.join(__dirname,"./src/backend/health_publicAPI"));
const life_expectanciesAPI = require(path.join(__dirname,"./src/backend/life_expectanciesAPI"));


const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use("/",express.static("./public"));

app.use(cors());
books_exportsAPI(app);
health_publicAPI(app);
life_expectanciesAPI(app);

	
app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");

var APIExt1 = "https://www.metaweather.com/api/location/753692/";
    app.use("/GrupoExt1", function(req, res) {
        console.log('piped: '+ APIExt1);
        req.pipe(request(APIExt1)).pipe(res);
    })