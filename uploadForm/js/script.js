$(document).ready(function () {
    var files,
        outPutFileNames = {};

    $('input[type="file"]').on('change', prepareUpload);
    $('form').on('submit', uploadFiles);

    function prepareUpload(event) {
        files = event.target.files;
    }

    function uploadFiles(event) {
        event.stopPropagation();
        event.preventDefault();

        // LOADING START
        $('.statusBar').text('Uploading...');

        var data = new FormData();
        $.each(files, function (key, value) {
            data.append(key, value);
        });

        $.ajax({
            url: 'ImageCrop.php?files',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                if (typeof data.error === 'undefined') {
                    submitForm(event, data);
                }
                else {
                    console.log('ERRORS:' + data.error);
                }
            },
            error: function (data, textStatus) {
                console.log('ERROR: ' + textStatus);

                $('.statusBar').text('');
                // LOADING STOPS
            }
        });
    }

    function submitForm (event, data) {
        $form = $(event.target);

        var formData = $form.serialize();

        $.each(data.files, function (key, value) {
            formData = formData + '&filenames[]=' + value;
            outPutFileNames[key] = value.split('/')[value.split('/').length - 1];
        });

        $.ajax({
            url: 'ImageCrop.php',
            type: 'POST',
            data: formData,
            cache: false,
            dataType: 'json',
            success: function (data) {
                if (typeof data.error === 'undefined') {
                    console.log('SUCCESS: form was submitted!');

                    // ТУК СЛОЖИ $.ajax ЗАЯКВКА ДА КАЧИШ ИМЕНАТА НА КАРТИНКИТЕ(които са в обекта "outPutFileNames")
                    // В БАЗАТА ДАННИ

                }
                else {
                    console.log('ERROR: ' + data.error);
                }
            },
            error: function (data, textStatus) {
                console.log('ERROR: ' + textStatus);
            },
            complete: function () {

                $('.statusBar').text('');
                // LOADING STOP
            }
        })
    }
});