import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import ApplicationBreadcrumb from "./ApplicationBreadcrumb";

describe("ApplicationBreadcrumb", () => {
  test("renders home breadcrumb item", () => {
    render(<ApplicationBreadcrumb />, { wrapper: MemoryRouter });
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  test("renders breadcrumb items for nested routes", () => {
    render(
      <MemoryRouter initialEntries={["/user/tom"]}>
        <ApplicationBreadcrumb />
      </MemoryRouter>
    );
    const userLink = screen.getByRole("link", { name: "User" });
    expect(userLink).toBeInTheDocument();
    const tomLink = screen.getByRole("link", { name: "Tom" });
    expect(tomLink).toBeInTheDocument();
  });



  test("does not render breadcrumb items for unknown routes", () => {
    render(<ApplicationBreadcrumb />, {
      wrapper: MemoryRouter,
      initialEntries: ["/unknown"],
    });
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    const unknownLink = screen.queryByRole("link", { name: /unknown/i });
    expect(unknownLink).not.toBeInTheDocument();
  });
});
