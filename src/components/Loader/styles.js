import styled, { keyframes } from 'styled-components';
export const SpinnerWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #007bff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
