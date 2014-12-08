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
            localStorage.getItem('sessionToken');
        }

        function setUserName(userName) {
            localStorage.setItem('userName', userName);
        }

        function getUserName() {
            localStorage.getItem('userName')
        }

        function setUserObjectId(objectId) {
            localStorage.setItem('userObjectId', objectId);
        }

        function getUserObjectId() {
            localStorage.getItem('userObjectId');
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
        function Users(rootUrl){
            this.serviceUrl = rootUrl ;
        }

        Users.prototype = new ClassItems();

        Users.prototype.login = function(username,password){
            var url = this.serviceUrl + 'login?username=' + username + '&password=' + password;
            var data = { username:username,password:password};
            return ajaxRequester.get(url, success, error);
        };

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