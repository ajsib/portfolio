// @/modules/Landing/Footer/index.tsx
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const footerStyle = css`
  background-color: var(--secondary-color);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2em;
`;

const Footer = () => {
  return (
    <div css={footerStyle}>
      Footer Section
    </div>
  );
};

export default Footer;
