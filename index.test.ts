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

  it("can interpret a place and a move command", () => {
    const mockRobot = { place: jest.fn(), move: jest.fn() };
    robot.mockReturnValue(mockRobot);

    const fakeFileContents = `PLACE 0,1,SOUTH
      MOVE`;
    readFileSync.mockReturnValue(fakeFileContents);

    execute("./fakeFilePath");
    expect(mockRobot.place).toHaveBeenCalledWith({ x: 0, y: 1, f: "SOUTH" });
    expect(mockRobot.move).toHaveBeenCalled();
  });

  it("can interpret a series of commands", () => {
    const mockRobot = {
      place: jest.fn(),
      move: jest.fn(),
      right: jest.fn(),
      left: jest.fn(),
      getPosition: jest.fn(),
    };
    robot.mockReturnValue(mockRobot);

    const fakeFileContents = `
      PLACE 0,1,SOUTH
      MOVE
      RIGHT
      MOVE
      LEFT
      REPORT`;
    readFileSync.mockReturnValue(fakeFileContents);

    execute("./fakeFilePath");
    expect(mockRobot.place).toHaveBeenCalledWith({ x: 0, y: 1, f: "SOUTH" });
    expect(mockRobot.move).toHaveBeenCalledTimes(2);
    expect(mockRobot.right).toHaveBeenCalled();
    expect(mockRobot.left).toHaveBeenCalled();
    expect(mockRobot.getPosition).toHaveBeenCalled();
  });

  it("rejects invalid commands", () => {
    const mockPlace = jest.fn();
    robot.mockReturnValue({ place: mockPlace });

    const fakeFileContents = "FLY";
    readFileSync.mockReturnValue(fakeFileContents);

    expect(() => execute("./fakeFilePath")).toThrow();
  });

  it("surfaces robot errors", () => {
    const mockMove = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    robot.mockReturnValue({ move: mockMove });

    const fakeFileContents = "MOVE";
    readFileSync.mockReturnValue(fakeFileContents);

    expect(() => execute("./fakeFilePath")).toThrow();
  });
});
