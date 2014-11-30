var Image = (function () {
    var smallImageContainerClass = '.smallImageContainer',
        bigImageContainerClass = '.virtualImageHolder',
        smallImageClass = 'smallImage',
        bigImageClass = 'bigImage';


    var Image = (function () {
        function Image (name, id) {
            /*if (this.constructor === Image) {
             throw new Error('Cannot instantiate abstract class Image.');
             }*/
            this.setImageName(name);
            this.setImageId(id);
        }

        Image.prototype.setImageName = function (value) {
            this._imageName = value;
        }

        Image.prototype.getImageName = function () {
            return this._imageName;
        }

        Image.prototype.setImageId = function (value) {
            this._imageId = value;
        }

        Image.prototype.getImageId = function () {
            return this._imageId;
        }

        return Image;
    })();


    var SmallImage = (function () {
        function SmallImage(name, id) {
            Image.apply(this, [name, id]);
            this.drawImage();
        }

        SmallImage.prototype = new Image();

        SmallImage.prototype.imageType = 'small';

        SmallImage.prototype.drawImage = function () {
            $(smallImageContainerClass)
                .filter("." + this.getImageId())
                .html('<img class="' + smallImageClass + ' ' + this.getImageId() + '" />');
            $('.' + smallImageClass)
                .filter('.' + this.getImageId())
                .attr('src',this.getImageName());
        }

        return SmallImage;
    })();


    var BigImage = (function () {
        var bigImageWidth,
            bigImageHeight;

        function BigImage(name, id) {
            Image.apply(this, [name, id]);
            this.drawImage();
        }

        BigImage.prototype = new Image();

        BigImage.prototype.imageType = 'big';

        BigImage.prototype.drawArrowsContainer = function () {
            $(".bigImage").on('load', function () {
                bigImageWidth = $(this).css("width");
                bigImageHeight = $(this).css("height");

                $('.aboveTheBigImage')
                    .css('width', bigImageWidth)
                    .css('height', bigImageHeight);
            });

            $(window).on('resize', function () {
                bigImageWidth = $(".bigImage").css("width");
                bigImageHeight = $(".bigImage").css("height");

                $('.aboveTheBigImage')
                    .css('width', bigImageWidth)
                    .css('height', bigImageHeight);
            });
        }

        BigImage.prototype.drawImage = function () {
            $(bigImageContainerClass)
                .html('<span class="middleHelper"></span><img class="' + bigImageClass + ' ' +
                this.getImageId() + '" />');

            $('.' + bigImageClass)
                .attr('src', this.getImageName());

            this.drawArrowsContainer();
        }

        return BigImage;
    })();

    return {
        Image: Image,
        SmallImage: SmallImage,
        BigImage: BigImage
    }
})();
