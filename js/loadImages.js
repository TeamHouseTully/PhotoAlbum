var ImageLoader = (function () {

    var stringImageData;

    var ImageSelector = (function () {
        function ImageSelector() {
            this.getImagesFromDataBase();

            $(document).ajaxComplete(function () {
                Constants.JSONImageData = JSON.parse(stringImageData);

                new ImageLoader.ImageMounter();
                new Container.BigImageContainer(0);
                new Event.ShowHideVirtualBackground();
                new Event.SlideImage();
            });
        }

        ImageSelector.prototype.getImagesFromDataBase = function () {
            $.ajax({
                url: 'selectAllImages.php',
                success: function (result) {
                    stringImageData = result;
                }
            });
        }

        return ImageSelector;

    })();

    var ImageMounter = (function () {
        function ImageMounter() {
            this.mountImage();
        }

        ImageMounter.prototype.mountImage = function () {
            for (var i = 0; i < Constants.JSONImageData.length; i++) {
                new Container.SmallImageContainer(i);

                new Image.SmallImage(Constants.JSONImageData[i].imagename, i);
            }
        }

        return ImageMounter;

    })();

    return {
        ImageSelector: ImageSelector,
        ImageMounter: ImageMounter
    }

})();