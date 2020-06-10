import { expect } from "chai";
import { allowlist, denylist } from "../src";

describe("Exports", () => {
  it("should be able to export the two methods individually", () => {
    expect(allowlist).to.be.a("function");
    expect(denylist).to.be.a("function");
  });
});
