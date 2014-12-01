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

    var Cross = (function () {
        function Cross (buttonId) {
            Button.call(this, buttonId);

            this.drawCross();
        }

        Cross.prototype = new Button();

        Cross.prototype._type = 'Cross';

        Cross.prototype._icon = 'Cross.png';

        Cross.prototype.drawCross = function () {
            $('.closeVirtualImage')
                .append($('<img src="' + GeneralVariables.DESIGN_DIRECTORY + 'Cross.png" class="' + this._type + ' ' +
                this.getButtonId() + '" title="Close" />'));
        }

        return Cross;
    })();

    var Arrow = (function () {
        function Arrow(buttonId) {
            Button.call(this, buttonId);
        }

        Arrow.prototype = new Button();

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
                GeneralVariables.DESIGN_DIRECTORY + this._icon + '" title="' + this._type + '" class="' + this._type +
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
                GeneralVariables.DESIGN_DIRECTORY + this._icon + '" title="' + this._type + '" class="' + this._type +
                ' ' + this.getButtonId() + '" />');
        }

        return RightArrow;

    })();

    return {
        Button: Button,
        Arrow: Arrow,
        LeftArrow: LeftArrow,
        Cross: Cross,
        RightArrow: RightArrow
    }

})();