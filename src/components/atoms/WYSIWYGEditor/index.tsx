import { Editor } from "@tinymce/tinymce-react";
import {
  useFormContext,
  useController
} from "react-hook-form";

type HtmlEditorProps = {
  name: "html";
};

type FormData = {
  html: string;
};

const WYSIWYGEditor = ({ name }: HtmlEditorProps) => {
  const { control } = useFormContext<FormData>();
  const {
    field: { onChange, ...field }
  } = useController({ control, name });

  return (
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        {...field}
        onEditorChange={onChange}
        init={{
          plugins: 'link code preview quickbars emoticons imagecaption',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | preview | imagecaption',
          quickbars_selection_toolbar: 'bold italic | quicklink h1 h2 h3 blockquote',
          quickbars_image_toolbar: 'alignleft aligncenter alignright',
          quickbars_insert_toolbar: 'imagecaption link emoticons code',
          paste_webkit_styles: 'color font-weight font-style',
          relative_urls: false,
          remove_script_host: false,
          language: 'es',
          image_caption: true,
          paste_preprocess : function(pl, o) {           
            //Remove gmail default link color
            o.content = o.content.replace(/color: #1155cc;/gi, "");
          },
          // allow ses tag in links when copying source code.
          extended_valid_elements: "a[rel|rev|charset|hreflang|tabindex|accesskey|type|"
          + "name|href|target|title|class|onfocus|onblur|ses:tags]",
          document_base_url: process.env.REACT_APP_EL_TINTO_BASE_API,
          content_style: `
            body {
              font-family: Arial;
            }
            h1 {
              font-size: 46px;
            }
            h2 {
              font-size: 20px;
            }
            h3 {
              font-size: 18px;
              line-height: 150%;
              font-weight: 400
            }
            p {
                line-height: 150%;
                font-size: 16px;
            }
            li {
                font-size: 16px;
            }
            a {
              color: #fca311;
            }
            a div {
              background-color: #5044e4; 
              border-radius: 12px; 
              height: 45px;
              color: #FFFFFF;
              font-size: 18px;
              border: none;
              cursor: pointer;
            }
            .logo-subtitle{
              text-align: center;
              font-size: 23px;
              font-family: 'Raleway'
            }
            .logo-title{
              display: block;
              margin: 20px auto;
              width: 60%
            }
            .main {
              padding: 20px 0;
            }
            @media only screen and (min-width: 768px) {
              .main {
                padding: 20px 20%;
              }
              .logo-title{
                display: block;
                margin: 40px auto 20px auto;
                width: 40%
              }
              .logo-subtitle{
                text-align: center;
                font-size: 28px;
                font-family: 'Raleway'
              }
            }
          `
        }}
      />
  );
};

export default WYSIWYGEditor;
