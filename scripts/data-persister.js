var app = app || {};

app.dataPersister = (function () {

    function Persister(rootUrl) {
        this.rootUrl = rootUrl;
        this.classItems = new ClassItems(rootUrl);
        this.images = new Images(rootUrl);
        this.albums = new Albums(rootUrl);
        this.users = new Users(rootUrl);
        this.comments = new Comments(rootUrl);
        this.validation = new Validation();
    }

    var userDataStorage = (function() {
        var error = function() {
                showNoty('Something went wrong. Please try again!', 'error', 'topCenter');
          };

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
            this.headers = userDataStorage.getHeaders();
        }

        ClassItems.prototype.getSingle = function (id) {
            return ajaxRequester.get(this.serviceUrl + id,this.headers);
        };

        ClassItems.prototype.getAll = function () {
            return ajaxRequester.get(this.serviceUrl,this.headers);
        };

        ClassItems.prototype.add = function (data) {
            return ajaxRequester.post(this.serviceUrl,this.headers, data);
        };

        ClassItems.prototype.delete = function (id) {
            return ajaxRequester.delete(this.serviceUrl + id,this.headers);
        };

        ClassItems.prototype.put = function (id, data) {
            return ajaxRequester.put(this.serviceUrl + id,this.headers, data);
        };

        ClassItems.prototype.getByOption = function(data){
            return ajaxRequester.getOption(this.serviceUrl,this.headers,data);
        };
        return ClassItems;
    }());

    var Comments = (function () {
        function Comments(rootUrl){
            this.serviceUrl = rootUrl + 'Comments/';
        }
        Comments.prototype = new ClassItems();

        Comments.prototype.getByOption = function(data){
            return ajaxRequester.getOption(this.serviceUrl,this.headers,data);
        };
        return Comments;
    }());


    var Images = (function () {
        function Images(rootUrl) {
            this.serviceUrl = rootUrl + 'Images/';
            this._currentImageId = null;
            this._currentImageData = null;
        }

        Images.prototype = new ClassItems();

        Images.prototype.getCurrentImageId = function(){
            return this._currentImageId;
        };

        Images.prototype.getCurrentImageData = function(){
            return this._currentImageData;
        };

        Images.prototype.setCurrentImageId = function(val){
            this._currentImageId = val;
        };

        Images.prototype.setCurrentImageData = function(val){
            this._currentImageData = val;
        };

        Images.prototype.getByOption = function(data){
            return ajaxRequester.getOption(this.serviceUrl ,this.headers,data);
        };

        return Images;
    }());

    var Albums = (function () {
        function Albums(rootUrl) {
            this.serviceUrl = rootUrl + 'Albums/';
            this._currentAlbumId = null;
        }

        Albums.prototype = new ClassItems();

        Albums.prototype.getCurrentAlbumId = function(){
            return this._currentAlbumId;
        };

        Albums.prototype.setCurrentAlbumId = function(value){
            this._currentAlbumId = value;
        };

        return Albums;
    }());


    var Users = (function(){
        var _headers = {
            'X-Parse-Application-Id': 'w8RpxfKV4dvAI9B5mm3hDX0w1D995KKEcycW3sX8',
            'X-Parse-REST-API-Key': 'pJlAQ67ALlzu4yAGXhsJptlbIl5kMUfHdqNNfVFV'
        };

        function Users(rootUrl){
            this.serviceUrl = 'https://api.parse.com/1/users';
            //this.headers = userDataStorage.getHeaders();
        }

        Users.prototype = new ClassItems();

        Users.prototype.login = function(username,password){
            var url = "https://api.parse.com/1/login";
            var data = {"username": username  ,"password":  password };
            return ajaxRequester.getOption(url, _headers, data)
                .then(function(data){
                    userDataStorage.setSessionToken(data.sessionToken);
                    userDataStorage.setUserName(data.username);
                    userDataStorage.setUserObjectId(data.objectId);
                    showNoty('Login successful!', 'success', 'topCenter');
                    $('#background').removeClass('virtualBackgroundEnabled').html('');
                    $('#userPanel').html('');
                    $('#userPanel')
                        .append($('<button id="logout" class="btn">Logout</button>')
                            .on('click', function() {
                                localStorage.removeItem('sessionToken');
                                location.reload();
                            }));
            },function(error){
                    showNoty('Login failed!', 'error', 'topCenter');
                    $('#background').removeClass('virtualBackgroundEnabled').html('');
                });
        };

        Users.prototype.register = function(username, password, email) {

            var data =
            JSON.stringify({
                "username": username,
                "password": password,
                "email": email,
                "ACL": {'*':{'read': true}}
            });
            return ajaxRequester.post(this.serviceUrl, _headers, data)
                .then(function(data){
                    userDataStorage.setSessionToken(data.sessionToken);
                    userDataStorage.setUserName(username);
                    userDataStorage.setUserObjectId(data.objectId);
                showNoty('Registration successful! Please log in now.', 'success', 'topCenter');
                $('#background').removeClass('virtualBackgroundEnabled').html('');
            },function (error){
                showNoty('Registration error!', 'error', 'topCenter');
            });
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

    return {
        get: function (rootUrl) {
            return new Persister(rootUrl);
        }
    }
}());