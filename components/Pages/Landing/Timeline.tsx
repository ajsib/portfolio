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
  margin: 60px 0;
`;

const masonryStyles = css`
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 40px;

  .timeline-column {
    background-clip: padding-box;
  }

  .timeline-column > div {
    position: relative;
    margin-bottom: 80px;
  }

  .timeline-column:first-of-type {
    padding-right: 30px;
  }

  .timeline-column:last-of-type {
    padding-left: 30px;
    margin-top: 140px;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;

    .timeline-column {
      padding: 0;
      margin-top: 0;
    }

    .timeline-column > div {
      margin-bottom: 40px;
      padding-left: 40px;
    }

    &::before {
      left: 20px;
    }
  }
`;

const timelineContainerStyles = css`
  position: relative;
  padding: 0 20px 60px;
  background-color: var(--bg-component);
  display: flex;
  justify-content: center;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background-color: var(--border-color);

    @media (max-width: 700px) {
      left: 30px;
      transform: none;
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
