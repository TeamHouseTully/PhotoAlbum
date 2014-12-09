var app = app || {};

app.controller = (function () {
    function Controller(dataPersister) {
        this.persister = dataPersister;
    }

    Controller.prototype.load = function () {
        var _this = this;


        _this.persister.albums.getAll()
            .then(function(data){_this.showAlbums(data)})
            .then(function(){
                _this.attachEvents()
            })
    };

    Controller.prototype.loadImages = function (albumId) {
        var _this = this;
        var queryData = 'where={"Album" : {"__type": "Pointer","className": "Albums","objectId": "' + albumId + '"}}';

        _this.persister.images.getByOption(queryData)
            .then(function(data){
                $('#currentImagesSlider').children().remove();
                _this.persister.images.setCurrentImageData(data.results);
                _this.showImages(data.results)
            },function(error){
                showNoty('Error getting images','error','center')
            })
    };

    Controller.prototype.loadComments = function(imageId){
        var _this = this;
        var queryData = 'where={"Image" : {"__type": "Pointer","className": "Images","objectId": "' + imageId + '"}}' + ('&include=User');

        _this.persister.comments.getByOption(queryData)
            .then(function(data){
                $('#comments').children().remove();
                _this.showComments(data)
            },function(error){
                showNoty("error getting images : "  +error,'error','center')
            })
    };

    Controller.prototype.showAlbums = function(data) {

       var albumTemplate = '{{#results}} <div class="album" data-id="{{objectId}}">' +
           '<button class="deleteButton"></button>' +
           '<span class="albumName">{{Name}}</span>' +
           '<span class="albumPicCount">{{PictureCount}}</span>' +
           '</div>' +
           '{{/results}}';

       Mustache.parse(albumTemplate);
       var rendered = Mustache.render(albumTemplate, data);
       $('#albumsHolder').html(rendered);

    };

    Controller.prototype.showSingleImageData = function(image){
        var imageTemplate = '<div class="album" data-id="{{objectId}}">' +
            '<button class="deleteButton"></button>' +
            '<span class="albumName">{{Name}}</span>' +
            '<span class="albumPicCount">{{PictureCount}}</span>' +
            '</div>';
    };

    Controller.prototype.showImages = function(images){
        var _this = this;

        $.each(images,function(_,image){
            createThumbnailButton.call(_this,image);
        })
    };

    Controller.prototype.showComments = function(comments){

            var commentTemplate = '{{#results}}' +
            '<div class="comment">'+
            '<span class="commentUser">{{User.username}}:</span>'+
            '<span class="commentText">{{Text}}</span>'+
            '</div>'+
            '{{/results}}';

            Mustache.parse(commentTemplate);
            var rendered = Mustache.render(commentTemplate, comments);
            $('#comments').html(rendered);
    };


    Controller.prototype.attachEvents = function(){
        var _this = this;
        makeAlbumButton.call(this);
    };


    var createThumbnailButton = function(image){
        var imageSrc = image.Image.url;
        var id = image.objectId;
        var _this = this;
        var imgDiv = $('<div>').attr('class','images');

        imgDiv.click(function(){
            if(_this.persister.images.getCurrentImageId() != id){
                $('.images').css('border','1px solid white');
                $(this).css('border','3px solid red');
                _this.persister.images.setCurrentImageId(id);
                $('#pictureItself').css('background-image','');
                $('#pictureItself').off();
                showImageOnShow(imageSrc);
                _this.loadComments(id);
                //_this.showSingleImageData(image);
            }
        });
        imgDiv.append($('<img>').attr('src','design/loading.gif'));
        imgDiv.appendTo($('#currentImagesSlider'));
        createThumbnail(imageSrc,imgDiv);

    };

    var createThumbnail = function(imgURL,div){

       var canvas = $('<canvas>').appendTo(div);
       var ctx = canvas[0].getContext('2d');


            var SMALL_IMAGE_SIDE = 100;
            var img = new Image();

                img.onload = function () {

                    var width = img.width;
                    var height = img.height;
                    var imgSmallerSide;

                    var diff = width - height;

                    var imgBiggerSideName;
                    if (diff > 0) {
                        imgSmallerSide = height;
                        imgBiggerSideName = 'width';
                    }
                    else {
                        imgSmallerSide = width;
                        imgBiggerSideName = 'height';
                        if (!diff) {
                            imgBiggerSideName = 'even';
                        }
                    }

                    canvas.width = SMALL_IMAGE_SIDE;
                    canvas.height = SMALL_IMAGE_SIDE;

                    var pixelsForCut = (diff < 0) ? ((diff * -1) / 2) : (diff / 2);

                    switch (imgBiggerSideName) {
                        case 'width':
                            ctx.drawImage(img, pixelsForCut, 0, imgSmallerSide, imgSmallerSide,
                                0, 0, SMALL_IMAGE_SIDE, SMALL_IMAGE_SIDE);
                            break;
                        case 'height':
                            ctx.drawImage(img, 0, pixelsForCut, imgSmallerSide, imgSmallerSide,
                                0, 0, SMALL_IMAGE_SIDE, SMALL_IMAGE_SIDE);
                            break;
                        default:
                            ctx.drawImage(img, 0, 0, imgSmallerSide, imgSmallerSide,
                                0, 0, imgSmallerSide, imgSmallerSide);
                    }

                };
                img.src = imgURL;
        div.find('img').remove();
    };

    var showImageOnShow = function(imgSrc){
        $('#pictureItself').css('background-image','url(' + imgSrc +')');
        $('#pictureItself').hover(function(){
            $(this).css( 'cursor', 'pointer' );
        });
        $('#pictureItself').click(function(){
            window.location.href = imgSrc;
        })
    };

    var makeAlbumButton = function(){
        var _this = this;
        $('.album').each(function() {
            var $thisElement = $(this);
            var id = $thisElement.attr('data-id');
            $thisElement.on('click', function () {
                $('.album').css('border','1px solid white');
                $thisElement.css("border",'3px solid red');
                if(_this.persister.albums.getCurrentAlbumId() != id){
                    _this.persister.albums.setCurrentAlbumId(id);
                    _this.loadImages(id);
                    $('#pictureItself').css('background-image','');
                }
            });
            $thisElement.find(".deleteButton").on('click', function () {
                _this.persister.albums.delete(id).
                    then(
                    function success(){
                        $thisElement.remove();
                    } ,
                    function error(error){
                        showNoty("error deleting album :" + error,'error','center')
                })
            });
            $thisElement.removeAttr('data-id')
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