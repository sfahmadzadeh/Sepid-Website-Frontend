// TinyMCE so the global var exists
import 'tinymce/tinymce';
// DOM model
import 'tinymce/models/dom/model'
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin';
import './Tiny.css'

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/help/js/i18n/keynav/en';
import 'tinymce/plugins/image';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';

// importing plugin resources
import 'tinymce/plugins/emoticons/js/emojis';

// Content styles, including inline UI like fake cursors
import 'tinymce/skins/content/default/content';
import 'tinymce/skins/ui/oxide/content';

import '../additional-plugins/latex';

import { Editor } from '@tinymce/tinymce-react'
import React from 'react'

const TinyEditor = ({ content, onChange }) => {

  return (
    <Editor
      licenseKey='gpl'
      init={{
        height: 300,
        menubar: false,
        width: '100%',
        branding: false,
        directionality: "rtl",
        extended_valid_elements:
          'svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],linearGradient[*],radialGradient[*],stop[*],image[*],view[*],text[*],textPath[*],title[*],tspan[*],glyph[*],symbol[*],switch[*],use[*]',
        content_css: '/styles/font.css',
        plugins: [
          'lists',
          // 'advlist',

          'link',
          'autolink',

          // 'image',
          'charmap',
          'emoticons',

          'preview',
          // 'anchor',

          'latex',
          // 'code',
          'searchreplace',
          // 'fullscreen',
          // 'visualblocks',

          'insertdatetime',
          'media',
          'table',
          'directionality',
          'wordcount',
          // 'help',
        ],
        // fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        toolbar:
          'redo undo | fontselect fontsize styles | align | bold italic underline formatgroup | bullist numlist | ltr rtl | insertgroup | searchreplace preview',
        toolbar_groups: {
          formatgroup: {
            icon: 'format',
            items:
              'strikethrough | forecolor backcolor | superscript subscript | removeformat'
          },
          insertgroup: {
            icon: 'plus',
            items: 'link emoticons table charmap hr'
          }
        },
        style_formats: [
          { title: 'Heading 1', format: 'h1' },
          { title: 'Heading 2', format: 'h2' },
          { title: 'Heading 3', format: 'h3' },
          { title: 'Heading 4', format: 'h4' },
          { title: 'Heading 5', format: 'h5' },
          { title: 'Heading 6', format: 'h6' },
          { title: 'Paragraph', format: 'p' },
          { title: 'Blockquote', format: 'blockquote' },
          { title: 'Div', format: 'div' },
          { title: 'Pre', format: 'pre' }
        ],
      }}
      value={content}
      onEditorChange={onChange} />
  )
}

export default TinyEditor
