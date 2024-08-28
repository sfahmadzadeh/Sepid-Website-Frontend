import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { fontsStyles } from 'commons/components/organisms/SecureHTMLDisplay/styles/fonts';

// TinyMCE imports
import 'tinymce/tinymce';
import 'tinymce/models/dom/model';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide/skin';
import './Tiny.css';

// TinyMCE plugin imports
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/wordcount';

// Content styles
import 'tinymce/skins/content/default/content';
import 'tinymce/skins/ui/oxide/content';

// Importing plugin resources
import 'tinymce/plugins/emoticons/js/emojis';

// Configuration constants
const PLUGINS = [
  'lists', 'link', 'autolink', 'charmap', 'emoticons', 'preview',
  'searchreplace', 'insertdatetime', 'media', 'table', 'directionality', 'wordcount'
];

const TOOLBAR = 'redo undo | fontselect fontsize styles | align | bold italic underline formatgroup | bullist numlist | ltr rtl | insertgroup | searchreplace preview';

const TOOLBAR_GROUPS = {
  formatgroup: {
    icon: 'format',
    items: 'strikethrough | forecolor backcolor | superscript subscript | removeformat'
  },
  insertgroup: {
    icon: 'plus',
    items: 'link emoticons table charmap hr'
  }
};

const STYLE_FORMATS = [
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
];

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
        extended_valid_elements: 'svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],linearGradient[*],radialGradient[*],stop[*],image[*],view[*],text[*],textPath[*],title[*],tspan[*],glyph[*],symbol[*],switch[*],use[*]',
        content_style: fontsStyles.toString(),
        plugins: PLUGINS,
        toolbar: TOOLBAR,
        toolbar_groups: TOOLBAR_GROUPS,
        style_formats: STYLE_FORMATS,
      }}
      value={content}
      onEditorChange={onChange}
    />
  );
};

export default TinyEditor;