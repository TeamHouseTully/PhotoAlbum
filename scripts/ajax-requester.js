var ajaxRequester = (function () {
    var makeRequest = function makeRequest(method, headers, url, data) {
        var def = Q.defer();
        $.ajax({
            headers: headers,
            type: method,
            url: url,
            contentType: 'application/json',
            data:  data,
            success: function(data){
                def.resolve(data);
            },
            error: function(error){
                def.reject(error);
            }
        });
        return def.promise;
    };

    function makeHeaders(headers) {
        var personalHeader = headers;
        personalHeader['X-Parse-Session-Token'] = localStorage.getItem('sessionToken');
        return personalHeader;
    }

    function makeGetRequest(url, headers) {
        return makeRequest('GET',makeHeaders(headers), url, null);
    }

    function makeGetOptionRequest(url,headers,data){
        return makeRequest('GET',makeHeaders(headers), url,data);
    }

    function makePostRequest(url,headers, data) {
        return makeRequest('POST',makeHeaders(headers), url, data);
    }

    function makePutRequest(url, headers,data) {
        return makeRequest('PUT',makeHeaders(headers), url, JSON.parse(data));
    }

    function makeDeleteRequest(url,headers) {
        return makeRequest('DELETE',makeHeaders(headers), url, {});
    }

    return {
        get: makeGetRequest,
        getOption: makeGetOptionRequest,
        post: makePostRequest,
        put: makePutRequest,
        delete: makeDeleteRequest
    }
}());