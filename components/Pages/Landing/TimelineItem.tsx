/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { FaUniversity, FaLaptopCode, FaBriefcase, FaCrown } from 'react-icons/fa';
import Image from 'next/image';
import SummaryParser from './SummaryParser';

interface TimelineItemProps {
  date: string;
  title: string;
  summary: string;
  icon: string;
  image?: string;
  lessonsLearned?: string;
  readMoreUrl?: string;
  position: 'left' | 'right';
}

const iconMapping: { [key: string]: JSX.Element } = {
  FaUniversity: <FaUniversity />,
  FaLaptopCode: <FaLaptopCode />,
  FaBriefcase: <FaBriefcase />,
  FaCrown: <FaCrown />,
};

const timelineItemStyles = (position: 'left' | 'right') => css`
  position: relative;
  width: 100%;
  padding: 15px;
  background-color: transparent;
  border: 1px solid var(--color-border);
  overflow: visible;

  ${position === 'right' ? 'top: 0%;' : 'left: 0;'}

  .icon {
    position: absolute;
    top: 20px;
    right: -10px;
    background-color: var(--color-primary);
    color: #fff;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    z-index: 10;
  }

  .date {
    font-size: 14px;
    color: var(--color-muted);
    margin-bottom: 10px;
  }

  h3 {
    font-size: 20px;
    color: var(--color-primary);
    margin-bottom: 10px;
    font-family: 'Inter', sans-serif;
    padding-right: 70px;
  }

  .summary {
    font-size: 16px;
    color: var(--color-text);
    text-align: justify-left;
    margin-bottom: 10px;
    font-family: 'Merriweather', serif;
  }

  .lessons-container {
    background-color: var(--color-background);
    padding-top: 10px;
    border-bottom: 3px solid var(--color-primary);
    margin: 25px 0px;
    font-size: 12px;
    color: var(--color-secondary);
    font-style: italic;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center; /* Center text horizontally */
    // height: 40px; /* Ensure enough height for vertical centering */
  }

  .read-more {
    font-size: 14px;
    color: var(--color-primary);
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    position: absolute;
    bottom: 10px;
    right: 10px;

    &:hover {
      text-decoration: underline;
      .arrow {
        transform: translateX(5px);
      }
    }

    .arrow {
      margin-left: 5px;
      transition: transform 0.2s ease;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    margin-left: 20px;

    .icon {
      right: 10px;
    }
  }
`;

const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  summary,
  icon,
  image,
  lessonsLearned,
  readMoreUrl,
  position,
}) => {
  return (
    <div css={timelineItemStyles(position)}>
      <span className="date">{date}</span>
      <h3>{title}</h3>
      <div className="icon">{iconMapping[icon]}</div>
      <div className="summary">
        <SummaryParser summary={summary} />
      </div>
      {image && (
        <div className="image-container">
          <Image src={image} alt={title} width={400} height={200} />
        </div>
      )}
      {lessonsLearned && (
        <div className="lessons-container">
          {lessonsLearned.split('\n').map((lesson, index) => (
            <p key={index}>{lesson}</p>
          ))}
        </div>
      )}
      {readMoreUrl && (
        <a href={readMoreUrl} className="read-more">
          Read More
          <span className="arrow">➔</span>
        </a>
      )}
    </div>
  );
};

export default TimelineItem;
