Storage.prototype.setObj = function (key, obj) {
    this.setItem(key, JSON.stringify(obj));
}

Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key));
}

var GeneralVariables = (function () {

    var JSONImageData,
        clickedSmallImage,
        currentImage,
        IMAGES_DIRECTORY = 'uploads/',
        DESIGN_DIRECTORY = 'design/',
        headers = {
            "X-Parse-Application-Id":"w8RpxfKV4dvAI9B5mm3hDX0w1D995KKEcycW3sX8",
            "X-Parse-REST-API-Key":"pJlAQ67ALlzu4yAGXhsJptlbIl5kMUfHdqNNfVFV"
        },
        url = "https://api.parse.com/1/classes/Images";

    return {
        JSONImageData: JSONImageData,
        clickedSmallImage: clickedSmallImage,
        DESIGN_DIRECTORY: DESIGN_DIRECTORY,
        IMAGES_DIRECTORY: IMAGES_DIRECTORY,
        currentImage: currentImage,
        headers: headers,
        url: url
    }

})();

var HorizontalSliderVariables = (function () {
    var bodyWidth,
        arrowHolderWidth,
        smallImagesCount,
        startIndex = 0,
        endIndex,
        JSONImages,
        smallImagesHolderWidth,
        arrowHoldersWidth,
        buildSmallImages = function () {
            $('.' + HorizontalSliderSelectors.IMAGES_HOLDER_CLASS).empty();

            new Container.HorizontalSliderContainer(0, 'body', GeneralVariables.JSONImageData);

            HorizontalSliderVariables.setSmallImagesSizes();

            for (var i = (HorizontalSliderVariables.startIndex || 0);
                 i < (HorizontalSliderVariables.startIndex || 0) +
                 HorizontalSliderVariables.smallImagesCount; i++) {
                new Container.SmallImageContainer(i, '.' + HorizontalSliderSelectors.IMAGES_HOLDER_CLASS);
                new Image.SmallImage(HorizontalSliderVariables.JSONImages[i].Thumbnail.url,
                    i, '.' + HorizontalSliderSelectors.SMALL_IMAGES_HOLDER_CLASS);
            }
        },
        setSmallImagesSizes = function () {
            HorizontalSliderVariables.bodyWidth =
                $('.' + HorizontalSliderSelectors.SLIDER_BODY_CLASS)
                    .css('width');

            HorizontalSliderVariables.arrowHolderWidth =
                parseInt(HorizontalSliderVariables.arrowHolderWidth) * 2;

            $('.' + HorizontalSliderSelectors.IMAGES_HOLDER_CLASS)
                .css('width', parseInt(HorizontalSliderVariables.bodyWidth) -
                (HorizontalSliderVariables.arrowHoldersWidth + 1));
        };

    return {
        bodyWidth: bodyWidth,
        arrowHolderWidth: arrowHolderWidth,
        smallImagesCount: smallImagesCount,
        startIndex: startIndex,
        endIndex: endIndex,
        JSONImages: JSONImages,
        smallImagesHolderWidth: smallImagesHolderWidth,
        arrowHoldersWidth: arrowHoldersWidth,
        buildSmallImages: buildSmallImages,
        setSmallImagesSizes: setSmallImagesSizes
    }

})();

var HorizontalSliderSelectors = (function () {
    var SLIDER_BODY_CLASS = 'horizontalSliderBody',
        IMAGES_HOLDER_CLASS = 'horizontalSliderImagesHolder',
        LEFT_ARROW_CLASS = 'horizontalSliderLeftArrowHolder',
        RIGHT_ARROW_CLASS = 'horizontalSliderRightArrowHolder',
        LEFT_ARROW_IMAGE_CLASS = 'horizontalSliderLeftArrowImage',
        RIGHT_ARROW_IMAGE_CLASS = 'horizontalSliderRightArrowImage',
        SMALL_IMAGES_HOLDER_CLASS = 'horizontalSliderSmallImageHolder';

    return {
        SLIDER_BODY_CLASS: SLIDER_BODY_CLASS,
        IMAGES_HOLDER_CLASS: IMAGES_HOLDER_CLASS,
        LEFT_ARROW_CLASS: LEFT_ARROW_CLASS,
        RIGHT_ARROW_CLASS: RIGHT_ARROW_CLASS,
        LEFT_ARROW_IMAGE_CLASS: LEFT_ARROW_IMAGE_CLASS,
        RIGHT_ARROW_IMAGE_CLASS: RIGHT_ARROW_IMAGE_CLASS,
        SMALL_IMAGES_HOLDER_CLASS: SMALL_IMAGES_HOLDER_CLASS
    }
})();