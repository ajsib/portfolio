/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import WelcomeBanner from "@/modules/Landing/WelcomeBanner";
import AboutMe from "@/modules/Landing/AboutMe";
import Footer from "@/modules/Landing/Footer";
import Header from "@/modules/shared/Header";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
`;

const Landing = () => {
  return (
    <div css={containerStyle}>
      <Header threshold={200} />
      <WelcomeBanner />
      <AboutMe />
      <Footer />
    </div>
  );
};

export default Landing;
