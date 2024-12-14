/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TimelineItem from './TimelineItem';
import timelineData from './dummy_timeline.json';
import Masonry from 'react-masonry-css';

const sectionTitleStyles = css`
  font-size: 32px;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 60px;
  margin-top: 60px;
`;

const timelineContainerStyles = css`
  position: relative;
  padding: 0 20px 60px;
  background-color: var(--color-component-bg);
  display: flex;
  justify-content: center;
  width: 100%;

  /* Vertical line in the center for desktop */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background-color: var(--color-border);

    @media (max-width: 700px) {
      /* On mobile, move line to the left */
      left: 30px;
      transform: none;
    }
  }
`;

const masonryStyles = css`
  display: flex;
  width: 100%;
  max-width: 1200px;

  .timeline-column {
    background-clip: padding-box;
  }

  /* Increase spacing between items to give more breathing room */
  .timeline-column > div {
    position: relative;
    margin-bottom: 140px; /* Increased from 100px to 140px */
  }

  .timeline-column:first-of-type {
    padding-right: 60px;
  }

  .timeline-column:last-of-type {
    padding-left: 60px;
    margin-top: 100px; /* Slightly more offset for visual balance */
  }

  @media (max-width: 700px) {
    /* On mobile: single column, line on left side */
    flex-direction: column;
    align-items: flex-start;

    .timeline {
      width: 100%;
    }

    .timeline-column {
      padding: 0 !important;
      margin-top: 0 !important;
    }

    &::before {
      left: 20px;
      transform: none;
    }

    .timeline-column > div {
      margin-bottom: 60px; /* Reduce spacing slightly on mobile for continuity */
      padding-left: 60px; /* Indent content so that line and icon appear connected on the left */
      position: relative;
    }
  }
`;

const Timeline: React.FC = () => {
  const breakpointColumnsObj = {
    default: 2, 
    700: 1
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
