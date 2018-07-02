

class ApiRequest {

    static paths = {

    };

    static root = 'https://us-central1-zoe-api-project.cloudfunctions.net/';

    constructor(path, method = 'GET', body = null) {
        this.init = {};
        this.buildInit(method, body);
    }

    addStandardHeaders() {
        const headerObj = new Headers();
        headerObj.set('Content-Type', 'application/json');
        this.init.headers = headerObj;
    }

    addHeader(header, content) {
        this.init.headers.set(header, content);
        return true;
    }

    setHttpMethod(method) {
        this.init.method = method;
    }

    buildInit(method, body) {
        switch (method) {
            case 'GET':
            case 'DELETE':
                break;
            case 'POST':
            case 'PUT':
                this.init.body = body;
                this.addStandardHeaders();
        }
        this.setHttpMethod(method);
        
    }
}