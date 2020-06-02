const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const request = require("request");
const books_exportsAPI = require(path.join(__dirname,"./src/backend/books_exportsAPI"));
const health_publicAPI = require(path.join(__dirname,"./src/backend/health_publicAPI"));
const life_expectanciesAPI = require(path.join(__dirname,"./src/backend/life_expectanciesAPI"));
var proxyGrupo28 = "/api/v1/ppas";
var proxyGrupo_28_gce = "/api/v1/gce";
var urlProxyGrupo28 = "https://sos1920-28.herokuapp.com";
var proxyGrupoExt1 = "/api/digimon";
var urlProxyGrupoExt1 = "https://digimon-api.herokuapp.com";
var proxyGrupoExt2 = "/v2/networks?fields=location";
var urlProxyGrupoExt2 = "http://api.citybik.es";
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
//-------Proxy Diego a Grupo Ext 1
app.use(proxyGrupoExt1, function(req, res){
    var url = urlProxyGrupoExt1 + req.baseUrl + req.url;
    console.log("piped: " + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res)
});
//-------Proxy Diego a Grupo Ext 2
app.use(proxyGrupoExt2, function(req, res){
    var url = urlProxyGrupoExt2 + req.baseUrl + req.url;
    console.log("piped: " + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res)
});

//       Proxy Mathias grupo_28_gce
app.use(proxyGrupo_28_gce, function(req, res){
    var url = urlProxyGrupo28 + req.baseUrl + req.url;
    console.log("piped: " + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res)
});

app.use(cors());
books_exportsAPI(app);
health_publicAPI(app);
life_expectanciesAPI(app);


	
app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");

