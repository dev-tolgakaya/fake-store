import { render } from "@testing-library/react";
import Pagination from "./index";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@/styles/theme";

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe("Pagination", () => {
  it("renders correct number of page links", () => {
    const { getByText } = renderWithTheme(
      <Pagination
        currentPage={2}
        totalPages={5}
        baseUrl="/products?category=all"
      />
    );

    for (let i = 1; i <= 5; i++) {
      expect(getByText(i.toString())).toBeInTheDocument();
    }
  });

  it("highlights the active page", () => {
    const { getByText } = renderWithTheme(
      <Pagination
        currentPage={3}
        totalPages={5}
        baseUrl="/products?category=all"
      />
    );

    const activeLink = getByText("3");
    expect(activeLink).toHaveStyle(`background: ${lightTheme.pagination.activeBg}`);
    expect(activeLink).toHaveStyle(`color: ${lightTheme.pagination.activeText}`);
  });

  it("creates correct hrefs for pages", () => {
    const { getByText } = renderWithTheme(
      <Pagination
        currentPage={1}
        totalPages={3}
        baseUrl="/products?category=tech"
      />
    );

    expect(getByText("1").getAttribute("href")).toBe(
      "/products?category=tech&page=1"
    );
    expect(getByText("2").getAttribute("href")).toBe(
      "/products?category=tech&page=2"
    );
    expect(getByText("3").getAttribute("href")).toBe(
      "/products?category=tech&page=3"
    );
  });
});
