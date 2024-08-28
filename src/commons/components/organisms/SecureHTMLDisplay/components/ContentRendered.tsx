import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

type ContentNode = {
  type: 'text' | 'math-inline' | 'math-block' | 'html';
  content: string;
};

interface ContentRendererProps {
  content: ContentNode[];
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  return (
    <>
      {content.map((node, index) => {
        switch (node.type) {
          case 'math-inline':
            return <InlineMath key={index} math={node.content} />;
          case 'math-block':
            return <BlockMath key={index} math={node.content} />;
          case 'html':
            return <div key={index} dangerouslySetInnerHTML={{ __html: node.content }} />;
          case 'text':
          default:
            return <span key={index}>{node.content}</span>;
        }
      })}
    </>
  );
};
