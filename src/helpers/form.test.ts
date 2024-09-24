import { describe, expect, it } from "vitest";
import { checkPasswordConfirmation } from "./form";

describe("Form helper functions", () => {
  describe("checkPasswordConfirmation", () => {
    it("should return the correct value for each input", () => {
      let result = checkPasswordConfirmation("password", {
        password: "password",
      });
      expect(result).toBe(true);

      result = checkPasswordConfirmation("password", { password: "password1" });
      expect(result).toBe("The passwords do not match");
    });
  });
});
