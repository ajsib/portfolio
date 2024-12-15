/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TimelineItem from './TimelineItem';
import timelineData from './dummy_timeline.json';
import Masonry from 'react-masonry-css';
import { timelineContainerStyles } from './styles';

const sectionTitleStyles = css`
  font-size: 32px;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 60px;
  margin-top: 60px;
`;

const masonryStyles = css`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 40px; /* Gap between columns for desktop */

  .timeline-column {
    background-clip: padding-box;
  }

  /* Give items breathing room */
  .timeline-column > div {
    position: relative;
    margin-bottom: 80px;
  }

  /* Left column adjustments */
  .timeline-column:first-of-type {
    padding-right: 30px;
  }

  /* Right column offset for a staggered and visually distinct layout */
  .timeline-column:last-of-type {
    padding-left: 30px;
    margin-top: 140px; /* Adjust to push the right column further down */
  }

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;

    .timeline-column {
      padding: 0 !important;
      margin-top: 0 !important;
    }

    .timeline-column > div {
      margin-bottom: 40px;
      padding-left: 40px; /* Keep content aligned with the vertical line */
    }

    &::before {
      left: 20px;
    }
  }
`;

const Timeline: React.FC = () => {
  const leftColumnItems = timelineData.timelineData.filter(
    (item, index) => item.column === 'left' || (!item.column && index % 2 === 0)
  );
  const rightColumnItems = timelineData.timelineData.filter(
    (item, index) => item.column === 'right' || (!item.column && index % 2 !== 0)
  );

  return (
    <section>
      <h2 css={sectionTitleStyles}>My Journey</h2>
      <div css={timelineContainerStyles}>
        <Masonry
          breakpointCols={{ default: 2, 700: 1 }}
          className="timeline"
          columnClassName="timeline-column"
          css={masonryStyles}
        >
          <div className="timeline-column">
            {leftColumnItems.map((event, index) => (
              <TimelineItem
                key={`left-${index}`}
                title={event.title}
                summary={event.summary}
                icon={event.icon}
                image={event.image}
                lessonsLearned={event.lessonsLearned}
                readMoreUrl={event.readMoreUrl}
                position="left"
              />
            ))}
          </div>
          <div className="timeline-column">
            {rightColumnItems.map((event, index) => (
              <TimelineItem
                key={`right-${index}`}
                title={event.title}
                summary={event.summary}
                icon={event.icon}
                image={event.image}
                lessonsLearned={event.lessonsLearned}
                readMoreUrl={event.readMoreUrl}
                position="right"
              />
            ))}
          </div>
        </Masonry>
      </div>
    </section>
  );
};

export default Timeline;
