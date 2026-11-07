import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/shared/tests/render-with-providers";
import { ProductCatalog } from "../components/product-catalog";
import { jsonResponse, money, PRODUCTS } from "./fixtures";

vi.mock("next/image", () => import("@/shared/tests/next-image-mock"));

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_PRODUCTS_API_URL", "https://api.test/products");
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

describe("ProductCatalog", () => {
  it("shows a loading state, then the products", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ products: PRODUCTS }));
    renderWithProviders(<ProductCatalog />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading products");
    expect(await screen.findAllByRole("link")).toHaveLength(3);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.test/products?limit=20",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it("labels each product with its cheapest monthly payment", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ products: PRODUCTS }));
    renderWithProviders(<ProductCatalog />);

    const bed = await screen.findByRole("link", { name: /Colombo Bed/ });
    // 12 months: SAR 7,124.96 + 8% fee → SAR 641.25/mo
    expect(bed).toHaveTextContent(`From ${money(64_125)}/mo`);

    const ckOne = screen.getByRole("link", { name: /CK One/ });
    // Only 4 months qualifies: SAR 187.46 / 4 → SAR 46.87/mo
    expect(ckOne).toHaveTextContent(`From ${money(4_687)}/mo`);

    const mascara = screen.getByRole("link", { name: /Mascara/ });
    expect(mascara).toHaveTextContent("Not available in installments");
    expect(mascara).toHaveAttribute("href", "/en/products/1");
  });

  it("shows an error with a working retry", async () => {
    fetchMock
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValueOnce(jsonResponse({ products: PRODUCTS }));
    renderWithProviders(<ProductCatalog />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Products couldn't load");

    await userEvent.click(
      within(alert).getByRole("button", { name: "Try again" }),
    );
    expect(await screen.findAllByRole("link")).toHaveLength(3);
  });

  it("treats a malformed response as an error", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ items: [] }));
    renderWithProviders(<ProductCatalog />);
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("filters by title and offers to clear an empty search", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ products: PRODUCTS }));
    renderWithProviders(<ProductCatalog />);
    await screen.findAllByRole("link");

    const search = screen.getByRole("searchbox", {
      name: "Search products by name",
    });
    await userEvent.type(search, "ck one");
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByText("1 product")).toBeInTheDocument();

    await userEvent.clear(search);
    await userEvent.type(search, "laptop");
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    expect(screen.getByText("No matching products")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
    await waitFor(() => expect(screen.getAllByRole("link")).toHaveLength(3));
    expect(search).toHaveValue("");
    expect(search).toHaveFocus();
  });
});
