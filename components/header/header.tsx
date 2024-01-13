// Header.tsx
import React from 'react';
import { Typography } from '@mui/material';

import StyledHeader from './StyledHeader';
import StyledButton from './StyledButton';

const Header = () => {
  return (
    <StyledHeader>
      <Typography variant="h4" component="h1" sx={{ flexGrow: 1, color: 'white', fontFamily: 'Roboto', fontWeight: 'bold' }}>
        Aidan Sibley
      </Typography>
      
      <StyledButton>
        About Me
      </StyledButton>

      <StyledButton>
        Projects & Experience
      </StyledButton>

      <StyledButton color="#FFC436">
        Download Resume
      </StyledButton>

      <StyledButton>
        Contact Me
      </StyledButton>

    </StyledHeader>
  );
};

export default Header;
