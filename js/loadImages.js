var ImageLoader = (function () {
    var PARSE_APP_ID = "w8RpxfKV4dvAI9B5mm3hDX0w1D995KKEcycW3sX8";
    var PARSE_REST_API_KEY = "pJlAQ67ALlzu4yAGXhsJptlbIl5kMUfHdqNNfVFV";
    var ImageSelector = (function () {
        function ImageSelector() {
            this.getImagesFromDataBase();

            $(document).ajaxComplete(function () {
                new ImageLoader.ImageMounter();
                new Container.BigImageContainer(0);
                new Event.ShowHideVirtualBackground();
                new Event.SlideImage();
            });
        }

        ImageSelector.prototype.getImagesFromDataBase = function () {
            $.ajax({
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                url: "https://api.parse.com/1/classes/Images"
            }).success(function(data) {
                GeneralVariables.JSONImageData = data.results;
            }).error(function() {
                alert('Cannot load countries.');
            });
        };

        return ImageSelector;

    })();

    var ImageMounter = (function () {
        function ImageMounter() {
            this.mountImage();
        }

        ImageMounter.prototype.mountImage = function () {
            for (var i = 0; i < GeneralVariables.JSONImageData.length; i++) {
                var url = GeneralVariables.JSONImageData[i].Thumbnail.url;
                var url2 = GeneralVariables.JSONImageData[i].Image.url;
                if(url!== undefined && url!=null){
                    new Container.SmallImageContainer(i);
                    new Container.BigImageContainer(i);
                    new Image.SmallImage(url, i);
                    new Image.BigImage(url2,i)
                }
            }
        };

        return ImageMounter;

    })();

    return {
        ImageSelector: ImageSelector,
        ImageMounter: ImageMounter
    }

})();
