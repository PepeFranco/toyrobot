import { readFileSync } from "fs";
import { robot } from "./robot";

const execute = (path: string) => {
  readFileSync(path);
  const runRobot = robot();
  runRobot.place({ x: 0, y: 0, f: "NORTH" });
};

export { execute };
