/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import { useHeaderContext } from '@/components/Shared/Header/HeaderContext';

// Define constants for font sizes and spacing
const headlineFontSize = '36px';
const subHeadlineFontSize = '22px';
const paragraphFontSize = '16px';
const separatorColor = 'var(--color-border)'; // Using the border color for a formal line

const heroSectionStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 80px 20px;
  background-color: var(--color-component-bg);

  @media (max-width: 1000px) {
    flex-direction: column;
    padding: 40px 20px;
  }

  .image-container {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .text-container {
    flex: 2;
    padding-left: 40px;

    @media (max-width: 1000px) {
      padding-left: 0;
      margin-top: 20px;
    }

    h1 {
      font-size: ${headlineFontSize};
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--color-primary);
      text-align: left;
      font-family: 'Inter', sans-serif;
    }

    h2 {
      font-size: ${subHeadlineFontSize};
      font-weight: 400;
      margin-bottom: 24px;
      color: var(--color-secondary);
      text-align: justify;
      font-family: 'Inter', sans-serif;
    }

    p {
      font-size: ${paragraphFontSize};
      line-height: 1.5;
      color: var(--color-text);
      text-align: justify;
      font-family: 'Source Sans Pro', sans-serif;
    }
  }
`;

const separatorStyles = css`
  width: 100%;
  height: 1px;
  background-color: ${separatorColor};
  margin: 20px 0; /* Adjust the space around the line for formality */
`;

const HeroSection = () => {
  const { headerHeight } = useHeaderContext();

  return (
    <>
      <div css={heroSectionStyles} style={{ paddingTop: headerHeight }}>
        <div className="image-container">
          <Image
            src="/images/me.jpeg"
            alt="Portrait of [Your Name]"
            width={250}
            height={250}
            style={{ borderRadius: '50%' }}
          />
        </div>
        <div className="text-container">
          <h1>Driving Enterprise-Grade Software with Innovation</h1>
          <h2>Strategic Thinker. Project Lead. Software Architect.</h2>
          <p>
            With a blend of military discipline and tech expertise, I excel at leading complex projects. My path showcases a passion for innovation, a commitment to lifelong learning, and a focus on delivering strategic, impactful solutions. From building teams to architecting software, I drive projects with precision and purpose.
          </p>
        </div>
      </div>
      <div css={separatorStyles}></div> {/* Horizontal line below the hero section */}
    </>
  );
};

export default HeroSection;
