/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import WelcomeBanner from "@/modules/Landing/WelcomeBanner";
import AboutMe from "@/modules/Landing/AboutMe";
import Footer from "@/modules/Landing/Footer";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Landing = () => {
  return (
    <div css={containerStyle}>
      <WelcomeBanner />
      <AboutMe />
      <Footer />
    </div>
  );
};

export default Landing;
