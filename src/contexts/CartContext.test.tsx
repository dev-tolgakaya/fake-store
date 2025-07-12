import React from "react";
import { render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
}));

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const TestComponent = () => {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();

    return (
      <div>
        <button
          onClick={() =>
            addToCart({
              id: 1,
              title: "Test Ürün",
              price: 100,
              image: "test.jpg",
              quantity: 1,
            })
          }
        >
          Add
        </button>
        <button onClick={() => removeFromCart(1)}>Remove</button>
        <button onClick={() => clearCart()}>Clear</button>
        <div data-testid="cart-length">{cart.length}</div>
      </div>
    );
  };

  it("adds item to cart and calls toast", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    expect(screen.getByTestId("cart-length").textContent).toBe("1");
    expect(toast.success).toHaveBeenCalledWith("itemAdded");
  });

  it("removes item from cart", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    await userEvent.click(screen.getByText("Remove"));
    expect(screen.getByTestId("cart-length").textContent).toBe("0");
  });

  it("clears the cart", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    await userEvent.click(screen.getByText("Clear"));
    expect(screen.getByTestId("cart-length").textContent).toBe("0");
  });

  it("throws error when useCart is used outside provider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => {
      render(<TestComponent />);
    }).toThrow("useCart must be used within a CartProvider");
    spy.mockRestore();
  });

  it("syncs with localStorage", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe(1);
  });
});
