import { render, screen, fireEvent } from "@testing-library/react";
import SearchAndFilterBar from "./index";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@/styles/theme";

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

  it("renders all input and select fields", () => {
    renderWithProviders();

    expect(screen.getByPlaceholderText("Ürün ara...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Min Fiyat")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Max Fiyat")).toBeInTheDocument();
    expect(screen.getByText("Fiyat (Artan)")).toBeInTheDocument();
    expect(screen.getByText("Fiyat (Azalan)")).toBeInTheDocument();
    expect(screen.getByText("Tüm Kategoriler")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(screen.getByText("jewelery")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ara/i })).toBeInTheDocument();
  });

  it("updates URL on submit", () => {
    renderWithProviders();

    fireEvent.change(screen.getByPlaceholderText("Ürün ara..."), {
      target: { value: "telefon" },
    });
    fireEvent.change(screen.getByPlaceholderText("Min Fiyat"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Max Fiyat"), {
      target: { value: "5000" },
    });
    fireEvent.change(screen.getByDisplayValue("Fiyat (Artan)"), {
      target: { value: "desc" },
    });
    fireEvent.change(screen.getByDisplayValue("Tüm Kategoriler"), {
      target: { value: "electronics" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Ara/i }));

    expect(push).toHaveBeenCalledWith(expect.stringContaining("search=telefon"));
    expect(push).toHaveBeenCalledWith(expect.stringContaining("minPrice=100"));
    expect(push).toHaveBeenCalledWith(expect.stringContaining("maxPrice=5000"));
    expect(push).toHaveBeenCalledWith(expect.stringContaining("sort=desc"));
    expect(push).toHaveBeenCalledWith(expect.stringContaining("category=electronics"));
  });

  it("automatically updates URL when sort or category changes", () => {
    renderWithProviders();

    fireEvent.change(screen.getByDisplayValue("Fiyat (Artan)"), {
      target: { value: "desc" },
    });

    fireEvent.change(screen.getByDisplayValue("Tüm Kategoriler"), {
      target: { value: "electronics" },
    });

    expect(push).toHaveBeenCalledWith(expect.stringContaining("sort=desc"));
    expect(push).toHaveBeenCalledWith(expect.stringContaining("category=electronics"));
  });
});
