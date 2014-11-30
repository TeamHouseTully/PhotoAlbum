var ImageLoader = (function () {

    var ImageSelector = (function () {
        function ImageSelector() {
            if (sessionStorage.getObj('JSONImageData')) {
                GeneralVariables.JSONImageData = sessionStorage.getObj('JSONImageData');

                new ImageLoader.ImageMounter();
                new Container.BigImageContainer(0);
                new Event.ShowHideVirtualBackground();
            }
            else {
                this.getImagesFromDataBase();

                $(document).ajaxComplete(function () {
                    new ImageLoader.ImageMounter();
                    new Container.BigImageContainer(0);
                    new Event.ShowHideVirtualBackground();
                });
            }
            console.log(sessionStorage.getObj('JSONImageData'));
        }

        ImageSelector.prototype.getImagesFromDataBase = function () {
            $.ajax({
                method: "GET",
                headers: GeneralVariables.headers,
                url: GeneralVariables.url
            }).success(function(data) {
                GeneralVariables.JSONImageData = data.results;

                sessionStorage.setObj('JSONImageData', GeneralVariables.JSONImageData);
            }).error(function() {
                alert('Cannot load images.');
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

                if(url) {
                    new Container.SmallImageContainer(i);
                    new Image.SmallImage(url, i);
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
