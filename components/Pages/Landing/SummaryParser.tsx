// components/UI/SummaryParser.tsx
import React from 'react';
import Highlight from './Highlight';

interface SummaryParserProps {
  summary: string;
}

const SummaryParser: React.FC<SummaryParserProps> = ({ summary }) => {
  const parseSummary = (text: string) => {
    const regex = /<highlight keyword='(.*?)' contentKey='(.*?)'><\/highlight>/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>);
      }
      parts.push(
        <Highlight key={match.index} keyword={match[1]} contentKey={match[2]} />
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    }

    return parts;
  };

  return <div>{parseSummary(summary)}</div>;
};

export default SummaryParser;
