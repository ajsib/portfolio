/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import AboutMeHeader from "./components/AboutMe"
import InfoCards from "./components/InfoCards"


const containerStyle = css`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const AboutMe = () => {
  return (
    <div css={containerStyle}>
      <AboutMeHeader/>
      <InfoCards/>
    </div>
  );
};

export default AboutMe;
