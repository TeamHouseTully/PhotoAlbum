var Container = (function () {

    var APPEND_TO_CLASS_NAME = 'imagesHolder',
        SMALL_IMAGES_CONTAINER_CLASS_NAME = 'smallImageContainer';

    var Container = (function () {
        function Container (containerId) {
            /*if (this.constructor === Image) {
                throw new Error('Cannot instantiate abstract class Image.');
            }*/

            this.setContainerId(containerId);
        }

        Container.prototype.setContainerId = function (value) {
            this._containerId = value;
        }

        Container.prototype.getContainerId = function () {
            return this._containerId;
        }

        return Container;

    })();

    var SmallImageContainer = (function () {
        function SmallImageContainer(containerId) {
            Container.call(this, containerId);

            this.appendContainer();
        }

        SmallImageContainer.prototype = new Container();

        SmallImageContainer.prototype.appendContainer = function () {
            $("." + APPEND_TO_CLASS_NAME)
                .append('<span class="' + SMALL_IMAGES_CONTAINER_CLASS_NAME + ' ' + this.getContainerId() +
                '"></span>');
        }

        return SmallImageContainer;

    })();

    var BigImageContainer = (function () {
        function BigImageContainer(containerId) {
            Container.call(this, containerId);

            this.createVirtualBackground();
            this.createVirtualImageHolder();

            new Button.LeftArrow(0);
            new Button.RightArrow(0);
        }

        BigImageContainer.prototype = new Container();

        BigImageContainer.prototype.createVirtualBackground = function () {
            $("body")
                .append('<div class="virtualBackground"></div>');
        }

        BigImageContainer.prototype.createVirtualImageHolder = function () {
            $(".virtualBackground")
                .append('<div class="virtualImageHolder ' + this.getContainerId() + '"></div>')
                .prepend('<div class="aboveTheBigImage"></div>')
                .hide();

            $('.aboveTheBigImage')
                .append('<div class="bigImageLeftArrowHolder"></div>')
                .append('<div class="bigImageCenter"></div>')
                .append(
                    $('<div class="bigImageRightArrowHolder"></div>')
                        .append($('<div class="closeVirtualImage"></div>')
                            .append($('<img src="' + GeneralVariables.DESIGN_DIRECTORY + 'Cross.png" title="Close" />')
                        )
                    ));
        }

        return BigImageContainer;

    })();

    return {
        Container: Container,
        SmallImageContainer: SmallImageContainer,
        BigImageContainer: BigImageContainer
    }

})();