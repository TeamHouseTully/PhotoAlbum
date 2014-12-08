var app = app || {};

(function(){
    var serviceRootUrl = 'https://api.parse.com/1/classes/';
    //var views = app.views;
    var persister = app.dataPersister.get(serviceRootUrl);
    var controller = app.controller.get(persister);
    controller.loadAlbums();

    //app.router = Sammy(function(selector) {
    //    var selector = '#mainHolder"';
    //
    //    this.get('#/add', function() {
    //        controller.loadAddForm();
    //    });
    //
    //    this.get('#/books', function() {
    //        controller.loadBooksView();
    //    })
    //
    //});
    //app.router.run('#/add');
}());