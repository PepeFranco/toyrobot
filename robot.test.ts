import { robot } from "./robot";

it("creates a unique robot each time", () => {
  const testRobot1 = robot();
  testRobot1.place();
  const testRobot2 = robot();
  testRobot2.place({ x: 2, y: 2, f: "SOUTH" });
  expect(testRobot1.getPosition()).not.toEqual(testRobot2.getPosition());
});

describe("place", () => {
  it("can place itself in the default position", () => {
    const testRobot = robot();
    testRobot.place();
    expect(testRobot.getPosition()).toEqual({
      x: 0,
      y: 0,
      f: "NORTH",
    });
  });

  it("can place itself in a given position", () => {
    const testRobot = robot();
    const givenPosition = { x: 0, y: 3, f: "SOUTH" };
    testRobot.place(givenPosition);
    expect(testRobot.getPosition()).toEqual(givenPosition);
  });

  it("can place itself after being placed", () => {
    const testRobot = robot();
    const givenPosition1 = { x: 0, y: 3, f: "SOUTH" };
    testRobot.place(givenPosition1);
    expect(testRobot.getPosition()).toEqual(givenPosition1);
    const givenPosition2 = { x: 2, y: 1, f: "NORTH" };
    testRobot.place(givenPosition2);
    expect(testRobot.getPosition()).toEqual(givenPosition2);
  });

  describe("invalid positions", () => {
    it("throws if given invalid x", () => {
      const testRobot = robot();
      const givenPosition = { x: -2, y: 1, f: "SOUTH" };
      expect(() => testRobot.place(givenPosition)).toThrow();
    });

    it("throws if given invalid y", () => {
      const testRobot = robot();
      const givenPosition = { x: 1, y: "1", f: "SOUTH" };
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
  it("can move after being placed in default position", () => {
    const testRobot = robot();
    testRobot.place();
    testRobot.move();
    expect(testRobot.getPosition()).toEqual({ x: 0, y: 1, f: "NORTH" });
  });

  it("can move after being placed in given position", () => {
    const testRobot = robot();
    const givenPosition = { x: 0, y: 3, f: "SOUTH" };
    testRobot.place(givenPosition);
    testRobot.move();
    expect(testRobot.getPosition()).toEqual({ x: 0, y: 2, f: "SOUTH" });
  });

  it("cannot move if not placed", () => {
    const testRobot = robot();
    expect(() => testRobot.move()).toThrow();
  });

  it("cannot move off the table going SOUTH", () => {
    const testRobot = robot();
    const givenPosition = { x: 0, y: 0, f: "SOUTH" };
    testRobot.place(givenPosition);
    expect(() => testRobot.move()).toThrow();
  });

  it("cannot move off the table going NORTH", () => {
    const testRobot = robot();
    testRobot.place();
    testRobot.move();
    testRobot.move();
    testRobot.move();
    testRobot.move();
    expect(testRobot.getPosition().y).toEqual(4);
    expect(() => testRobot.move()).toThrow();
  });

  it("cannot move off the table going WEST", () => {
    const testRobot = robot();
    testRobot.place({ x: 1, y: 1, f: "NORTH" });
    testRobot.left();
    testRobot.move();
    expect(testRobot.getPosition().x).toEqual(0);
    expect(() => testRobot.move()).toThrow();
  });

  it("cannot move off the table going EAST", () => {
    const testRobot = robot();
    testRobot.place();
    testRobot.right();
    testRobot.move();
    testRobot.move();
    testRobot.move();
    testRobot.move();
    expect(testRobot.getPosition().x).toEqual(4);
    expect(() => testRobot.move()).toThrow();
  });
});

describe("rotate", () => {
  it("can rotate left after being placed", () => {
    const testRobot = robot();
    testRobot.place();
    testRobot.left();
    expect(testRobot.getPosition()).toEqual({ x: 0, y: 0, f: "WEST" });
  });

  it("cannot rotate left if not placed", () => {
    const testRobot = robot();
    expect(() => testRobot.left()).toThrow();
  });

  it("can rotate right after being placed", () => {
    const testRobot = robot();
    testRobot.place();
    testRobot.right();
    expect(testRobot.getPosition()).toEqual({ x: 0, y: 0, f: "EAST" });
  });

  it("cannot rotate right if not placed", () => {
    const testRobot = robot();
    expect(() => testRobot.right()).toThrow();
  });

  it("can rotate to all directions left", () => {
    const testRobot = robot();
    testRobot.place();
    testRobot.left();
    expect(testRobot.getPosition().f).toEqual("WEST");
    testRobot.left();
    expect(testRobot.getPosition().f).toEqual("SOUTH");
    testRobot.left();
    expect(testRobot.getPosition().f).toEqual("EAST");
    testRobot.left();
    expect(testRobot.getPosition().f).toEqual("NORTH");
  });

  it("can rotate to all directions right", () => {
    const testRobot = robot();
    testRobot.place();
    testRobot.right();
    expect(testRobot.getPosition().f).toEqual("EAST");
    testRobot.right();
    expect(testRobot.getPosition().f).toEqual("SOUTH");
    testRobot.right();
    expect(testRobot.getPosition().f).toEqual("WEST");
    testRobot.right();
    expect(testRobot.getPosition().f).toEqual("NORTH");
  });

  it("can alternate directions", () => {
    const testRobot = robot();
    testRobot.place();
    testRobot.right();
    expect(testRobot.getPosition().f).toEqual("EAST");
    testRobot.left();
    expect(testRobot.getPosition().f).toEqual("NORTH");
    testRobot.left();
    expect(testRobot.getPosition().f).toEqual("WEST");
    testRobot.right();
    expect(testRobot.getPosition().f).toEqual("NORTH");
  });
});
