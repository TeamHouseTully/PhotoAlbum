(function () {
    $(document).ready(function () {
        new ImageLoader.ImageSelector();
    });

    function validateData(input) {
        var splChars = "*|,\":<>[]{}`\';()@&$#%";
        for (var i = 0; i < input.length; i++) {
            if (splChars.indexOf(input.charAt(i)) != -1) {
                return undefined;
            }
        }
        return input;
    }
})();
