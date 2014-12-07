var ImageUploader = (function () {
    var reader,
        img,
        imgSmallerSide,
        imgBiggerSideName,
        diff,
        pixelsForCut,
        canvas,
        ctx;

    var UploadedImage = (function () {
        function UploadedImage(event) {
            new ImageUploader.OriginalImage(event);
            new ImageUploader.BigImage(event);
            new ImageUploader.MiddleImage(event);
            new ImageUploader.SmallImage(event);
        }

        UploadedImage.prototype._canvasId = '';

        return UploadedImage;
    })();

    var OriginalImage = (function () {
        function OriginalImage (event) {
            this.loadAndDraw(event);
        }

        OriginalImage.prototype._canvasId = 'imgCanvas';

        OriginalImage.prototype.loadAndDraw = function (event) {
            canvas = document.getElementById(this._canvasId);
            ctx = canvas.getContext('2d');

            reader = new FileReader();
            reader.onload = function (event) {
                img = new Image();
                img.onload = function () {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                }

                img.src = event.target.result;

                // img.src - Image to "base64"

            }
            reader.readAsDataURL(event.target.files[0]);
        }

        return OriginalImage;
    })();

    var BigImage = (function () {
        function BigImage (event) {
            this.loadAndDraw(event);
        }

        BigImage.prototype._canvasId = 'bigImageCanvas';

        BigImage.prototype.loadAndDraw = function (event) {
            canvas = document.getElementById(this._canvasId);
            ctx = canvas.getContext('2d');

            reader = new FileReader();
            reader.onload = function (event) {
                img = new Image();
                img.onload = function () {
                    imgSmallerSide = smallerSideOfImage(img.width, img.height);
                    canvas.width = imgSmallerSide;
                    canvas.height = imgSmallerSide;

                    pixelsForCut = (diff / 2) > 0 ? (diff / 2) * -1 : (diff / 2);

                    switch (imgBiggerSideName) {
                        case 'width':
                            ctx.drawImage(img, 0, 0, img.width, imgSmallerSide,
                                pixelsForCut, 0, img.width, imgSmallerSide);
                            break;
                        case 'height':
                            ctx.drawImage(img, 0, 0, imgSmallerSide, img.height,
                                0, pixelsForCut, imgSmallerSide, img.height);
                            break;
                        default:
                            ctx.drawImage(img, 0, 0, img.width, img.height,
                                0, 0, img.width, img.height);
                    }

                    // canvas.toDataURL("image/jpeg") - Image to "base64"

                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }

        return BigImage;
    }());


    var MiddleImage = (function () {
        function MiddleImage (event) {
            this.loadAndDraw(event);
        }

        MiddleImage.prototype._canvasId = 'middleImageCanvas';

        MiddleImage.prototype.loadAndDraw = function (event) {
            canvas = document.getElementById(this._canvasId);
            ctx = canvas.getContext('2d');

            var MIDDLE_IMAGE_SIDE = 300;

            reader = new FileReader();
            reader.onload = function (event) {
                img = new Image();
                img.onload = function () {
                    imgSmallerSide = smallerSideOfImage(img.width, img.height);
                    canvas.width = MIDDLE_IMAGE_SIDE;
                    canvas.height = MIDDLE_IMAGE_SIDE;

                    pixelsForCut = (diff < 0) ? ((diff * -1) / 2) : (diff / 2);

                    switch (imgBiggerSideName) {
                        case 'width':
                            ctx.drawImage(img, pixelsForCut, 0, imgSmallerSide, imgSmallerSide,
                                0, 0, MIDDLE_IMAGE_SIDE, MIDDLE_IMAGE_SIDE);
                            break;
                        case 'height':
                            ctx.drawImage(img, 0, pixelsForCut, imgSmallerSide, imgSmallerSide,
                                0, 0, MIDDLE_IMAGE_SIDE, MIDDLE_IMAGE_SIDE);
                            break;
                        default:
                            ctx.drawImage(img, 0, 0, imgSmallerSide, imgSmallerSide,
                                0, 0, imgSmallerSide, imgSmallerSide);
                    }

                    // canvas.toDataURL("image/jpeg") - Image to "base64"

                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }

        return MiddleImage;
    }());


    var SmallImage = (function () {
        function SmallImage (event) {
            this.loadAndDraw(event);
        }

        SmallImage.prototype._canvasId = 'smallImageCanvas';

        SmallImage.prototype.loadAndDraw = function (event) {
            canvas = document.getElementById(this._canvasId);
            ctx = canvas.getContext('2d');

            var SMALL_IMAGE_SIDE = 100;

            reader = new FileReader();
            reader.onload = function (event) {
                img = new Image();
                img.onload = function () {
                    imgSmallerSide = smallerSideOfImage(img.width, img.height);
                    canvas.width = SMALL_IMAGE_SIDE;
                    canvas.height = SMALL_IMAGE_SIDE;

                    pixelsForCut = (diff < 0) ? ((diff * -1) / 2) : (diff / 2);

                    switch (imgBiggerSideName) {
                        case 'width':
                            ctx.drawImage(img, pixelsForCut, 0, imgSmallerSide, imgSmallerSide,
                                0, 0, SMALL_IMAGE_SIDE, SMALL_IMAGE_SIDE);
                            break;
                        case 'height':
                            ctx.drawImage(img, 0, pixelsForCut, imgSmallerSide, imgSmallerSide,
                                0, 0, SMALL_IMAGE_SIDE, SMALL_IMAGE_SIDE);
                            break;
                        default:
                            ctx.drawImage(img, 0, 0, imgSmallerSide, imgSmallerSide,
                                0, 0, imgSmallerSide, imgSmallerSide);
                    }

                    // canvas.toDataURL("image/jpeg") - Image to "base64"

                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }

        return SmallImage;
    })();


    var smallerSideOfImage = function (width, height) {
        diff = width - height;
        var smallerSide;

        if (diff > 0) {
            smallerSide = height;
            imgBiggerSideName = 'width';
        }
        else {
            smallerSide = width;

            imgBiggerSideName = 'height';

            if (!diff) {
                imgBiggerSideName = 'even';
            }
        }

        return smallerSide;
    }

    return {
        UploadedImage: UploadedImage,
        OriginalImage: OriginalImage,
        BigImage: BigImage,
        MiddleImage: MiddleImage,
        SmallImage: SmallImage
    }
})();