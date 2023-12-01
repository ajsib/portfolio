import styled from '@emotion/styled';

const StyledButton = styled.button`
  font-family: 'Roboto', sans-serif; 
  font-weight: bold;
  font-size: 1.25rem;
  color: ${props => props.color || '#ffffff'}; // Dynamic color based on props
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 0.5rem 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.color || '#ffffff'}; // Dynamic color for underline
    transition: width 0.5s;
  }

  &:hover::after {
    width: 100%;
  }
`;

export default StyledButton;
