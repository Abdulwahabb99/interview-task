import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/shared/tests/render-with-providers";
import { ProductPlanView } from "../components/product-plan-view";
import { detailsOf, jsonResponse, money, PRODUCTS } from "./fixtures";

vi.mock("next/image", () => import("@/shared/tests/next-image-mock"));

const [mascara, ckOne, bed] = PRODUCTS.map(detailsOf);
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

const radio = (name: RegExp) => screen.getByRole("radio", { name });
const scheduleItems = () =>
  within(screen.getByRole("list")).getAllByRole("listitem");

describe("ProductPlanView", () => {
  it("fetches the product and preselects the cheapest plan", async () => {
    fetchMock.mockResolvedValue(jsonResponse(bed));
    renderWithProviders(<ProductPlanView id="11" />);

    expect(
      await screen.findByRole("heading", { level: 1, name: bed.title }),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.test/products/11",
      expect.anything(),
    );

    // 12 months matches the list's "From SAR 641.25/mo" label.
    expect(radio(/^12 months/)).toBeChecked();
    const summary = screen.getByRole("region", { name: "Monthly payment" });
    expect(summary).toHaveTextContent(money(64_125));
    expect(summary).toHaveTextContent(`Service fee (8%)${money(57_000)}`);
    expect(summary).toHaveTextContent(`Total to pay${money(769_496)}`);
    expect(scheduleItems()).toHaveLength(12);
  });

  it("shows due dates and the rounding adjustment on the last payment", async () => {
    fetchMock.mockResolvedValue(jsonResponse(bed));
    renderWithProviders(<ProductPlanView id="11" />);
    await screen.findByRole("heading", { level: 1 });

    const items = scheduleItems();
    expect(items[0]).toHaveTextContent("Due today");
    expect(items[0]).toHaveTextContent(money(64_125));
    // 769,496 − 11 × 64,125 = 64,121 halalas
    expect(items[11]).toHaveTextContent(money(64_121));
    expect(items[11]).toHaveTextContent("Adjusted for rounding");
    expect(items[1]).not.toHaveTextContent("Adjusted for rounding");
  });

  it("switches plans with the keyboard", async () => {
    fetchMock.mockResolvedValue(jsonResponse(bed));
    renderWithProviders(<ProductPlanView id="11" />);
    await screen.findByRole("heading", { level: 1 });

    radio(/^12 months/).focus();
    await userEvent.keyboard("{ArrowUp}");
    expect(radio(/^9 months/)).toBeChecked();
    expect(scheduleItems()).toHaveLength(9);
    expect(
      screen.getByRole("region", { name: "Monthly payment" }),
    ).toHaveTextContent(money(83_520));
  });

  it("keeps unavailable plans visible, disabled, with the reason", async () => {
    fetchMock.mockResolvedValue(jsonResponse(ckOne)); // $49.99: 4 months only
    renderWithProviders(<ProductPlanView id="6" />);
    await screen.findByRole("heading", { level: 1 });

    expect(radio(/^4 months/)).toBeChecked();
    for (const [term, minimum] of [
      [6, 18_750],
      [9, 56_250],
      [12, 112_500],
    ]) {
      const option = radio(new RegExp(`^${term} months`));
      expect(option).toHaveAttribute("aria-disabled", "true");
      // The reason is wired up as the radio's accessible description.
      // (Checked via the referenced node: toHaveTextContent normalises the
      // no-break space in "SAR 187.50"; toHaveAccessibleDescription doesn't.)
      const reasonId = option.getAttribute("aria-describedby") ?? "";
      expect(document.getElementById(reasonId)).toHaveTextContent(
        `Needs a price of ${money(minimum)} or more`,
      );
    }

    await userEvent.click(radio(/^6 months/));
    expect(radio(/^4 months/)).toBeChecked();
  });

  it("explains when no plan is available", async () => {
    fetchMock.mockResolvedValue(jsonResponse(mascara)); // $9.99
    renderWithProviders(<ProductPlanView id="1" />);

    expect(
      await screen.findByText(/under the minimum price for installments/),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(4);
    expect(screen.queryByRole("radio", { checked: true })).toBeNull();
    expect(
      screen.queryByRole("region", { name: "Monthly payment" }),
    ).not.toBeInTheDocument();
  });

  it("shows not found for an unknown id", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ message: "Product with id '999' not found" }, 404),
    );
    renderWithProviders(<ProductPlanView id="999" />);

    expect(
      await screen.findByRole("heading", { name: "Product not found" }),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledOnce(); // a 404 isn't retried
  });

  it("shows not found for a malformed id without calling the API", () => {
    renderWithProviders(<ProductPlanView id="abc" />);

    expect(
      screen.getByRole("heading", { name: "Product not found" }),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows an error with a working retry", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 500 }));
    renderWithProviders(<ProductPlanView id="11" />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("This product couldn't load");

    fetchMock.mockResolvedValue(jsonResponse(bed));
    await userEvent.click(
      within(alert).getByRole("button", { name: "Try again" }),
    );
    expect(
      await screen.findByRole("heading", { level: 1, name: bed.title }),
    ).toBeInTheDocument();
  });
});
