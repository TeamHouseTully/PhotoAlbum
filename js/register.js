$(function() {

    var URL = "https://api.parse.com/1/users";
    var PARSE_APP_ID = "w8RpxfKV4dvAI9B5mm3hDX0w1D995KKEcycW3sX8";
    var PARSE_REST_API_KEY = "pJlAQ67ALlzu4yAGXhsJptlbIl5kMUfHdqNNfVFV";
    $('#submit').click(register);

    function register() {
        var username = validateData($('input[id="userName"]').val());
        var password = $('input[id="password"]').val();
        var secondPass = $('input[id="repeatPassword"]').val();
        var email = validateData($('input[id="email"]').val());

        if(password === secondPass && username && email){
            $.ajax({
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": PARSE_APP_ID,
                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY,
                    "Content-Type": 'application/json'
                },
                data: JSON.stringify({
                    "username": username,
                    "password": password,
                    "email": email,
                    "ACL": {'*':{'read': true}}
                }),
                url: "https://api.parse.com/1/users",
                success: registrationSuccessful,
                error: errorFunction
            });
        }else{
            alert('Invalid username, password or email. Please try again.');
        }
    }
});