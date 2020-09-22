const utils = require("./utils");

module.exports = {
    pokemonList: pokemonList,
    pokemonDetail: pokemonDetail,
    pokemonListBy: pokemonListBy
};
  
function pokemonList(value) {
    try {
        var json = JSON.parse(value);
        var results = json.results;
        var result = new Array();

        if (Array.isArray(results)) {
            results.forEach( item => result.push( convertJsonToGeneralData(item) ) )

            return result;
        } 
        
    } catch (e) {
        console.log("--> pokemonList -> error: " + e);
        return [];
    }
}

function pokemonDetail(value) {
    try {
        var json = JSON.parse(value);
        var result = convertJsonToPokemon(json);

        return result;
    } catch (e) {
        console.log("--> pokemonDetail -> error: " + e);
        return null;
    }
}

function pokemonListBy(value) {
    try {
        var json = JSON.parse(value);
        var results = json.pokemon;
        var result = new Array();

        if (Array.isArray(results)) {
            results.forEach( item => result.push( convertJsonToGeneralData(item.pokemon) ) )

            return result;
        } 
    } catch (e) {
        console.log("--> pokemonListBy -> error: " + e);
        return null;
    }
}


function convertJsonToGeneralData(item) {
    var general = new Object();
    general.name = item.name;
    general.url = item.url;

    return general;
}

function convertJsonToPokemon(item) {
    var pokemon = new Object();
    pokemon.id = item.id;
    pokemon.name = item.name;
    pokemon.image = utils.getArtworkBaseUrl() + "/" + item.id + ".png";
    pokemon.height = item.height;
    pokemon.weight = item.weight;
    
    var abilities = new Array();
    item.abilities.forEach(ability => {
        var pokeAbility = new Object();
        pokeAbility.name = ability.ability.name;
        pokeAbility.url = ability.ability.url;
        pokeAbility.slot = ability.slot;
        abilities.push(pokeAbility);
    });
    pokemon.abilities = abilities;

    var moves = new Array();
    item.moves.forEach(move => {
        var pokeMove = new Object();
        pokeMove.name = move.move.name;
        pokeMove.url = move.move.url;
        moves.push(pokeMove);
    });
    pokemon.moves = moves;

    var types = new Array();
    item.types.forEach(type => {
        var pokeType = new Object();
        pokeType.name = type.type.name;
        pokeType.url = type.type.url;
        types.push(pokeType);
    });
    pokemon.types = types;

    return pokemon;
}
