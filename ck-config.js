// import base editor
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import InlineEditorBase from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import DocEditorBase from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';

// import basic toolbar controls
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';

// text formatting plugins
    import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';

    import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
    import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
    import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
    import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
    import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
    import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
    import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
    import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
    import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
    import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
    import Indent from '@ckeditor/ckeditor5-indent/src/indent';
    import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
    import Font from '@ckeditor/ckeditor5-font/src/font';

    // structured elements
    import List from '@ckeditor/ckeditor5-list/src/list';
    import Table from '@ckeditor/ckeditor5-table/src/table';
    import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
    import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
    import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';

    import Heading from '@ckeditor/ckeditor5-heading/src/heading';


    // paste from office support
    import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';

    // embed media support
    import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
    import Link from '@ckeditor/ckeditor5-link/src/link';

    // image imports       
        
        import Image from '@ckeditor/ckeditor5-image/src/image';
        import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
        import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
        import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
        import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
        import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
        import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage' 
        import UploadAdapter from './custom_plugins/UploadAdapter'
        
        
        
// Collection of color definitions for use by the font styling options
const COLOR_PALETTE = [
    {
        color: 'hsl(0, 0%, 0%)',
        label: 'Black'
    },
    {
        color: 'hsl(0, 0%, 30%)',
        label: 'Dim grey'
    },
    {
        color: 'hsl(0, 0%, 60%)',
        label: 'Grey'
    },
    {
        color: 'hsl(0, 0%, 90%)',
        label: 'Light grey'
    },
    {
        color: 'hsl(0, 0%, 100%)',
        label: 'White',
        hasBorder: true
    },
    {
        color: 'hsl(0, 75%, 60%)',
        label: 'Red'
    },
    {
        color: 'hsl(30, 75%, 60%)',
        label: 'Orange'
    },
    {
        color: 'hsl(60, 75%, 60%)',
        label: 'Yellow'
    },
    {
        color: 'hsl(90, 75%, 60%)',
        label: 'Light green'
    },
    {
        color: 'hsl(120, 75%, 60%)',
        label: 'Green'
    },
    {
        color: 'hsl(150, 75%, 60%)',
        label: 'Aquamarine'
    },
    {
        color: 'hsl(180, 75%, 60%)',
        label: 'Turquoise'
    },
    {
        color: 'hsl(210, 75%, 60%)',
        label: 'Light blue'
    },
    {
        color: 'hsl(240, 75%, 60%)',
        label: 'Blue'
    },
    {
        color: 'hsl(270, 75%, 60%)',
        label: 'Purple'
    }
]


// Plugins to include in the build
const DEFAULT_PLUGINS = [
    Essentials,
    Heading,
    Paragraph,
    Font,
    Bold, Italic, Underline,
    Superscript, Subscript, Strikethrough,
    
    List, 
    Table, TableToolbar, TableProperties, TableCellProperties,
    Alignment, BlockQuote,
    Indent, IndentBlock,
    RemoveFormat,

    Image, ImageToolbar, ImageCaption, ImageStyle, 
    
    ImageResize,
    PasteFromOffice, 
    MediaEmbed, 
    Link, LinkImage,
    ImageUpload, 
    
    CodeBlock
    
]


// Editor Configuration
const DEFAULT_CONFIG = {
        // plugins: { ... migrated to the DEFAULT_PLUGINS object ... }
        imageUploadUrl: "404",
        alignment: {
            options: ['left', 'right', 'center', 'justify']
        },
        
        table: {
            // contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
            contentToolbar: [
                'tableProperties', 'tableCellProperties', '|',
                'tableColumn', 'tableRow', 'mergeTableCells',
                
            ],

            tableProperties: {
                borderColors: COLOR_PALETTE,
                backgroundColors: COLOR_PALETTE
            },

            // Set the palettes for table cells.
            tableCellProperties: {
                borderColors: COLOR_PALETTE,
                backgroundColors: COLOR_PALETTE
            }
        },
        image: {
            toolbar: [ 
                'imageStyle:alignLeft', 
                'imageStyle:full', 
                'imageStyle:alignRight', 
                '|', 
                'imageTextAlternative',
                '|', "linkImage"


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

        fontFamily: {
            options: [
                'default',
                'Arial, Helvetica, sans-serif',
                'Courier New, Courier, monospace',
                'Georgia, serif',
                'Lucida Sans Unicode, Lucida Grande, sans-serif',
                'Tahoma, Geneva, sans-serif',
                'Times New Roman, Times, serif',
                'Trebuchet MS, Helvetica, sans-serif',
                'Verdana, Geneva, sans-serif',
                'monospace',
            ]
        },

        // fontSize: {
        //     options: [
        //         'tiny',
        //         'default',
        //         'big'
        //     ]
        // },

        fontColor: {
            colors: COLOR_PALETTE
        },
        fontBackgroundColor: {
            colors: COLOR_PALETTE
        },

        indentBlock: {
            offset: 1,
            unit: 'em'
        },

        toolbar: [  
            'undo', 'redo',    
            '|','heading',
            '|','fontFamily', /* 'fontSize', */ 'fontColor', 'fontBackgroundColor', 
            '|', /* 'highlight' */, 'bold', 'italic', 'underline', 'strikethrough',
            '|', 'superscript', 'subscript',            
            '|', 'removeFormat',                        
            '|', 'alignment', 'bulletedList', 'numberedList', 'outdent', 'indent', 
            '|', 'blockQuote', 'codeBlock','insertTable',
            '|', 'link', 'mediaEmbed', 
            
            'imageUpload', 
            
            
            

            ],

        link: {
            decorators: {                    
                openInNewTab: {
                    mode: 'manual',
                    label: 'Open in a new tab',
                    defaultValue: true,			// This option will be selected by default.
                    attributes: {
                        target: '_blank',
                        rel: 'noopener noreferrer'
                    }
                }
            }
        },
        
    }


// extend this editor from the base
class ClassicEditor extends ClassicEditorBase {}
class InlineEditor extends InlineEditorBase {}
class BalloonEditor extends BalloonEditorBase {}
class DocumentEditor extends DocEditorBase {}

// add the default config and plugins to the extended editor
ClassicEditor.builtinPlugins = DEFAULT_PLUGINS;
ClassicEditor.defaultConfig = DEFAULT_CONFIG;

InlineEditor.builtinPlugins = DEFAULT_PLUGINS;
InlineEditor.defaultConfig = DEFAULT_CONFIG;

BalloonEditor.builtinPlugins = DEFAULT_PLUGINS;
BalloonEditor.defaultConfig = DEFAULT_CONFIG;

DocumentEditor.builtinPlugins = DEFAULT_PLUGINS;
DocumentEditor.defaultConfig = DEFAULT_CONFIG;

// TODO: potentially add methods to:
//  - sanatize html
//  - add config options
export default {
    "classic_editor": ClassicEditor,
    "inline_editor": InlineEditor,
    "balloon_editor": BalloonEditor,
    "document_editor": DocumentEditor,
}


// // define a custom implementation of the classic editor
// ClassicEditor.create( document.querySelector( '#editor' ))
//     .then( editor => {
//         console.log( 'Editor was initialized', editor );
//     } )
//     .catch( error => {
//         console.error( error.stack );
//     } );
