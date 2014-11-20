var Event = (function () {

    var ShowHideVirtualBackground = (function () {
        function ShowHideVirtualBackground() {
            this.showVirtualBackground();
            this.hideVirtualBackground();
        }

        ShowHideVirtualBackground.prototype.showVirtualBackground = function () {
            $('.smallImage').on('click', function () {
                $('.virtualBackground').show();
                new Event.LoadVirtualImage($(this).attr('class').split(' ')[1]);

                Constants.currentImage = parseInt($(this).attr('class').split(' ')[1]);
            });
        }

        ShowHideVirtualBackground.prototype.hideVirtualBackground = function () {
            $(document).on('click', function (event) {
                if (event.target.className.split(' ')[0] == 'virtualImageHolder') {
                    $('.virtualBackground').hide();
                }
            });
        }

        return ShowHideVirtualBackground ;

    })();

    var LoadVirtualImage = (function () {
        function LoadVirtualImage(imageId) {
            this.setImageId(imageId);
            this.setImageName();

            this.appendImage();
        }

        LoadVirtualImage.prototype.setImageName = function () {
            this._imageName = Constants.JSONImageData[this.getImageId()].imagename;
        }

        LoadVirtualImage.prototype.getImageName = function () {
            return this._imageName;
        }

        LoadVirtualImage.prototype.appendImage = function () {
            new Image.BigImage(this.getImageName(), this.getImageId());
        }

        LoadVirtualImage.prototype.setImageId = function (value) {
            this._imageId = value;
        }

        LoadVirtualImage.prototype.getImageId = function () {
            return this._imageId;
        }

        return LoadVirtualImage;

    })();

    var SlideImage = (function () {
        function SlideImage() {
            this.nextImage();
            this.prevImage();
            this.leftArrowOpacity();
            this.rightArrowOpacity();
        }

        SlideImage.prototype.prevImage = function () {
            $(".leftArrow, .bigImageLeftArrowHolder")
                .on('click', function () {
                Constants.currentImage = isNaN(Constants.currentImage) ? '' :
                    Constants.currentImage ? --Constants.currentImage :
                        Constants.JSONImageData.length - 1;

                new Image.BigImage(Constants.JSONImageData[Constants.currentImage].imagename, Constants.currentImage);

                $(this)
                    .data('prevImage', Constants.currentImage - 1 < 0 ?
                    Constants.JSONImageData.length - 1 : Constants.currentImage - 1);
            });
        }

        SlideImage.prototype.nextImage = function () {
            $(".rightArrow, .bigImageRightArrowHolder, .bigImageCenter")
                .on('click', function () {
                Constants.currentImage = isNaN(Constants.currentImage) ? '' :
                    Constants.currentImage >= Constants.JSONImageData.length - 1 ?
                        0 : ++Constants.currentImage;

                new Image.BigImage(Constants.JSONImageData[Constants.currentImage].imagename, Constants.currentImage);

                $(this)
                    .data('nextImage', Constants.currentImage + 1 <=
                    Constants.JSONImageData.length - 1 ? Constants.currentImage + 1 : 0);
            });
        }

        SlideImage.prototype.rightArrowOpacity = function () {
            $(".rightArrow, .bigImageRightArrowHolder, .bigImageCenter")
                .on('mouseover', function () {
                    $(".rightArrow").css("opacity", 0.9);
                })
                .on('mouseout', function () {
                    $(".rightArrow").css("opacity", 0.4);
                });
        }

        SlideImage.prototype.leftArrowOpacity = function () {
            $(".leftArrow, .bigImageLeftArrowHolder")
                .on('mouseover', function () {
                    $(".leftArrow").css("opacity", 0.9);
                })
                .on('mouseout', function () {
                    $(".leftArrow").css("opacity", 0.4);
                });
        }

        return SlideImage;

    })();

    return {
        ShowHideVirtualBackground : ShowHideVirtualBackground,
        LoadVirtualImage: LoadVirtualImage,
        SlideImage: SlideImage
    }

})();
