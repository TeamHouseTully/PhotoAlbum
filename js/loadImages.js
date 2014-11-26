var ImageLoader = (function () {
    var ImageSelector = (function () {
        function ImageSelector () {
            this.selectImages();

            $(document).ajaxComplete(function () {
                new ImageLoader.LoadImages();
            });
        }

        ImageSelector.prototype.selectImages = function () {
            $.ajax({
                url: "selectAllImages.php",
                success: function (result) {
                    GeneralVariables.JSONImageData = JSON.parse(result);
                }
            });
        }

        return ImageSelector;
    })();


    var LoadImages = (function () {
        function LoadImages() {
            this.mountImage();
        }

        LoadImages.prototype.mountImage = function () {
            for (var i = 0; i < GeneralVariables.JSONImageData.length; i++) {
                new Container.SmallImageContainer(i);

                new Image.SmallImage(GeneralVariables.JSONImageData[i].imagename, i);
            }
        }

        return LoadImages;
    })();


    return {
        ImageSelector: ImageSelector,
        LoadImages: LoadImages
    }
})();
