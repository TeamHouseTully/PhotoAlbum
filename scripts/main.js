var app = app || {};

(function(){
    var serviceRootUrl = 'https://api.parse.com/1/classes/';
    var persister = app.dataPersister.get(serviceRootUrl);
    var controller = app.controller.get(persister);
    controller.load();

    function getRegistrationData() {
        var username = persister.validation.validateData($('input[id="userName"]').val());
        var password = $('input[id="password"]').val();
        var secondPass = $('input[id="repeatPassword"]').val();
        var email = $('input[id="email"]').val();

        if(password === secondPass && username && email) {
            persister.users.register(username, password, email);
        }

    }

    function getLoginData() {
        var username = persister.validation.validateData($('input[id="userName"]').val());
        var password = $('input[id="password"]').val();

        if(username) {
            persister.users.login(username, password);
        }
    }

    function showLoginForm() {
        $('#background')
            .toggleClass('virtualBackgroundEnabled')
            .html(
            '<form>' +
            '<fieldset>' +
            '<legend>Login:</legend>' +
            '<label for="userName">username: </label>' +
            '<input id="userName" type="text" /><br/> ' +
            '<label for="password">password: </label>' +
            '<input id="password" type="password"/><br/> ' +
            '<button id="login">Log in</button>' +
            '</fieldset>' +
            '</form>');

        $('#login').on('click', getLoginData);
    }

    function showRegistrationForm() {
        $('#background')
            .toggleClass('virtualBackgroundEnabled')
            .html(
            '<form>' +
            '<fieldset>' +
            '<legend>Register:</legend>' +
            '<label for="userName">username: </label>' +
            '<input id="userName" type="text" />' +
            '<label for="password">password: </label>' +
            '<input id="password" type="password" />' +
            '<label for="repeatPassword">repeat password: </label>' +
            '<input id="repeatPassword" type="password" />' +
            '<label for="email">e-mail: </label>' +
            '<input id="email" type="text" />' +
            '<button id="register">Register</button>' +
            '</fieldset>' +
            '</form>'
        );

        $('#register').on('click', getRegistrationData);
    }

    if(localStorage.sessionToken) {
        $('#userPanel').append($('<button id="logout">Logout</button>'));
    } else {

        $('#userPanel')
            .append($('<button id="loginButton" class="btn">Login</button>').on('click', showLoginForm))
            .append($('<button id="registerButton" class="btn">Register</button>').on('click', showRegistrationForm));
    }



}());