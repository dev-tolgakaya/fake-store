import { render, screen, fireEvent } from "@testing-library/react";
import SearchAndFilterBar from "./index";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@/styles/theme";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        "search.searchPlaceholder": "Ürün ara...",
        "search.minPrice": "Min Fiyat",
        "search.maxPrice": "Max Fiyat",
        "search.sortAsc": "Fiyat (Artan)",
        "search.sortDesc": "Fiyat (Azalan)",
        "search.allCategories": "Tüm Kategoriler",
        "search.searchBtn": "Ara",
        "search.clearBtn": "Temizle",
      };
      return map[key] || key;
    },
  }),
}));

import { useRouter } from "next/navigation";
const push = jest.fn();

describe("SearchAndFilterBar", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    push.mockClear();
  });

  const defaultProps = {
    initialSearch: "",
    sort: "asc",
    category: "",
    categories: ["electronics", "jewelery"],
    minPrice: "",
    maxPrice: "",
  };

  const renderWithProviders = () =>
    render(
      <ThemeProvider theme={lightTheme}>
        <SearchAndFilterBar {...defaultProps} />
      </ThemeProvider>
    );

  it("renders all inputs", () => {
    renderWithProviders();
    expect(screen.getByPlaceholderText("Ürün ara...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Min Fiyat")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Max Fiyat")).toBeInTheDocument();
    expect(screen.getByText("Ara")).toBeInTheDocument();
    expect(screen.getByText("Temizle")).toBeInTheDocument();
  });

  it("submits with proper query", async () => {
    renderWithProviders();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Ürün ara..."), "telefon");
    await user.type(screen.getByPlaceholderText("Min Fiyat"), "100");
    await user.type(screen.getByPlaceholderText("Max Fiyat"), "5000");

    const sortSelect = screen.getAllByText("Fiyat (Artan)")[0];
    await user.click(sortSelect);
    await user.click(screen.getByText("Fiyat (Azalan)"));

    const catSelect = screen.getByText("Tüm Kategoriler");
    await user.click(catSelect);
    await user.click(screen.getByText("electronics"));

    await user.click(screen.getByText("Ara"));

    expect(push).toHaveBeenCalledWith(expect.stringContaining("search=telefon"));
    expect(push).toHaveBeenCalledWith(expect.stringContaining("minPrice=100"));
    expect(push).toHaveBeenCalledWith(expect.stringContaining("maxPrice=5000"));
    expect(push).toHaveBeenCalledWith(expect.stringContaining("sort=desc"));
    expect(push).toHaveBeenCalledWith(expect.stringContaining("category=electronics"));
  });
});
