import { robot } from "./robot";

it("creates a unique robot each time", () => {
  const testRobot1 = robot();
  testRobot1.place();
  const testRobot2 = robot();
  testRobot2.place({ x: 2, y: 2, f: "South" });
  expect(testRobot1.position).not.toEqual(testRobot2.position);
});

describe("place", () => {
  it("can place itself in the default position", () => {
    const testRobot = robot();
    testRobot.place();
    expect(testRobot.position).toEqual({
      x: 0,
      y: 0,
      f: "North",
    });
  });

  it("can place itself in a given position", () => {
    const testRobot = robot();
    const givenPosition = { x: 0, y: 3, f: "South" };
    testRobot.place(givenPosition);
    expect(testRobot.position).toEqual(givenPosition);
  });

  describe("invalid positions", () => {
    it("throws if given invalid x", () => {
      const testRobot = robot();
      const givenPosition = { x: -2, y: 1, f: "South" };
      expect(() => testRobot.place(givenPosition)).toThrow();
    });

    it("throws if given invalid y", () => {
      const testRobot = robot();
      const givenPosition = { x: 1, y: "1", f: "South" };
      expect(() => testRobot.place(givenPosition)).toThrow();
    });

    it("throws if given invalid f", () => {
      const testRobot = robot();
      const givenPosition = { x: 1, y: 1, f: null };
      expect(() => testRobot.place(givenPosition)).toThrow();
    });
  });
});

describe("move", () => {
  it("can move after being placed", () => {
    const testRobot = robot();
    testRobot.place();
    testRobot.move();
    expect(testRobot.position).toEqual({ x: 0, y: 1, f: "North" });
  });
});