const port = 3000;

const baseUrl = "https://pokeapi.co/api/v2";
const apiList = "/pokemon?limit=20";
const apiSearchByName = "/pokemon/";
const apiSearchById = "/pokemon/";
const apiSearchByType = "/type/";
const apiSearchByAbility = "/ability/";
const apiTypesList = "/type?limit=30";
const apiAbilitiesList = "/ability?limit=300";

const resolver = require("./resolver");

var express = require("express");
var app = express();

var utils = require("./utils");

var util = require('util');

app.get("/home", (req, res) => {
    var urlRequest = baseUrl + apiList;
    resolver.resolveHomeRequest(req, res, urlRequest);
})

app.get("/PokemonByName", (req, res) => {
    var urlRequest = baseUrl + apiSearchByName + req.query.name;
    resolver.resolvePokemonDetailRequest(req, res, urlRequest);
}) 

app.get("/PokemonById", (req, res) => {
    var urlRequest = baseUrl + apiSearchById + req.query.id;
    resolver.resolvePokemonDetailRequest(req, res, urlRequest);
}) 

app.get("/PokemonByAbility", (req, res) => {
    var urlRequest = baseUrl + apiSearchByAbility + req.query.ability;
    resolver.resolvePokemonByTypeAbility(req, res, urlRequest);
}) 

app.get("/PokemonByType", (req, res) => {
    var urlRequest = baseUrl + apiSearchByType + req.query.type;
    resolver.resolvePokemonByTypeAbility(req, res, urlRequest);
}) 

app.get("/typesList", (req, res) => {
    var urlRequest = baseUrl + apiTypesList;
    resolver.resolveGenericLists(req, res, urlRequest);
});

app.get("/abilitiesList", (req, res) => {
    var urlRequest = baseUrl + apiAbilitiesList;
    resolver.resolveGenericLists(req, res, urlRequest);
});


app.listen(port, console.log.bind(null, "Listening TCP Port: " + port))
