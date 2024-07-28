/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

const containerStyle = css`
  background-color: var(--background-color);
  color: var(--text-color);
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 4rem 8rem;
  overflow: hidden; /* Ensure no overflow */
`;

const leftContainerStyle = (transform: number) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  transform: translateX(${transform}px);
  transition: transform 0.5s ease;
`;

const rightContainerStyle = (transform: number) => css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 3;
  padding: 2rem;
  transform: translateX(${transform}px);
  transition: transform 0.5s ease;
`;

const titleStyle = css`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-style: italic;
`;

const carouselContainerStyle = css`
  height: 50vh;
  aspect-ratio: 9 / 16;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const descriptionContainerStyle = css`
  display: flex;
  padding-right: 8vw;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const textStyle = css`
  font-size: 1.25rem;
  line-height: 1.6;
  text-align: left;
`;

const AboutMe = () => {
  const [leftTransform, setLeftTransform] = useState(-200); // Initial transform value
  const [rightTransform, setRightTransform] = useState(200); // Initial transform value

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 2.6 * window.innerHeight;

      if (scrollY > threshold) {
        setLeftTransform(0);
        setRightTransform(0);
      } else {
        setLeftTransform(-200);
        setRightTransform(200);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div css={containerStyle}>
      <div css={leftContainerStyle(leftTransform)}>
        <div css={carouselContainerStyle}>
          {/* Photo Carousel will go here */}
        </div>
      </div>
      <div css={rightContainerStyle(rightTransform)}>
        <div css={titleStyle}>ABOUT ME</div>
        <div css={descriptionContainerStyle}>
          <p css={textStyle}>
            {/* Description will go here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
