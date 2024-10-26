import { render, screen } from "@testing-library/react";

import Page from "@/app/page";

describe("Page", () => {
  it("renders a hello world", () => {
    render(<Page />);

    const heading = screen.getByText(/Not Admin/i);

    expect(heading).toBeInTheDocument();
  });
});
