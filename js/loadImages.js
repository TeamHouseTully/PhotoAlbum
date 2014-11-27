var ImageLoader = (function () {

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
                url: 'selectAllImages.php',
                success: function (result) {
                    GeneralVariables.JSONImageData = JSON.parse(result);
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
            for (var i = 0; i <  GeneralVariables.JSONImageData.length; i++) {
                new Container.SmallImageContainer(i);

                new Image.SmallImage(GeneralVariables.JSONImageData[i].imagename, i);
            }
        }

        return ImageMounter;

    })();

    return {
        ImageSelector: ImageSelector,
        ImageMounter: ImageMounter
    }

})();
