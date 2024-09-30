/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// Define constants for font sizes and spacing
const mainTitleFontSize = '32px';
const subTitleFontSize = '20px';
const quoteFontSize = '24px';
const paragraphFontSize = '16px';
const highlightedTextFontSize = '18px';
const separatorColor = 'var(--color-border)';

const aboutMeSectionStyles = css` 
  padding: 60px 20px;
  background-color: var(--color-component-bg);

  .title {
    font-size: ${mainTitleFontSize};
    font-family: 'Merriweather', serif;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 30px;
    text-align: left;
  }

  .quote {
    font-size: ${quoteFontSize};
    font-family: 'Inter', sans-serif;
    font-style: italic;
    font-weight: 400;
    color: var(--color-secondary);
    text-align: center;
    margin: 40px 0;
  }

  .highlighted-text {
    font-size: ${highlightedTextFontSize};
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    color: var(--color-primary);
    text-align: left;
    margin-bottom: 24px;
  }

  .paragraph {
    font-size: ${paragraphFontSize};
    font-family: 'Source Sans Pro', sans-serif;
    color: var(--color-text);
    line-height: 1.6;
    margin-bottom: 20px;
    text-align: justify;
  }

  .section-title {
    font-size: ${subTitleFontSize};
    font-family: 'Merriweather', serif;
    font-weight: 700;
    color: var(--color-primary);
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: left;
  }

  .highlight-box {
    background-color: var(--color-background);
    padding: 20px;
    border-left: 4px solid var(--color-primary);
    margin-bottom: 30px;
  }

  .asymmetric-layout {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .text-block {
    flex: 1 1 45%;
    margin-bottom: 30px;

    &:nth-of-type(odd) {
      margin-right: 5%;
    }
  }
`;

const separatorStyles = css`
  width: 100%;
  height: 1px;
  background-color: ${separatorColor};
  margin: 20px 0; /* Adjust the space around the line for formality */
`;

const AboutMe = () => {
  return (
    <section css={aboutMeSectionStyles}>
      <h1 className="title">My Ethos</h1>

      <div className="quote">
      &quot;Innovation drives my passion; discipline shapes my approach.&quot;
      </div>

      <div className="asymmetric-layout">
        <div className="text-block">
          <h2 className="section-title">Merging Worlds</h2>
          <p className="paragraph">
            I&apos;ve always believed in the power of blending seemingly disparate worlds. My journey started with the
            rigorous discipline of the Canadian Army Reserves, where I learned that leadership is more than just a rank—it&apos;s
            a responsibility. This foundation set the stage for my transition into the realm of technology.
          </p>
          <div className="highlight-box">
            <p className="highlighted-text">
            &quot;The intersection of military precision and technical innovation defines my approach to project leadership.&quot;
            </p>
          </div>
        </div>

        <div className="text-block">
          <h2 className="section-title">A Strategic Mindset</h2>
          <p className="paragraph">
            While pursuing a degree in Computer Science, I delved deep into Artificial Intelligence, gaining a
            solid grounding in data science and machine learning. This academic rigor complemented the strategic
            thinking and problem-solving skills honed in the military, allowing me to see challenges through a
            unique interdisciplinary lens.
          </p>
        </div>

        <div className="text-block">
          <h2 className="section-title">Innovation in Action</h2>
          <p className="paragraph">
            My shift into web development was sparked by a drive to self-learn and explore the creative potential of
            programming. Here, I found a new passion—building scalable, enterprise-grade software that not only
            meets business needs but also pushes the boundaries of what technology can achieve.
          </p>
          <div className="highlight-box">
            <p className="highlighted-text">
            &quot;Building software is not just about writing code; it&apos;s about crafting solutions that drive impact.&quot;
            </p>
          </div>
        </div>

        <div className="text-block">
          <h2 className="section-title">Leadership in Technology</h2>
          <p className="paragraph">
            Today, I lead cross-functional teams in developing innovative solutions that are as strategic as they are
            technically sound. My leadership is grounded in a commitment to continuous learning and a focus on
            delivering high-impact results. Whether architecting complex systems or guiding teams through challenges,
            I&apos;m driven by a relentless pursuit of excellence.
          </p>
        </div>
      </div>

      <div className="quote">
      &quot;From the battlefield to the boardroom, my journey is a testament to the power of strategic thinking and innovation.&quot;
      </div>
      <div css={separatorStyles}></div>
    </section>
  );
};

export default AboutMe;
