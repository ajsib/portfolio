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

const iconSize = 40; // Icon container size
const lineThickness = 2; // Connector line thickness

const iconMapping: { [key: string]: JSX.Element } = {
  FaUniversity: <FaUniversity />,
  FaLaptopCode: <FaLaptopCode />,
  FaBriefcase: <FaBriefcase />,
  FaCrown: <FaCrown />,
};

const timelineItemStyles = (position: 'left' | 'right') => css`
  position: relative;
  width: 100%;
  padding: 40px 0;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  text-align: ${position === 'left' ? 'right' : 'left'};

  /* The small horizontal connector line, centered vertically on the icon */
  &::after {
    content: '';
    position: absolute;
    top: ${28 + iconSize / 2 - lineThickness / 2}px; 
    /* 28px is icon top offset, icon is 40px high, so midpoint ~28 + 20 = 48px */
    ${position === 'left' ? 'right: -30px;' : 'left: -30px;'}
    width: 30px;
    height: ${lineThickness}px;
    background-color: var(--color-border);

    @media (max-width: 700px) {
      /* On mobile, no horizontal line since layout changes */
      content: none;
    }
  }

  .icon {
    position: absolute;
    top: 28px;
    ${position === 'left' ? 'right: -70px;' : 'left: -70px;'}
    background-color: var(--color-primary);
    color: #fff;
    width: ${iconSize}px;
    height: ${iconSize}px;
    border-radius: 50%;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2; /* Ensure icon is above the line */

    @media (max-width: 700px) {
      position: static;
      margin-bottom: 20px;
      align-self: flex-start;
      width: ${iconSize}px;
      height: ${iconSize}px;
      margin-left: 0;
    }
  }

  h3 {
    font-size: 20px;
    color: var(--color-primary);
    margin-bottom: 10px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    @media (max-width: 700px) {
      text-align: left;
    }
  }

  .date {
    font-size: 14px;
    color: var(--color-secondary);
    margin-bottom: 20px;
    font-family: 'Inter', sans-serif;
    @media (max-width: 700px) {
      text-align: left;
    }
  }

  .summary {
    font-size: 16px;
    color: var(--color-text);
    margin-bottom: 20px;
    font-family: 'Merriweather', serif;
    line-height: 1.6;
    @media (max-width: 700px) {
      text-align: left;
    }
  }

  .image-container {
    margin: 20px 0;
    display: flex;
    justify-content: ${position === 'left' ? 'flex-end' : 'flex-start'};

    img {
      width: 100%;
      max-width: 500px;
      height: auto;
      border: 1px solid var(--color-border);
    }

    @media (max-width: 700px) {
      justify-content: flex-start;
    }
  }

  .lessons-container {
    margin: 20px 0;
    padding: 10px 0;
    font-size: 14px;
    color: var(--color-secondary);
    font-style: italic;
    line-height: 1.4;
    border-top: 1px solid var(--color-border);
    border-bottom: none;
    font-family: 'Merriweather', serif;
    text-align: ${position === 'left' ? 'right' : 'left'};

    p {
      margin: 0;
    }

    @media (max-width: 700px) {
      text-align: left;
    }
  }

  .read-more {
    font-size: 14px;
    color: var(--color-primary);
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    transition: color 0.2s ease;
    font-family: 'Inter', sans-serif;
    text-decoration: none;
    ${position === 'left' ? 'align-self: flex-end;' : 'align-self: flex-start;'}

    &:hover {
      color: var(--color-primary-hover);
      text-decoration: underline;
    }

    @media (max-width: 700px) {
      align-self: flex-start;
    }
  }

  @media (max-width: 700px) {
    text-align: left;
    padding: 20px 0;

    /* On mobile, we remove the complex positioning and go to a simpler layout */
    &::after {
      content: none; /* No horizontal connector line in mobile layout */
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
      <div className="icon">{iconMapping[icon]}</div>
      <h3>{title}</h3>
      <div className="date">{date}</div>
      <div className="summary">
        <SummaryParser summary={summary} />
      </div>
      {image && (
        <div className="image-container">
          <Image src={image} alt={title} width={500} height={300} />
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
        </a>
      )}
    </div>
  );
};

export default TimelineItem;
