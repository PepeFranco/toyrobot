import { execute } from "./index";
import { readFileSync } from "fs";

jest.mock("fs", () => ({ readFileSync: jest.fn() }));

describe("Main file", () => {
  it("can read a file", () => {
    execute("./fakeFilePath");
    expect(readFileSync).toHaveBeenCalledWith("./fakeFilePath");
  });
});
