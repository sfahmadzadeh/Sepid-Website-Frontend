import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

export const useSanitizedContent = (content: string): string => {
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    const clean = DOMPurify.sanitize(content, {
      ADD_TAGS: ['math-inline', 'math-block'],
      ADD_ATTR: ['display'],
    });
    setSanitizedContent(clean);
  }, [content]);

  return sanitizedContent;
};