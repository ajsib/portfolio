import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';

const ProfileContainer = styled.div`
  flex: 1;
  text-align: center;

  @media (min-width: 768px) {
    width: 50%;
    text-align: left;
  }
`;

const StyledAvatar = styled(Avatar)`
  width: 220px;
  height: 220px;
  margin: auto;
`;

const ProfilePicture = ({ src, alt }) => (
  <ProfileContainer>
    <StyledAvatar src={src} alt={alt} />
  </ProfileContainer>
);

export default ProfilePicture;
