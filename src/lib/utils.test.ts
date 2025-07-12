import {
  onlyNumberReplace,
  buildQueryString,
  extractQueryFilters,
  filterAndSortProducts,
  paginate,
} from "./utils";

describe("utils.ts", () => {
  describe("onlyNumberReplace", () => {
    it("removes non-digit characters", () => {
      expect(onlyNumberReplace("a1b2c3")).toBe("123");
      expect(onlyNumberReplace("500TL")).toBe("500");
      expect(onlyNumberReplace("")).toBe("");
    });
  });

  describe("buildQueryString", () => {
    it("builds query with filters", () => {
      const result = buildQueryString({
        sort: "asc",
        category: "electronics",
        search: "phone",
        minPrice: "100",
        maxPrice: "2000",
      });
      expect(result).toBe(
        "/products?sort=asc&category=electronics&search=phone&minPrice=100&maxPrice=2000"
      );
    });

    it("handles missing optional filters", () => {
      const result = buildQueryString({
        search: "test",
      });
      expect(result).toBe("/products?search=test");
    });
  });

  describe("extractQueryFilters", () => {
    it("returns default values when query is empty", () => {
      const result = extractQueryFilters({});
      expect(result).toEqual({
        page: 1,
        sort: "asc",
        category: "",
        search: "",
        minPrice: 0,
        maxPrice: 999999,
      });
    });

    it("parses query correctly", () => {
      const result = extractQueryFilters({
        page: "2",
        sort: "desc",
        category: "books",
        search: "kitap",
        minPrice: "50",
        maxPrice: "100",
      });

      expect(result).toEqual({
        page: 2,
        sort: "desc",
        category: "books",
        search: "kitap",
        minPrice: 50,
        maxPrice: 100,
      });
    });
  });

  describe("filterAndSortProducts", () => {
    const products = [
      { id: 1, title: "iPhone", price: 5000, category: "electronics", image: "", rating: { rate: 5 } },
      { id: 2, title: "Kitap", price: 100, category: "books", image: "", rating: { rate: 4.5 } },
      { id: 3, title: "Bilgisayar", price: 8000, category: "electronics", image: "", rating: { rate: 4 } },
    ];

    it("filters by category", () => {
      const result = filterAndSortProducts(products, {
        category: "books",
        search: "",
        minPrice: 0,
        maxPrice: 999999,
        sort: "asc",
        page: 1,
      });

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Kitap");
    });

    it("filters by search term", () => {
      const result = filterAndSortProducts(products, {
        category: "",
        search: "bilgisayar",
        minPrice: 0,
        maxPrice: 999999,
        sort: "asc",
        page: 1,
      });

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Bilgisayar");
    });

    it("filters by price range", () => {
      const result = filterAndSortProducts(products, {
        category: "",
        search: "",
        minPrice: 200,
        maxPrice: 6000,
        sort: "asc",
        page: 1,
      });

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("iPhone");
    });

    it("sorts by ascending price", () => {
      const result = filterAndSortProducts(products, {
        category: "",
        search: "",
        minPrice: 0,
        maxPrice: 999999,
        sort: "asc",
        page: 1,
      });

      expect(result.map((p) => p.price)).toEqual([100, 5000, 8000]);
    });

    it("sorts by descending price", () => {
      const result = filterAndSortProducts(products, {
        category: "",
        search: "",
        minPrice: 0,
        maxPrice: 999999,
        sort: "desc",
        page: 1,
      });

      expect(result.map((p) => p.price)).toEqual([8000, 5000, 100]);
    });
  });

  describe("paginate", () => {
    const products = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      price: 100,
      image: "",
      rating: { rate: 4 },
      category: "test",
    }));

    it("returns correct page slice", () => {
      const page1 = paginate(products, 1, 4);
      expect(page1.map((p) => p.id)).toEqual([1, 2, 3, 4]);

      const page2 = paginate(products, 2, 4);
      expect(page2.map((p) => p.id)).toEqual([5, 6, 7, 8]);
    });
  });
});
