var ImageLoader = (function () {

    var ImageSelector = (function () {
        function ImageSelector() {
            if (sessionStorage.getObj('JSONImageData')) {
                GeneralVariables.JSONImageData = sessionStorage.getObj('JSONImageData');

                // new Container.HorizontalSliderContainer(0, 'body', GeneralVariables.JSONImageData);
                new Event.HorizontalSliderSizes();
                new ImageLoader.ImageMounter();
                new Container.BigImageContainer(0);
                new Event.ShowHideVirtualBackground();
            }
            else {
                this.getImagesFromDataBase();

                $(document).ajaxComplete(function () {
                    // new Container.HorizontalSliderContainer(0, 'body', GeneralVariables.JSONImageData);
                    new Event.HorizontalSliderSizes();
                    new ImageLoader.ImageMounter();
                    new Container.BigImageContainer(0);
                    new Event.ShowHideVirtualBackground();
                });
            }
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
        var i,
            url;

        function ImageMounter() {
            this.mountImage();
            HorizontalSliderVariables.buildSmallImages();
        }

        ImageMounter.prototype.mountImage = function () {
            for (i = 0; i < GeneralVariables.JSONImageData.length; i++) {
                url = GeneralVariables.JSONImageData[i].Thumbnail.url;

                if(url) {
                    new Container.MediumImageContainer(i, '.imagesHolder');
                    new Image.MediumImage(url, i);
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