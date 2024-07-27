/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const infoCardsStyle = css`
  background-color: var(--background-color);
  color: var(--text-color);
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  z-index: 1s;
`;

const InfoCards = () => {
  return (
    <div css={infoCardsStyle}>
      Info Cards Section
    </div>
  );
};

export default InfoCards;
