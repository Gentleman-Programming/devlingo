import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import theme from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark';

import { CodeContainer } from '@/pages/Dashboard/styled-components';
import { useRef } from 'react';

SyntaxHighlighter.registerLanguage('javascript', js);

const onClick = (element: React.RefObject<HTMLDivElement>) => {
  if (element.current instanceof HTMLDivElement) {
    element.current.requestFullscreen();
  }
};

export default function Code({ text }: { text: string }) {
  const codeRef = useRef<HTMLDivElement>(null);
  return (
    <CodeContainer ref={codeRef} onClick={() => onClick(codeRef)}>
      <SyntaxHighlighter language="javascript" style={theme} showLineNumbers wrapLines>
        {text}
      </SyntaxHighlighter>
    </CodeContainer>
  );
}
