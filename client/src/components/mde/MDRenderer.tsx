import React from 'react'
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import slug from 'remark-slug'
import footnotes from 'remark-footnotes'
import rehypeRaw from 'rehype-raw'
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

const Blockquote = styled.blockquote`
  border-left: .25em solid ${({theme}) => theme.palette.sky2};
  background: ${({theme}) => theme.palette.gray0};
  padding: 1rem 1rem 1rem 1.5rem;
  margin: 1.5rem 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  
  & p {
    margin: 0;
  }
`;

const Code = styled.code`
    padding: .2em .4em;
    background-color: ${({theme}) => theme.palette.gray1};
    margin: 0;
    font-size: 96%;
    color: inherit;
    border-radius: 3px;
`;

const CustomStyle ={
  overflowX: 'auto'
};

interface componentsProps {
  node: any; 
  inline: any;
  className: any;
  children: any;
}

const components: any = {
  code({node, inline, className, children, ...props}: componentsProps) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter style={dark} customStyle={CustomStyle} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
    ) : (
      <Code children={children}  {...props} />
    )
  },
  th: ({node, ...props}: componentsProps) => <Th {...props} />,
  td: ({node, ...props}: componentsProps) => <Td {...props} />,
  tr: ({node, ...props}: componentsProps) => <Tr {...props} />,
  blockquote: ({node, ...props}: componentsProps) => <Blockquote {...props} />,
}

interface MDRendererProps {
  contents: string;
}
const MDRenderer = ({contents}: MDRendererProps) => {
    return (
        <ReactMarkdown  
                        remarkPlugins={[gfm,slug,footnotes] as any}
                        rehypePlugins={[rehypeRaw as any]}
                        components={components}
                        children={contents}
        />
    )
}

export default MDRenderer;