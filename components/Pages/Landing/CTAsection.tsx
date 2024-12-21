/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const ctaSectionStyles = css`
  padding: 80px 20px;
  text-align: center;
  border-top: 2px solid var(--color-border);
  background-color: var(--color-component-bg);
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 36px; /* Larger for emphasis */
    font-family: 'Merriweather', serif;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
    font-family: 'Inter', sans-serif;
    color: var(--color-text);
    margin-bottom: 40px;
    line-height: 1.8; /* Better readability */
    max-width: 800px; /* Center text with limited width */
  }

  .cta-button {
    display: inline-block;
    padding: 14px 28px;
    font-size: 18px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    color: #fff;
    background-color: var(--color-primary);
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    border-radius: 6px; /* Slightly rounded corners for a modern look */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* Darker shadow for better contrast in dark mode */

    &:hover {
      background-color: var(--color-link);
      transform: scale(1.05);
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced hover shadow */
    }

    &:focus {
      outline: 2px solid var(--color-primary-hover);
      outline-offset: 4px;
    }
  }

  .secondary-action {
    display: block;
    margin-top: 20px;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    color: var(--color-muted);
    text-decoration: underline;
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-primary);
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 28px;
    }

    p {
      font-size: 18px;
      text-align: center;
    }

    .cta-button {
      width: 100%;
      padding: 15px;
    }
  }
`;


const CallToAction = () => {
  const handleHighlight = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const emailLink = event.currentTarget;
    emailLink.classList.add('highlighted');
    setTimeout(() => emailLink.classList.remove('highlighted'), 2000);
    window.location.href = emailLink.href; // Proceed to mailto link
  };

  return (
    <section css={ctaSectionStyles}>
      <h2>Let&apos;s Create Your Vision Together</h2>
      <p>
        Ready to take the next step? Whether you need a strategic partner, a solution architect, or a team leader, I&apos;m here to help bring your ideas to life. Le&apos;s build something extraordinary.
      </p>
      <a
        href="mailto:contact@ajsibley.com?subject=Let's%20Collaborate!"
        className="cta-button"
        onClick={handleHighlight}
      >
        Contact Me Now
      </a>
      <a
        href="/portfolio"
        className="secondary-action"
      >
        Explore My Work
      </a>
    </section>
  );
};

export default CallToAction;
