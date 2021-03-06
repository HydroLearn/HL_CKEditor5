

class HL_UploadAdapter {
    constructor( loader, url, csrf_token ) {
        // The FileLoader instance to use during the upload. It sounds scary but do not
        // worry — the loader will be passed into the adapter later on in this guide.
        this.loader = loader;

        this.csrf_token = csrf_token;
        // The upload URL in your server back-end. This is the address the XMLHttpRequest
        // will send the image data to.
        this.url = url;
    }

    upload() {
        return new Promise( ( resolve, reject ) => {
            this._initRequest();
            this._initListeners( resolve, reject );
            this._sendRequest();
        } );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    // Initializes the XMLHttpRequest object using the URL passed to the constructor.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        // Note that your request may look different. It is up to you and your editor
        // integration to choose the right communication channel. This example uses
        // the POST request with JSON as a data structure but your configuration
        // could be different.
        xhr.open( 'POST', this.url, true );
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners( resolve, reject ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${ loader.file.name }.`;

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("X-CSRFToken", this.csrf_token);

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;

            // This example assumes the XHR server's "response" object will come with
            // an "error" which has its own "message" that can be passed to reject()
            // in the upload promise.
            //
            // Your integration may handle upload errors in a different way so make sure
            // it is done properly. The reject() function must be called when the upload fails.
            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            // This URL will be used to display the image in the content. Learn more in the
            // UploadAdapter#upload documentation.
            alert('response' + response.asset.url)
            resolve( {
                default: response.asset.url
            } );
        } );

        // Upload progress when it is supported. The FileLoader has the #uploadTotal and #uploaded
        // properties which are used e.g. to display the upload progress bar in the editor
        // user interface.
        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    // Prepares the data and sends the request.
    _sendRequest() {
        // Prepare the form data.
        const data = new FormData();
        //data.append( 'csrfmiddlewaretoken', this.csrf_token );
        data.append( 'file', this.loader.file );



        // Send the request.
        this.xhr.send( data );
    }
}
// modified upload adapter to pull upload url from editor config
export default function UploadAdapter( editor ) {

    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        //console.log(editor.config.get('csrf_token'))
        return new HL_UploadAdapter( loader, editor.config.get('imageUploadUrl'), editor.config.get('csrf_token'));
    };
}

// add this to the config of classic Editor
//      extraPlugins: [ MyCustomUploadAdapterPlugin ],
