import { robot } from "./robot";

describe("place", () => {
  it("can place itself", () => {
    const testRobot = robot();
    testRobot.place();
  });
});
