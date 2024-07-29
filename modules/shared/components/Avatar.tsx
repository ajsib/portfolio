/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from 'next/image';
import { useState } from 'react';
import LinkedIn from '@/modules/UI/icons/LinkedIn';

const avatarContainerStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  cursor: pointer;
`;

const avatarImageStyle = css`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  transition: box-shadow 0.3s;
  z-index: 1;
`;

const linkedInIconStyle = (isVisible: boolean) => css`
  position: absolute;
  height: 24px;
  width: 24px;
  right: ${isVisible ? '80px' : '0'};
  opacity: ${isVisible ? '1' : '0'};
  transition: opacity 0.3s, right 0.3s;
`;

const Avatar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLinkedInClick = () => {
    window.location.href = 'https://www.linkedin.com/in/aidansibley';
  };

  return (
    <div
      css={avatarContainerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleLinkedInClick}
    >
      <Image src="/assets/avatar.png" alt="Avatar" width={56} height={56} css={avatarImageStyle} />
      <div css={linkedInIconStyle(isHovered)}>
        <LinkedIn size={24} primaryColor="transparent" secondaryColor="currentColor" />
      </div>
    </div>
  );
};

export default Avatar;
