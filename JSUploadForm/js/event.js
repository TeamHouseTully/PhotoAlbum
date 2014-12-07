var Event = (function () {
    var LoadImage = (function () {
        function LoadImage() {
            this.selectFile();
        }

        LoadImage.prototype.selectFile = function () {
            $('#JSUploadFile').on('change', function (event) {
                var canvas = document.getElementById('imgCanvas');
                var ctx = canvas.getContext('2d');
                new ImageUploader.HandleImage(event, canvas, ctx);
            });
        }

        return LoadImage;
    })();
    return {
        LoadImage: LoadImage
    }
})();