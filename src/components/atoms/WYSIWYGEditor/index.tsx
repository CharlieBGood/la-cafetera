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
        apiKey={process.env.REACT_APP_TINYMCE_API}
        {...field}
        onEditorChange={onChange}
        init={{
          plugins: 'link image code preview',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code preview'
        }}
      />
  );
};

export default WYSIWYGEditor;
