module.exports = {
    getOfficialArtWork: getOfficialArtWork,
    getId: getId,
    getArtworkBaseUrl: getArtworkBaseUrl
};

function getOfficialArtWork(fromUrl) {
    var id = getId(fromUrl);
    const baseUrl = getArtworkBaseUrl();
    return baseUrl + "/" + id + ".png";
}

function getId(fromUrl) {
    var comps = fromUrl.split("/");
    var id = comps[comps.length - 2];

    return id;
}

function getArtworkBaseUrl() {
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
}