var ajaxRequester = (function () {
    var makeRequest = function makeRequest(method,headers, url, data, success, error) {
        return $.ajax({
            headers: headers,
            type: method,
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: success,
            error: error
        })
    };

    function makeHeaders(headers) {
        var personalHeader = headers;
        personalHeader['X-Parse-Session-Token'] = localStorage.getItem('sessionToken');
        return personalHeader;
    }

    function makeGetRequest(url, headers, success, error) {
        return makeRequest('GET',makeHeaders(headers), url, null, success, error);
    }

    function makeGetOptionRequest(url,headers,data, success, error){
        return makeRequest('GET',makeHeaders(headers), url, data, success, error);
    }

    function makePostRequest(url,headers, data, success, error) {
        return makeRequest('POST',makeHeaders(headers), url, data, success, error);
    }

    function makePutRequest(url, headers,data, success, error) {
        return makeRequest('PUT',makeHeaders(headers), url, JSON.parse(data), success, error);
    }

    function makeDeleteRequest(url,headers,success, error) {
        return makeRequest('DELETE',makeHeaders(headers), url, {}, success, error);
    }

    return {
        get: makeGetRequest,
        getOption: makeGetOptionRequest,
        post: makePostRequest,
        put: makePutRequest,
        delete: makeDeleteRequest
    }
}());