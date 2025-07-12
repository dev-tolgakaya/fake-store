import { render, screen } from "@testing-library/react";
import OptimizedImage from "./index";

describe("OptimizedImage component", () => {
  it("renders the image with default props", () => {
    render(
      <OptimizedImage
        src="/test.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    );

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("test.jpg"));
  });

  it("applies custom borderRadius and backgroundColor", () => {
    const { container } = render(
      <OptimizedImage
        src="/custom.jpg"
        alt="Styled image"
        width={200}
        height={200}
        borderRadius="12px"
        bgColor="#f0f0f0"
      />
    );

    const wrapperDiv = container.firstChild as HTMLElement;
    expect(wrapperDiv).toHaveStyle("border-radius: 12px");
    expect(wrapperDiv).toHaveStyle("background-color: #f0f0f0");
  });

  it("uses 'contain' as objectFit when specified", () => {
    render(
      <OptimizedImage
        src="/contain.jpg"
        alt="Contain image"
        width={100}
        height={100}
        objectFit="contain"
      />
    );

    const image = screen.getByAltText("Contain image");
    expect(image).toHaveStyle("object-fit: contain");
  });
});
