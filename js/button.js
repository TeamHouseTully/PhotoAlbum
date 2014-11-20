var Button = (function () {

    var Button = (function () {
        function Button(buttonId) {
            this.setButtonId(buttonId);
        }

        Button.prototype.setButtonId = function (value) {
            this._buttonId = value;
        }

        Button.prototype.getButtonId = function () {
            return this._buttonId;
        }

        return Button;

    })();

    var Arrow = (function () {
        function Arrow(buttonId) {
            Button.call(this, buttonId);
        }

        Arrow.prototype = new Button();

        Arrow.prototype.createArrow = function () {
            var image = $('<img src="' +
            Constants.designDirectory + this._icon + ' title="' + this._type + '"" class="' + this._type +
            ' ' + this.getButtonId() + '" />');

            return image;
        }

        return Arrow;

    })();

    var LeftArrow = (function () {
        function LeftArrow(buttonId, imageId) {
            Arrow.call(this, buttonId, imageId);

            this.drawArrow();
        }

        LeftArrow.prototype = new Arrow();

        LeftArrow.prototype._type = 'leftArrow';

        LeftArrow.prototype._icon = 'LeftArrow.png';

        LeftArrow.prototype.drawArrow = function () {
            $('.bigImageLeftArrowHolder')
                .append('<span class="middleHelper"></span>' + '<img src="' +
                Constants.designDirectory + this._icon + '" title="' + this._type + '" class="' + this._type +
                ' ' + this.getButtonId() + '" />');
        }

        return LeftArrow;

    })();

    var RightArrow = (function () {
        function RightArrow(buttonId, imageId) {
            Arrow.call(this, buttonId, imageId);

            this.drawArrow();
        }

        RightArrow.prototype = new Arrow();

        RightArrow.prototype._type = 'rightArrow';

        RightArrow.prototype._icon = 'RightArrow.png';

        RightArrow.prototype.drawArrow = function () {
            $('.bigImageRightArrowHolder')
                .append('<span class="middleHelper"></span>' + '<img src="' +
                Constants.designDirectory + this._icon + '" title="' + this._type + '" class="' + this._type +
                ' ' + this.getButtonId() + '" />');
        }

        return RightArrow;

    })();

    return {
        Button: Button,
        Arrow: Arrow,
        LeftArrow: LeftArrow,
        RightArrow: RightArrow
    }

})();
