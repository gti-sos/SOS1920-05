const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const request = require("request");
const books_exportsAPI = require(path.join(__dirname,"./src/backend/books_exportsAPI"));
const health_publicAPI = require(path.join(__dirname,"./src/backend/health_publicAPI"));
const life_expectanciesAPI = require(path.join(__dirname,"./src/backend/life_expectanciesAPI"));

var proxyGrupo28 = "/api/v1/ppas";
var urlProxyGrupo28 = "https://sos1920-28.herokuapp.com";

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use("/",express.static("./public"));

//-------Proxy Diego a Grupo 28
app.use(proxyGrupo28, function(req, res){
    var url = urlProxyGrupo28 + req.baseUrl + req.url;
    console.log("piped: " + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res)
});


//Proxy Mario Grupo24 -----------------------------
var pathProxyG24='/api/v2/atc-stats';
var hostProxyG24 = 'https://sos1920-24.herokuapp.com';
 
app.use(pathProxyG24, function(req, res) {
    var url = hostProxyG24 + req.baseUrl + req.url;
    console.log('piped: '+req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});
//---------------------------------------



app.use(cors());
books_exportsAPI(app);
health_publicAPI(app);
life_expectanciesAPI(app);


	
app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");

