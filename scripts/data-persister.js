var app = app || {};

app.dataPersister = (function () {

    function Persister(rootUrl) {
        this.rootUrl = rootUrl;
        this.classItems = new ClassItems(rootUrl);
        this.images = new Images(rootUrl);
        this.albums = new Albums(rootUrl);
        this.users = new Users(rootUrl);
        this.validation = new Validation();
    }

    var userDataStorage = (function() {
        var headers = {
            'X-Parse-Application-Id': 'w8RpxfKV4dvAI9B5mm3hDX0w1D995KKEcycW3sX8',
            'X-Parse-REST-API-Key': 'pJlAQ67ALlzu4yAGXhsJptlbIl5kMUfHdqNNfVFV',
            'X-Parse-Session-Token': getSessionToken()
        };

        function setSessionToken(sessionToken) {
            localStorage.setItem('sessionToken', sessionToken);
        }

        function getSessionToken(sessionToken) {
            return localStorage.getItem('sessionToken');
        }

        function setUserName(userName) {
            localStorage.setItem('userName', userName);
        }

        function getUserName() {
            return localStorage.getItem('userName')
        }

        function setUserObjectId(objectId) {
            localStorage.setItem('userObjectId', objectId);
        }

        function getUserObjectId() {
            return localStorage.getItem('userObjectId');
        }

        function getHeaders() {
            return headers;
        }

        return {
            getHeaders: getHeaders,
            getUserName: getUserName,
            getSessionToken: getSessionToken,
            setUserName: setUserName,
            setSessionToken: setSessionToken,
            setUserObjectId: setUserObjectId,
            getUserObjectId: getUserObjectId
        }
    }());

    var ClassItems = (function () {

        function ClassItems(rootUrl){
            this.serviceUrl = rootUrl;
        }

        ClassItems.prototype.getSingle = function (id, success, error) {
            return ajaxRequester.get(this.serviceUrl + id, success, error);
        };

        ClassItems.prototype.getAll = function (success, error) {
            return ajaxRequester.get(this.serviceUrl, success, error);
        };

        ClassItems.prototype.add = function (data, success, error) {
            return ajaxRequester.post(this.serviceUrl, data, success, error);
        };

        ClassItems.prototype.delete = function (id, success, error) {
            return ajaxRequester.delete(this.serviceUrl + id,  success, error);
        };

        ClassItems.prototype.put = function (id, data, success, error) {
            return ajaxRequester.put(this.serviceUrl + id, data,  success, error);
        };

        return ClassItems;
    }());


    var Images = (function () {
        function Images(rootUrl) {
            this.serviceUrl = rootUrl + 'Images/';
        }

        Images.prototype = new ClassItems();

        Images.prototype.getByAlbum = function (data,success,error){
            return ajaxRequester.getOption(this.serviceUrl,data, success, error);
        };

        return Images;
    }());

    var Albums = (function () {
        function Albums(rootUrl) {
            this.serviceUrl = rootUrl + 'Albums/';
        }

        Albums.prototype = new ClassItems();

        return Albums;
    }());


    var Users = (function(){
        var error = function() {
            showNoty('Something went wrong. Please try again!', 'error', 'topCenter');
        };
        var _headers = {
            'X-Parse-Application-Id': 'w8RpxfKV4dvAI9B5mm3hDX0w1D995KKEcycW3sX8',
            'X-Parse-REST-API-Key': 'pJlAQ67ALlzu4yAGXhsJptlbIl5kMUfHdqNNfVFV'
        };

        function Users(rootUrl){
            this.serviceUrl = rootUrl ;
        }

        Users.prototype = new ClassItems();

        Users.prototype.login = function(username,password){
            var success = function(data) {
                //var data = data.results;
                //localStorage.setItem('sessionToken', data.result);
                showNoty('Login successful!', 'success', 'topCenter');
            };
            var url = "https://api.parse.com/1/login";//this.serviceUrl + 'login?username=' + username + '&password=' + password;
            var username = username;
            var password = password;
            var data = '{"username":"' + username + '","password":"' + password + '"}';
            return ajaxRequester.get(url, _headers, data, success, error);
        };

        Users.prototype.register = function(username, password, email) {
            var success = function() {
                showNoty('Registration successful! Please logon in now.', 'success', 'topCenter');
                $('#background').removeClass('virtualBackgroundEnabled').html('');
            };
            var url = "https://api.parse.com/1/users";
            var data =
            {
                "username": username,
                "password": password,
                "email": email,
                "ACL": {'*':{'read': true}}
            };
            return ajaxRequester.post(url, _headers, data, success, error);
        };

        function showNoty(text,type,layout){
            var n = noty({
                text        : text,
                type        : type,
                dismissQueue: true,
                layout      : layout,
                theme       : 'defaultTheme',
                timeout: 3000
            });
        }

        return Users;
    }());

    var Validation = (function(){
        function validateData(input) {

            var splChars = "*|,\":<>[]{}`\';()@&$#%";
            for (var i = 0; i < input.length; i++) {
                if (splChars.indexOf(input.charAt(i)) != -1) {
                    return undefined;
                }
            }
            return input;
        }
        return {
            validateData:validateData
        }
    });

    return {
        get: function (rootUrl) {
            return new Persister(rootUrl);
        }
    }
}());