import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 4px solid #eee;
  border-top: 4px solid #f44336;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${spin} 1s linear infinite;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageLoading = () => (
  <Overlay>
    <Loader />
  </Overlay>
);

export default PageLoading;
