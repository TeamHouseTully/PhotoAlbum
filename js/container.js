var Container = (function () {
    var MEDIUM_IMAGES_CONTAINER_CLASS_NAME = 'mediumImageContainer';

    var Container = (function () {
        function Container (containerId) {
            //if (this.constructor === Image) {
            //    throw new Error('Cannot instantiate abstract class Image.');
            //}
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
        function SmallImageContainer(containerId, appendTo) {
            Container.call(this, containerId);

            this.appendContainer(appendTo);
        }

        SmallImageContainer.prototype = new Container();

        var smallImageHolderClass = 'horizontalSliderSmallImageHolder';

        SmallImageContainer.prototype.appendContainer = function (appendTo) {
            $(appendTo)
                .append($('<span class="' + smallImageHolderClass + ' ' + this.getContainerId() +
                '"></span>')
                    .css({width: '100px'}));
        }

        return SmallImageContainer;
    })();


    var MediumImageContainer = (function () {
        function MediumImageContainer(containerId, appendTo) {
            Container.call(this, containerId);

            this.appendContainer(appendTo);
        }

        MediumImageContainer.prototype = new Container();

        MediumImageContainer.prototype.appendContainer = function (appendTo) {
            $(appendTo)
                .append('<span class="' + MEDIUM_IMAGES_CONTAINER_CLASS_NAME + ' ' +
                this.getContainerId() + '"></span>');
        }

        return MediumImageContainer;
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
                    .append('<div class="closeVirtualImage"></div>'));

            new Button.Cross(0);
        }

        return BigImageContainer;
    })();


    var HorizontalSliderContainer = (function () {
        function HorizontalSliderContainer (containerId, appendTo, JSONImages) {
            Container.call(this, containerId);

            HorizontalSliderVariables.JSONImages = JSONImages;
            this.generateBody(appendTo);
            this.arrowHolders();
            this.imagesHolder();
            this.remakeEndIndex();
        }

        HorizontalSliderContainer.prototype = new Container();

        HorizontalSliderContainer.prototype.generateBody = function (appendTo) {
            if (!$('.' + HorizontalSliderSelectors.SLIDER_BODY_CLASS).length) {
                $(appendTo)
                    .append($('<div class="' + HorizontalSliderSelectors.SLIDER_BODY_CLASS + '"></div>'));
            }
        }

        HorizontalSliderContainer.prototype.arrowHolders = function () {
            $('.' + HorizontalSliderSelectors.SLIDER_BODY_CLASS)
                .append('<span class="' + HorizontalSliderSelectors.LEFT_ARROW_CLASS + '">' +
                '<img class="' + HorizontalSliderSelectors.LEFT_ARROW_IMAGE_CLASS  + '" src="' +
                GeneralVariables.DESIGN_DIRECTORY + 'LeftArrow.png" /></span>')
                .append('<span class="' + HorizontalSliderSelectors.RIGHT_ARROW_CLASS + '">' +
                '<img class="' + HorizontalSliderSelectors.RIGHT_ARROW_IMAGE_CLASS  + '" src="' +
                GeneralVariables.DESIGN_DIRECTORY + 'RightArrow.png" /></span>');
        }

        HorizontalSliderContainer.prototype.imagesHolder = function () {
            imagesHolderData();

            $('.' + HorizontalSliderSelectors.LEFT_ARROW_CLASS)
                .after($('<div class="' + HorizontalSliderSelectors.IMAGES_HOLDER_CLASS + '"></div>')
                    .css('width', HorizontalSliderVariables.smallImagesHolderWidth));

            $(window).on('resize', function () {
                imagesHolderData();

                $('<div class="' + HorizontalSliderSelectors.IMAGES_HOLDER_CLASS + '"></div>')
                        .css('width', HorizontalSliderVariables.smallImagesHolderWidth);
            });
        }

        var imagesHolderData = function () {
            HorizontalSliderVariables.bodyWidth =
                $('.' + HorizontalSliderSelectors.SLIDER_BODY_CLASS).css('width');
            HorizontalSliderVariables.arrowHolderWidth =
                $('.' + HorizontalSliderSelectors.LEFT_ARROW_CLASS).css('width');
            HorizontalSliderVariables.arrowHoldersWidth =
                2 * parseInt(HorizontalSliderVariables.arrowHolderWidth);
            HorizontalSliderVariables.smallImagesHolderWidth =
                parseInt(HorizontalSliderVariables.bodyWidth) -
                (HorizontalSliderVariables.arrowHoldersWidth) - 1;
            HorizontalSliderVariables.smallImagesCount =
                parseInt(HorizontalSliderVariables.smallImagesHolderWidth / 100);
        }

        HorizontalSliderContainer.prototype.remakeEndIndex = function () {
            endIndexLogic();

            $(window).on('resize', function () {
                endIndexLogic();
            });
        }

        var endIndexLogic = function () {
            HorizontalSliderVariables.endIndex = HorizontalSliderVariables.startIndex || 0 +
                HorizontalSliderVariables.smallImagesCount;
        }

        return HorizontalSliderContainer;
    })();


    return {
        Container: Container,
        SmallImageContainer: SmallImageContainer,
        MediumImageContainer: MediumImageContainer,
        BigImageContainer: BigImageContainer,
        HorizontalSliderContainer: HorizontalSliderContainer
    }
})();