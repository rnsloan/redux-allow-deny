import { expect } from "chai";
import { whitelist, blacklist } from "../src";

describe("Exports", () => {
  it("should be able to export the two methods individually", () => {
    expect(whitelist).to.be.a("function");
    expect(blacklist).to.be.a("function");
  });
});
