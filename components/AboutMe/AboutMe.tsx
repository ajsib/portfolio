// AboutMe.tsx
import React from 'react';
import styled from '@emotion/styled';
import InterdiscStatement from './InterdisciplinaryStatement';
import IntroStatement from './IntroStatement';
import LearningStatement from './LearningStatement';
import ProfilePic from './ProfilePicture';
import SkillHighlights from './SkillHighlights';

const AboutSection = styled.section`
  display: flex;
  justify-content: center; // Center the content wrapper
  padding: 4rem 1rem;
  background-color: #fff;
  color: #0C356A;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 1200px; // Set a max-width for large screens

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-left: auto; // Pushes the text container to the right

  @media (min-width: 768px) {
    // Stagger the text elements for non-small screens
    &:nth-child(3) {
      margin-left: -8%; // InterdiscStatement moved slightly to the left
    }
    &:nth-child(4) {
      margin-left: -8%; // SkillHighlights moved slightly to the left
    }
    align-items: flex-start;
  }
`;

const AboutMe = () => {
  return (
    <AboutSection>
      <ContentWrapper>
        <ProfilePic src="/photos/aidanAvatar.png" alt="Aidan Sibley" />
        <TextContainer>
          <IntroStatement />
          <LearningStatement />
          <InterdiscStatement />
          <SkillHighlights />
        </TextContainer>
      </ContentWrapper>
    </AboutSection>
  );
};

export default AboutMe;
