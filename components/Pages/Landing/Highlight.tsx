// components/UI/Highlight.tsx
import React, { useEffect, useState } from 'react';
import Popover from './Popover';

// Simulate loading popover content from external files or JSON
import popoverContent from './popoverContent.json'; // Adjust the path as necessary

interface HighlightProps {
  keyword: string;
  contentKey: string;
}

const Highlight: React.FC<HighlightProps> = ({ keyword, contentKey }) => {
  const [content, setContent] = useState<{ title: string; description: string; imageUrl?: string }>({
    title: '',
    description: '',
  });

  useEffect(() => {
    // Load content based on the contentKey
    if (popoverContent[contentKey]) {
      setContent(popoverContent[contentKey]);
    } else {
      setContent({
        title: 'Content not found',
        description: `No content available for ${keyword}.`,
      });
    }
  }, [contentKey, keyword]);

  return (
    <Popover title={content.title} description={content.description} imageUrl={content.imageUrl}>
      <span
        style={{
          backgroundColor: 'var(--color-highlight)',
          fontWeight: 'bold',
          fontFamily: 'Inter, sans-serif',
          cursor: 'pointer',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--color-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'inherit';
        }}
      >
        {keyword}
      </span>
    </Popover>
  );
};

export default Highlight;
