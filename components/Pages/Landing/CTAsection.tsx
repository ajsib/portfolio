/** @jsxImportSource @emotion/react */
import React from 'react';
import { ctaSectionStyles } from './styles';

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
      <h2>Let&apos;s Build Something Together</h2>
      <p>
        Whether you&apos;re looking for a technical leader, a solution architect, or a collaborator to bring your vision to life, I&apos;m here to help. Let&apos;s connect and make it happen.
      </p>
      <a
        href="mailto:contact@ajsibley.com?subject=Let's%20Collaborate!"
        className="cta-button"
        onClick={handleHighlight}
      >
        Get in Touch
      </a>
    </section>
  );
};

export default CallToAction;
