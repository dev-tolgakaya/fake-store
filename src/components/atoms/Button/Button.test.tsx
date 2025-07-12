import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./index";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@/styles/theme";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe("Button component", () => {
  it("renders the button with children", () => {
    const { getByText } = renderWithTheme(<Button>Sepete Ekle</Button>);
    expect(getByText("Sepete Ekle")).toBeInTheDocument();
  });

  it("triggers onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = renderWithTheme(
      <Button onClick={handleClick}>Tıkla</Button>
    );
    fireEvent.click(getByText("Tıkla"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies additional props correctly", () => {
    const { getByTestId } = renderWithTheme(
      <Button type="submit" data-testid="custom-button">
        Gönder
      </Button>
    );
    expect(getByTestId("custom-button")).toHaveAttribute("type", "submit");
  });

  it("renders secondary variant", () => {
    const { getByText } = renderWithTheme(
      <Button variant="secondary">İkincil</Button>
    );
    expect(getByText("İkincil")).toBeInTheDocument();
  });

  it("renders tertiary variant", () => {
    const { getByText } = renderWithTheme(
      <Button variant="tertiary">Üçüncül</Button>
    );
    expect(getByText("Üçüncül")).toBeInTheDocument();
  });
});
