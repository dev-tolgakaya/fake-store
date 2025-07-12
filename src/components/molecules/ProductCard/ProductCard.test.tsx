import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./index";
import { CartContext } from "@/contexts/CartContext";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "@/styles/theme";

jest.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

const mockProduct = {
  id: 1,
  title: "Test Ürünü",
  image: "https://via.placeholder.com/150",
  price: 199,
  rating: 4.5,
};

const mockAddToCart = jest.fn();

const renderWithContext = () =>
  render(
    <ThemeProvider theme={lightTheme}>
      <CartContext.Provider
        value={{
          cart: [],
          addToCart: mockAddToCart,
          removeFromCart: jest.fn(),
          clearCart: jest.fn(),
          isHydrated: true,
        }}
      >
        <ProductCard {...mockProduct} />
      </CartContext.Provider>
    </ThemeProvider>
  );

describe("ProductCard", () => {
  it("renders product info correctly", () => {
    renderWithContext();

    expect(screen.getByText("Test Ürünü")).toBeInTheDocument();
    expect(screen.getByText("199 TL")).toBeInTheDocument();

    const image = screen.getByAltText("Test Ürünü");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct.image);

    expect(screen.getByText((text) => text.includes("⭐"))).toBeInTheDocument();
  });

  it("calls addToCart when button is clicked", () => {
    renderWithContext();
    const button = screen.getByRole("button", { name: /product.addToCart/i });
    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 1,
      title: "Test Ürünü",
      price: 199,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    });
  });

  it("renders product link", () => {
    renderWithContext();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/products/1");
  });
});
