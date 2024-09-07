import { useMemo } from 'react';

type ContentNode = {
  type: 'text' | 'math-inline' | 'math-block' | 'html';
  content: string;
};

export const useContentParser = (sanitizedContent: string): ContentNode[] => {
  return useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedContent, 'text/html');

    return Array.from(doc.body.childNodes).map((node): ContentNode => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        switch (element.tagName.toLowerCase()) {
          case 'math-inline':
            return { type: 'math-inline', content: element.textContent || '' };
          case 'math-block':
            return { type: 'math-block', content: element.textContent || '' };
          default:
            return { type: 'html', content: element.outerHTML };
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        return { type: 'text', content: node.textContent || '' };
      }
      return { type: 'text', content: '' };
    });
  }, [sanitizedContent]);
};