var Event = (function () {
    var LoadImage = (function () {
        function LoadImage() {
            this.selectFile();
        }

        LoadImage.prototype.selectFile = function () {
            $('#JSUploadFile').on('change', function (event) {
                new ImageUploader.UploadedImage(event);
            });
        }

        return LoadImage;
    })();


    return {
        LoadImage: LoadImage
    }
})();