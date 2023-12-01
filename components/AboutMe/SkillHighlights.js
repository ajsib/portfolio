import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { SiGoogleanalytics as DataAnalyticsIcon } from "react-icons/si";
import { AiOutlineCloudServer as WebDevelopmentIcon } from "react-icons/ai";

const SkillHighlight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; // This ensures the text is centered with the icon
  gap: 1.5rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const pulseAnimation = `@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}`;

const IconWrapper = styled.div`
  font-size: 3rem;
  animation: pulse 2s infinite ease-in-out; // Apply the pulse animation here
  ${pulseAnimation}
`;

const StyledTypography = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 500;
  color: #0174BE;
`;

const SkillHighlights = () => (
  <SkillHighlight>
    <IconWrapper>
      <DataAnalyticsIcon style={{ color: '#0174BE' }} />
    </IconWrapper>
    <StyledTypography variant="body1">
      My analytical compass
    </StyledTypography>
    <IconWrapper>
      <WebDevelopmentIcon style={{ color: '#0174BE' }} />
    </IconWrapper>
    <StyledTypography variant="body1">
      My digital canvas
    </StyledTypography>
  </SkillHighlight>
);

export default SkillHighlights;
