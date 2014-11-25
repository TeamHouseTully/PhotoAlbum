var Image = (function () {

    var SMALL_IMAGE_CONTAINER_CLASS = '.smallImageContainer',
        BIG_IMAGE_CONTAINER_CLASS = '.virtualImageHolder',
        SMALL_IMAGE_CLASS = 'smallImage',
        IMAGE_DIRECTORY = 'uploads/',
        BIG_IMAGE_CLASS = 'bigImage';

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
            $(SMALL_IMAGE_CONTAINER_CLASS)
                .filter("." + this.getImageId())
                .html($('<img class="' + SMALL_IMAGE_CLASS  + ' ' + this.getImageId() + '" />')
                        .filter('.' + this.getImageId())
                        .attr('src', IMAGE_DIRECTORY + this.imageType + '/' + this.getImageName())
            );
        }

        return SmallImage;

    })();

    var BigImage = (function () {
        function BigImage(name, id) {
            Image.apply(this, [name, id]);

            this.drawImage();
        }

        BigImage.prototype = new Image();

        BigImage.prototype.imageType = 'big';

        BigImage.prototype.drawImage = function () {
            $(BIG_IMAGE_CONTAINER_CLASS)
                .html($('<img class="' + BIG_IMAGE_CLASS + ' ' + this.getImageId() + '" />')
                        .attr('src', IMAGE_DIRECTORY + this.imageType + '/' + this.getImageName()))
                .prepend('<span class="middleHelper"></span>');

            new Container.AboveTheBigImage();
        }

        return BigImage;

    })();

    return {
        Image: Image,
        SmallImage: SmallImage,
        BigImage: BigImage
    }

})();