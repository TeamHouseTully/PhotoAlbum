var app = app || {};

app.controller = (function () {
    function Controller(dataPersister) {
        this.persister = dataPersister;
    }

    Controller.prototype.loadAlbums = function () {
        var _this = this;

        this.persister.albums.getAll(
            function (data) {
                _this.drawAlbums(data);
                _this.attachEvents(data);
            },
            function (error) {
                console.log(error);
            }
        );
    };

    Controller.prototype.drawAlbums = function(data){
        $.get('templates/album.html', function (template) {
            var output = Mustache.render(template, data);
            $('#albumsHolder').html(output);
        });
    };

    Controller.prototype.attachEvents = function(data){
        var _this = this;
        $('#submit').click(function(){
            var username = $('input[id="userName"]').val();
            var result = _this.dataPersister.validation.validateData(username);
            var password = $('input[id="password"]').val();
            if(result===undefined){
                showNoty('Username must contain only alphanumeric characters','error','topCenter');
            }else{
                _this.dataPersister.users.login(username,password)
            }
        })


    };

    function showNoty(text,type,layout){
        var n = noty({
            text        : text,
            type        : type,
            dismissQueue: true,
            layout      : layout,
            theme       : 'defaultTheme'
        });
    }

    return {
        get: function (dataPersister) {
            return new Controller(dataPersister);
        }
    }
}());