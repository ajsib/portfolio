/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaUniversity, FaLaptopCode, FaBriefcase, FaCrown } from 'react-icons/fa';
import Image from 'next/image';

interface TimelineItemProps {
  title: string;
  summary: string;
  icon: string;
  image?: string;
  lessonsLearned?: string;
  readMoreUrl?: string;
  position: 'left' | 'right';
}

const iconSize = 40;
const lineThickness = 2;

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
  display: flex;
  flex-direction: column;
  text-align: ${position === 'left' ? 'right' : 'left'};
  font-family: 'Inter', sans-serif;

  &::after {
    content: '';
    position: absolute;
    top: ${28 + iconSize / 2 - lineThickness / 2}px;
    ${position === 'left' ? 'right: -30px;' : 'left: -30px;'}
    height: ${lineThickness}px;
    background-color: var(--border-color);

    @media (max-width: 768px) {
      content: none;
    }
  }

  .icon {
    position: absolute;
    top: 28px;
    ${position === 'left' ? 'right: -70px;' : 'left: -70px;'}
    background-color: var(--color-primary);
    color: var(--bg-component);
    width: ${iconSize}px;
    height: ${iconSize}px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    @media (max-width: 768px) {
      position: static;
      margin-bottom: 20px;
    }
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 10px;

    @media (max-width: 768px) {
      text-align: left;
    }
  }

  .summary {
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-T2);
    margin-bottom: 20px;

    @media (max-width: 768px) {
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
      border: 1px solid var(--border-color);
    }

    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  .lessons-container {
    font-size: 14px;
    color: var(--color-secondary);
    font-style: italic;
    border-top: 1px solid var(--border-color);
    padding-top: 10px;
    margin: 20px 0;

    @media (max-width: 768px) {
      text-align: left;
    }
  }

  .read-more {
    font-size: 14px;
    color: var(--color-primary);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: var(--link-hover-color);
      text-decoration: underline;
    }
  }
`;

const TimelineItem: React.FC<TimelineItemProps> = ({
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
      <div className="summary">{summary}</div>
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
