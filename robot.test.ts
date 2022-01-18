import { robot } from "./robot";

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
});
