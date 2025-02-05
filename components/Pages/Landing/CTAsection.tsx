/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

const ctaSectionStyles = css`
  padding: 80px 20px;
  text-align: center;
  border-top: 2px solid var(--border-color);
  background-color: var(--bg-component);
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 36px;
    font-family: 'Merriweather', serif;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
    font-family: 'Inter', sans-serif;
    color: var(--text-T2);
    margin-bottom: 40px;
    line-height: 1.8;
    max-width: 800px;
  }

  .cta-button {
    display: inline-block;
    padding: 14px 28px;
    font-size: 18px;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    color: var(--text-T1);
    background-color: var(--color-primary);
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    border-radius: var(--radius-default);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: var(--link-hover-color);
      transform: scale(1.05);
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    }

    &:focus {
      outline: 2px solid var(--color-accent);
      outline-offset: 4px;
    }
  }

  .secondary-action {
    display: block;
    margin-top: 20px;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    color: var(--text-T5);
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
    window.location.href = emailLink.href;
  };

  return (
    <section css={ctaSectionStyles}>
      <h2>Let&apos;s Create Your Vision Together</h2>
      <p>
        Ready to take the next step? Whether you need a strategic partner, a solution architect, or a team leader, I&apos;m here to help bring your ideas to life. Let&apos;s build something extraordinary.
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
