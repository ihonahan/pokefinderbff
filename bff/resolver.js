const transformer = require("./transformer");
const request = require("request");
const utils = require("./utils");

module.exports = {
    resolveHomeRequest: resolveHomeRequest,
    resolvePokemonDetailRequest: resolvePokemonDetail,
    resolvePokemonByTypeAbility: resolvePokemonByTypeAbility,
    resolveGenericLists: resolveGenericLists
};

function resolveHomeRequest(req, res, url) {
    request(url, (error, response, body) => {
        if (hasError(error, res)) { return }
        if (invalidCode(response.statusCode, res)) { return }

        var result = transformer.pokemonList(body);
        result.forEach( item => item.image = utils.getOfficialArtWork(item.url) );
        result.forEach( item => item.id = utils.getId(item.url) );
        res.json(result);    
    })    

} 

function resolvePokemonDetail(req, res, url) {
    request(url, (error, response, body) => {
        if (hasError(error, res)) { return }
        if (invalidCode(response.statusCode, res)) { return }

        var result = transformer.pokemonDetail(body);
        res.json(result);    
    })    

}

function resolvePokemonByTypeAbility(req, res, url) {
    request(url, (error, response, body) => {
        if (hasError(error, res)) { return }
        if (invalidCode(response.statusCode, res)) { return }

        var result = transformer.pokemonListBy(body);
        result.forEach( item => item.image = utils.getOfficialArtWork(item.url) );
        result.forEach( item => item.id = utils.getId(item.url) );
        res.json(result);    
    })    

}

function resolveGenericLists(req, res, url) {
    request(url, (error, response, body) => {
        if (hasError(error, res)) { return }
        if (invalidCode(response.statusCode, res)) { return }

        var result = transformer.pokemonList(body);
        result.forEach( item => item.id = utils.getId(item.url) );
        res.json(result);    
    })    

}

function hasError(error, res) {
    console.log("-->hasError? " + error);

    if (error) {
        var error = {"error": 500, "message": "Error trying to request Pokemon list."}
        res.status(500).json(error);
        return true;
    }

    return false;
}

function invalidCode(statusCode, res) {
    console.log("-->invalidCode? " + statusCode);

    if (statusCode != 200) {
        var error = {"error": statusCode, "message": "Unknown error."}
        res.status(statusCode).json(error);
        return true;
    }

    return false;
}