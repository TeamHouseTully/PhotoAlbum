var ImageLoader = (function () {

    var JSONImageData,
        stringImageData;

    var ImageSelector = (function () {
        function ImageSelector() {
            this.getImagesFromDataBase();

            $(document).ajaxComplete(function () {
                var ImageLoad = new ImageLoader.ImageMounter();

                Constants.JSONImageData = JSON.parse(ImageLoad.getStringifyImageData());

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

        ImageMounter.prototype.arrImages = function () {
            JSONImageData = JSON.parse(stringImageData);

            return JSONImageData;
        }

        ImageMounter.prototype.getStringifyImageData = function () {
            return stringImageData;
        }

        ImageMounter.prototype.mountImage = function () {
            for (var i = 0; i < this.arrImages().length; i++) {
                new Container.SmallImageContainer(i);

                new Image.SmallImage(this.arrImages()[i].imagename, i);
            }
        }

        return ImageMounter;

    })();

    return {
        ImageSelector: ImageSelector,
        ImageMounter: ImageMounter
    }

})();
