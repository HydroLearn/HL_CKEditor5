import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';


// add this to your editor config
//      import CustomUploadAdapter from './custom_plugins/UploadAdaptor'
//  
//      and add this to to the editor config
//          extraPlugins: [ CustomUploadAdapter ],



export default class HL_UploadAdapter extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ FileRepository ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'HL_UploadAdapter';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const options = this.editor.config.get( 'upload_config' );
        
		if ( !options ) {
			return;
		}

		if ( !options.uploadUrl ) {			
			console.warn( attachLinkToDocumentation(
				'custom-upload-adapter-missing-uploadUrl: Missing the "uploadUrl" property in the "upload_config" editor configuration.'
			) );

			return;
		}

		this.editor.plugins.get( FileRepository ).createUploadAdapter = loader => {
			return new Custom_Adapter( loader, options );
		};
	}
}


/**
 * TODO: need to update this
 * 
 */
class Custom_Adapter {
    constructor( loader, options ) {
		/**
		 * FileLoader instance to use during the upload.		 
		 */
		this.loader = loader;

		/**
		 * The configuration of the adapter.		 
		 */
		this.options = options;
	}

    upload() {
		return this.loader.file
			.then( file => new Promise( ( resolve, reject ) => {
				this._initRequest();
				this._initListeners( resolve, reject, file );
				this._sendRequest( file );
			} ) );
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
        xhr.open( 'POST', this.options.uploadUrl, true );
        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners( resolve, reject, file ) {
        
        const xhr = this.xhr;
		const loader = this.loader;
		const genericErrorText = `Couldn't upload file: ${ file.name }.`;

        // xhr.setRequestHeader("Accept", "application/json");

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;
			const responsePayload = this.options.responsePayloadName || null;
            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

			/*		 

			 response is returning a JSON object of 
				 
			 	{
					 'asset': { 
						 ..., 
						 url:"...", 
						 ...
						}
					}
			 */
			debugger;
			const returnObj = (!!responsePayload) ? response[responsePayload] : response;

		


            //alert('response' + returnObj.url)

            resolve( returnObj.url ? { default: returnObj.url } : returnObj.urls );
        } );

        // Upload progress when it is supported.
		/* istanbul ignore else */
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
    _sendRequest(file) {
        
        
        // Set headers if specified.
        const headers = this.options.headers || {};
        const requestPayloadName = this.options.requestPayloadName || 'upload';

        for ( const headerName of Object.keys( headers ) ) {
            this.xhr.setRequestHeader( headerName, headers[ headerName ] );
        }

        // Prepare the form data.
        const data = new FormData();
        
        data.append( requestPayloadName, file );

        // Send the request.
        this.xhr.send( data );

    }
}

