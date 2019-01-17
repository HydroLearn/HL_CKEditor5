// import base editor
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

// import basic toolbar controls
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';

// text formatting plugins
    import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
    import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
    import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
    import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
    import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
    import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
    import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
    import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
    import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';

    // structured elements
    import List from '@ckeditor/ckeditor5-list/src/list';
    import Table from '@ckeditor/ckeditor5-table/src/table';
    import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';


    // paste from office support
    import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';

    // embed media support
    import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
    import Link from '@ckeditor/ckeditor5-link/src/link';

    // image imports
        //import InsertImage from './custom_plugins/ImagePlugin'
        import UploadAdapter from './custom_plugins/UploadAdapter'
        import Image from '@ckeditor/ckeditor5-image/src/image';
        import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
        import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
        import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
        import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';


// Plugins to include in the build
const default_plugins = [
    Essentials,
    Paragraph,
    Bold, Italic, Underline,
    Superscript, Subscript, Strikethrough,
    List, Table, TableToolbar, Alignment, BlockQuote,

    Image, ImageToolbar, ImageCaption, ImageStyle, ImageUpload,
    PasteFromOffice, MediaEmbed, Link
]

// Editor Configuration
const default_config = {
        // plugins: { ... migrated to the default_plugins object ... }
        imageUploadUrl: "404",
        alignment: {
            options: ['left', 'right', 'center', 'justify']
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
        image: {
            toolbar: [ 'imageTextAlternative',
                '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'
            ],
            styles: [
                // This option is equal to a situation where no style is applied.
                'full',
                // This represents an image aligned to the left.
                'alignLeft',
                // This represents an image aligned to the right.
                'alignRight'
            ]
        },
        mediaEmbed: {
            // configuration...
        },
        extraPlugins: [ UploadAdapter ],

        toolbar: [  'undo', 'redo',
                    '|', 'bold', 'italic', 'underline', 'strikethrough',
                    '|', 'superscript', 'subscript',
                    '|', 'alignment', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable',
                    '|', 'link', 'mediaEmbed', 'imageUpload', // 'InsertImage'

                ],

    }


// extend this editor from the base
class ClassicEditor extends ClassicEditorBase {}
class InlineEditor extends InlineEditorBase {}
class BalloonEditor extends BalloonEditorBase {}
// add the default config and plugins to the extended editor
ClassicEditor.builtinPlugins = default_plugins;
ClassicEditor.defaultConfig = default_config;

InlineEditor.builtinPlugins = default_plugins;
InlineEditor.defaultConfig = default_config;

BalloonEditor.builtinPlugins = default_plugins;
BalloonEditor.defaultConfig = default_config;

// TODO: potentially add methods to:
//  - sanatize html
//  - add config options
export default {
    "classic_editor": ClassicEditor,
    "inline_editor": InlineEditor,
    "balloon_editor": BalloonEditor,
}


// // define a custom implementation of the classic editor
// ClassicEditor.create( document.querySelector( '#editor' ))
//     .then( editor => {
//         console.log( 'Editor was initialized', editor );
//     } )
//     .catch( error => {
//         console.error( error.stack );
//     } );
