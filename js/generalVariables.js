Storage.prototype.setObj = function (key, obj) {
    this.setItem(key, JSON.stringify(obj));
}

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key));
}

var GeneralVariables = (function () {

    var JSONImageData,
        clickedSmallImage,
        currentImage,
        IMAGES_DIRECTORY = 'uploads/',
        DESIGN_DIRECTORY = 'design/',
        headers = {
            "X-Parse-Application-Id":"w8RpxfKV4dvAI9B5mm3hDX0w1D995KKEcycW3sX8",
            "X-Parse-REST-API-Key":"pJlAQ67ALlzu4yAGXhsJptlbIl5kMUfHdqNNfVFV"
        },
        url = "https://api.parse.com/1/classes/Images";

    return {
        JSONImageData: JSONImageData,
        clickedSmallImage: clickedSmallImage,
        DESIGN_DIRECTORY: DESIGN_DIRECTORY,
        IMAGES_DIRECTORY: IMAGES_DIRECTORY,
        currentImage: currentImage,
        headers: headers,
        url: url
    }

})();
