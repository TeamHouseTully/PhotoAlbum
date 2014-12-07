$(function() {
    var URL = "https://api.parse.com/1/login";
    var PARSE_APP_ID = "w8RpxfKV4dvAI9B5mm3hDX0w1D995KKEcycW3sX8";
    var PARSE_REST_API_KEY = "pJlAQ67ALlzu4yAGXhsJptlbIl5kMUfHdqNNfVFV";
    $('#submit').click(login);

    function login() {
        var username = validateData($('input[id="userName"]').val());
        var password = $('input[id="password"]').val();

        if(username) {
            $.ajax({
                type: "GET",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
                },
                data: {username: username, password: password},
                url: URL,
                success: loginSuccessful,
                error: errorFunction
            });
        } else {
            alert('You cannot use this username to log on.');
        }
    }
});
