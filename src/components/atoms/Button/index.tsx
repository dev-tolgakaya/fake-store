import styled, { css } from "styled-components";

type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
};

const Button = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease, color 0.2s ease;

  ${({ variant, theme }) => {
    switch (variant) {
      case "secondary":
        return css`
          background-color: ${theme.secondaryBg};
          color: ${theme.secondaryText};

          &:hover {
            background-color: ${theme.secondaryBgHover};
          }
        `;
      case "tertiary":
        return css`
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          font-size: 0.95rem;
          color: ${theme.tertiaryText};
          cursor: pointer;
          margin-bottom: 1rem;
          padding: 0;
          z-index: 2;
          position: relative;
          &:hover {
            text-decoration: underline;
          }
        `;
      case "primary":
      default:
        return css`
          background-color: ${theme.buttonBg};
          color: ${theme.buttonText};

          &:hover {
            background-color: ${theme.buttonHoverBg};
          }
        `;
    }
  }}
`;

export default Button;
