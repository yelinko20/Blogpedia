import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CodeRenderer({ data }: any) {
  return (
    <SyntaxHighlighter style={oneDark} language="ts" wrapLongLines={true}>
      {data.code}
    </SyntaxHighlighter>
  );
}

export default CodeRenderer;
