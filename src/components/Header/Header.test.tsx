import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useAuth from "../../hooks/useAuth";
import { MemoryRouter } from "react-router-dom";
import Header from ".";

vi.mock("../../hooks/useAuth");
const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("Header", () => {
  afterEach(() => {
    cleanup();
  });

  const clearUserData = vi.fn();
  const userDataMock = {
    name: "testUser",
    username: "testUsername",
    id: "testId",
    avatar: "testAvatar.png",
  };

  beforeEach(() => {
    // @ts-expect-error mockReturnValue is not defined in the type
    (useAuth as vi.Mock).mockReturnValue({ userData: null, clearUserData });
  });

  it("should render the sign in and sign up links when the user is not logged in", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sign in/i)).toBeTruthy();
    expect(screen.getByText(/Sign Up/i)).toBeTruthy();
  });

  it("should render user links when user is logged in", () => {
    // @ts-expect-error mockReturnValue is not defined in the type
    (useAuth as vi.Mock).mockReturnValue({
      userData: userDataMock,
      clearUserData,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/History/i)).toBeTruthy();
    expect(screen.getByText(/Logout/i)).toBeTruthy();
    expect(screen.getByText(userDataMock.username)).toBeTruthy();

    expect(screen.getByRole("img")).toBeTruthy();
  });

  it('should call "clearUserData" and navigate to the home page when the user logs out', () => {
    // @ts-expect-error mockReturnValue is not defined in the type

    (useAuth as vi.Mock).mockReturnValue({
      userData: userDataMock,
      clearUserData,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);

    expect(clearUserData).toHaveBeenCalled();

    expect(mockedUseNavigate).toHaveBeenCalledWith("/");
  });
});
