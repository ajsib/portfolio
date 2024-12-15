/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { aboutMeSectionStyles } from './styles';

const separatorColor = 'var(--color-border)';

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

    {/* First Principles in Action */}
    <div className="text-block">
      <h2 className="section-title">First Principles in Action</h2>
      <p className="paragraph">
      I believe the best solutions come from breaking problems down to their core. While many rely on pre-built modules, 
      I take a handcrafted approach—tailoring each solution to fit the need, 
      nothing more, nothing less. This philosophy ensures that projects are lean, scalable, and truly impactful, delivering long-term value.
      </p>
      <div className="highlight-box">
        <p className="highlighted-text">
          &quot;The simplest systems are the most elegant—clarity is the ultimate sophistication.&quot;
        </p>
      </div>
    </div>

    {/* Innovation Meets Discipline */}
    <div className="text-block">
      <h2 className="section-title">Developer First, Leader Always</h2>
      <p className="paragraph">
        Great leadership starts with knowing the craft. My foundation as a developer has shaped how
        I approach leadership—with attention to detail, a commitment to best practices, and empathy for my team&apos;s challenges.
        Leading a digital transformation initiative for the Canadian Army Headquarters, 
        I guided a team from idea to deployment: writing code, architecting the solution,
      and ensuring the project aligned with the client&apos;s vision.
      </p>
    </div>

    {/* Leadership in Complex Systems */}
    <div className="text-block">
      <h2 className="section-title">Interdisciplinary by Design</h2>
      <p className="paragraph">
      I see the big picture, even in the smallest details. My strength lies in uniting disciplines to create cohesive solutions.
       Drawing from my experience in software development, leadership, and military strategy,
        I take a holistic approach to problem-solving—connecting ideas, people, and processes.
         By identifying patterns in both the granular and the grand, I create systems that are intuitive,
          effective, and aligned with their purpose.
      </p>
      <div className="highlight-box">
        <p className="highlighted-text">
          &quot;Holistic systems are built on granular truths—clarity at every level creates impact.&quot;
        </p>
      </div>
    </div>

    {/* Passion for Craftsmanship */}
    <div className="text-block">
      <h2 className="section-title">Hand Crafted with Purpose</h2>
      <p className="paragraph">
      I&apos;ve always believed that great software isn&apos;t bloated—it&apos;s crafted. Every line of code I write has a purpose.
      By focusing on simplicity, scalability, and maintainability, I create solutions that empower teams, not overwhelm them. 
      Whether it&apos;s the backend architecture or the front-end design, I prioritize craftsmanship that speaks for itself.
      </p>
    </div>

  </div>
  <div css={separatorStyles}></div>
</section>

  );
};

export default AboutMe;
