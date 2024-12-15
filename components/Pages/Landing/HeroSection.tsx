/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import { useHeaderContext } from '@/components/Shared/Header/HeaderContext';
import { heroSectionStyles } from './styles';

// Define constants for font sizes and spacin
const separatorColor = 'var(--color-border)'; // Using the border color for a formal line



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
            src="/images/me.webp"
            alt="Portrait of aidan sibley"
            width={250}
            height={250}
            style={{ borderRadius: '50%' }}
          />
        </div>
        <div className="text-container">
          <h1>Aidan Sibley</h1>
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
