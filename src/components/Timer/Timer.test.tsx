import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Timer from ".";
import { ChakraProvider } from "@chakra-ui/react";

const renderWithChakraProvider = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe("Timer", () => {
  afterEach(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const { container } = render(<Timer value={10} maxValue={20} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with value and maxValue props", () => {
    const { getByText } = renderWithChakraProvider(
      <Timer value={10} maxValue={100} />
    );

    const progressLabel = getByText("10");
    expect(progressLabel).toBeTruthy();
  });
});
