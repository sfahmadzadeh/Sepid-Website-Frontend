import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSanitizedContent } from './hooks/useSanitizedContent';
import { useContentParser } from './hooks/useContentParser';
import { ContentRenderer } from './components/ContentRendered';
import { frameStyles } from './styles/frame';
import { fontsStyles } from './styles/fonts';

interface SecureHTMLDisplayProps {
  content: string;
  customStyle?: React.CSSProperties;
}

const StyledContentContainer = styled.div`
  ${frameStyles}
  ${fontsStyles}
`;

const SecureHTMLDisplay: React.FC<SecureHTMLDisplayProps> = ({ content, customStyle = {} }) => {
  const sanitizedContent = useSanitizedContent(content);
  const parsedContent = useContentParser(sanitizedContent);

  const memoizedContent = useMemo(() => (
    <ContentRenderer content={parsedContent} />
  ), [parsedContent]);

  return (
    <StyledContentContainer style={customStyle}>
      {memoizedContent}
    </StyledContentContainer>
  );
};

export default SecureHTMLDisplay;