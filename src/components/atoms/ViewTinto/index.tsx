import { Paper } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { ViewTintoProps } from "./types";
import { getTemplates } from "../../../services";

const ViewTinto: React.FC<ViewTintoProps>= ({tintoBlocks}) => {

  const [displayValue, setDisplayValue] = useState<string>('')
  const [template, setTemplate] = useState<string>('')

  useEffect(() => {
    if (tintoBlocks.length > 0){
      const displayValuesArray = tintoBlocks.map((tintoBlock: any) => tintoBlock.display_html)
      setDisplayValue(displayValuesArray.join(''))
    }
  }, [tintoBlocks])

  useEffect(() => {
    getTemplates()
    .then(response => setTemplate(response.data.results[0].html))
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (tintoBlocks.length > 0){
      const displayValuesArray = tintoBlocks.map((tintoBlock: any) => tintoBlock.display_html);
      const displayHtmlValue = displayValuesArray.join('');
      setDisplayValue(template.replace('{{html}}', displayHtmlValue))
    }
  }, [template, tintoBlocks])

  return(
    <Paper variant="outlined" sx={{borderRadius: '12px', textAlign: 'center', border: '0'}}>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        initialValue={displayValue}
        init={{
          height: 1000,
          menubar: false,
          language: 'es',
          plugins: 'link image code preview',
          toolbar: 'preview',
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
    </Paper>
  )
}

export default ViewTinto;