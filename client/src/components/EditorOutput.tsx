import Output from "editorjs-react-renderer";
import CodeRenderer from "@/components/renderers/CodeRender";
import ImageRenderer from "@/components/renderers/ImageRender";

interface EditorOutputProps {
  content: unknown;
}

const renderers = {
  image: ImageRenderer,
  code: CodeRenderer,
};

const style = {
  paragraph: {
    fontSize: "0.95rem",
    lineHeight: "1.45rem",
  },
};

function EditorOutput({ content }: EditorOutputProps) {
  return <Output data={content} style={style} renderers={renderers} />;
}

export default EditorOutput;
