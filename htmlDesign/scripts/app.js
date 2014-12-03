function registrationSuccessful() {
    noty({
        text: 'Registration successful! You can log on now.',
        type: 'success',
        layout: 'topCenter',
        timeout: 3000

    });
}

function errorFunction() {
    noty({
        text: 'There was an error with the query to the database.',
        type: 'success',
        layout: 'topCenter',
        timeout: 3000
    })
}

function loginSuccessful() {
    noty({
        text: 'Login successful!',
        type: 'success',
        layout: 'topCenter',
        timeout: 3000

    });
}
