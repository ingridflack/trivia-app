import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import PrivateRoute from ".";
import useAuth from "../../hooks/useAuth";
import { cleanup, render } from "@testing-library/react";

vi.mock("../../hooks/useAuth");
const MockComponent = () => <div>Protected Component</div>;

const userDataMock = {
  name: "testUser",
  username: "testUsername",
  id: "testId",
  avatar: "testAvatar.png",
};

describe("PrivateRoute", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the component when userData is present", () => {
    // @ts-expect-error mockReturnValue is not defined in the type
    (useAuth as vi.Mock).mockReturnValue({ userData: userDataMock });

    const { getByText } = render(
      <MemoryRouter>
        <PrivateRoute Component={MockComponent} />
      </MemoryRouter>
    );

    expect(getByText("Protected Component")).toBeTruthy();
  });

  it("should redirect to /login when userData is absent", () => {
    // @ts-expect-error mockReturnValue is not defined in the type
    (useAuth as vi.Mock).mockReturnValue({ userData: null });

    const { queryByText } = render(
      <MemoryRouter>
        <PrivateRoute Component={MockComponent} />
      </MemoryRouter>
    );

    expect(queryByText("Protected Component")).toBeFalsy();
  });
});