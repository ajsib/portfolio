/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TimelineItem from './TimelineItem';
import timelineData from './dummy_timeline.json';
import Masonry from 'react-masonry-css';

const sectionTitleStyles = css`
  font-size: 36px;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 40px;
`;

const timelineContainerStyles = css`
  position: relative;
  padding: 40px 20px;
  background-color: var(--color-component-bg);
  display: flex;
  justify-content: center;
  width: 100%;

  /* Vertical line in the center */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 100%;
    background-color: var(--color-border); /* Line color */
  }
`;

const masonryStyles = css`
  display: flex;
  width: 100%;
  max-width: 1200px; /* Optional: Max width for larger screens */

  .timeline-column {
    background-clip: padding-box;
  }

  .timeline-column > div {
    margin-bottom: 160px; /* Vertical gap between items */
    position: relative;

    /* Add connector lines */
    &::before {
      content: '';
      position: absolute;
      width: 20%;
    }
  }

  /* Padding adjustments */
  .timeline-column:first-of-type {
    padding-right: 80px; /* Right padding for the left column */
  }

  .timeline-column:last-of-type {
    padding-left: 80px; /* Left padding for the right column */
    margin-top: 150px; /* Offset the right column to start below the left column */
  }
`;

const Timeline: React.FC = () => {
  const breakpointColumnsObj = {
    default: 2, // Two columns for large screens
    700: 1      // One column for small screens
  };

  return (
    <section>
      <h2 css={sectionTitleStyles}>My Professional Journey</h2>
      <div css={timelineContainerStyles}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="timeline"
          columnClassName="timeline-column"
          css={masonryStyles}
        >
          {timelineData.timelineData.map((event, index) => (
            <TimelineItem
              key={index}
              date={event.date}
              title={event.title}
              summary={event.summary}
              icon={event.icon}
              image={event.image}
              lessonsLearned={event.lessonsLearned}
              readMoreUrl={event.readMoreUrl}
              position={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default Timeline;
