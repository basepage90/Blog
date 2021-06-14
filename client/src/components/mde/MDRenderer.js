import React from 'react'
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw  from 'rehype-raw'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

const Th = styled.th`
  color: #24292E;
  background-color: #FAFBFF;
  border: 1px solid #DFE2E5;
`;
const Td = styled.td`
  color: #24292E;
  border: 1px solid #DFE2E5;
`;

const Tr = styled.tr`
  color: #24292E;
  border: 1px solid #DFE2E5;
`;

const CustomStyle ={
  overflowX: 'auto'
};

const components = {
  code({node, inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter style={dark} customStyle={CustomStyle} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
    ) : (
      <code className={className} children={children}  {...props} />
    )
  },
  th: ({node, ...props}) => <Th {...props} />,
  td: ({node, ...props}) => <Td {...props} />,
  tr: ({node, ...props}) => <Tr {...props} />,
 
}

const MDRenderer = ({contents}) => {
    return (
        <ReactMarkdown  remarkPlugins={[gfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={components}
                        children={contents}
        />
    )
}

export default MDRenderer;