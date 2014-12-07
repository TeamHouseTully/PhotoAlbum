var ImageUploader = (function () {
    var HandleImage = (function () {
        function HandleImage(event, canvas, ctx) {
            this.reader(event, canvas, ctx);
        }

        HandleImage.prototype.reader = function (event, canvas, ctx) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var img = new Image();
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }

        return HandleImage;
    })();


    return {
        HandleImage: HandleImage
    }
})();