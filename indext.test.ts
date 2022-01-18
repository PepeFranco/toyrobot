import { execute } from "./index";
import { readFileSync } from "fs";
import { robot } from "./robot";

jest.mock("fs", () => ({ readFileSync: jest.fn() }));
jest.mock("./robot", () => ({ robot: jest.fn() }));

describe("Main file", () => {
  it("can interpret a place command", () => {
    const mockPlace = jest.fn();
    robot.mockReturnValue({ place: mockPlace });

    const fakeFileContents = "PLACE 0,0,NORTH";
    readFileSync.mockReturnValue(fakeFileContents);

    execute("./fakeFilePath");
    expect(mockPlace).toHaveBeenCalledWith({ x: 0, y: 0, f: "NORTH" });
  });
});
