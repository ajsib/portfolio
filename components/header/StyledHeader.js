// StyledHeader.js
import styled from '@emotion/styled';

const StyledHeader = styled.header`
  background-color: #0C356A;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
`;

export default StyledHeader;
