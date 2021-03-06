import { readFileSync } from "fs";
import { robot } from "./robot";

const validInstructions = ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT"];

const execute = (path: string) => {
  const fileData = readFileSync(path).toString();
  const runRobot = robot();

  const instructions = fileData.split("\n");
  instructions.map((instruction: string) => {
    const trimmedInstruction = instruction.trim();
    const firstWordInInstruction = trimmedInstruction.split(" ")[0].trim();

    if (!firstWordInInstruction) {
      return;
    }
    if (!validInstructions.includes(firstWordInInstruction)) {
      throw new Error("An invalid command was given");
    }

    if (firstWordInInstruction === "PLACE") {
      const positionValues = trimmedInstruction.split(" ")[1].split(",");

      runRobot.place({
        x: Number(positionValues[0]),
        y: Number(positionValues[1]),
        f: positionValues[2],
      });
      return;
    }

    if (firstWordInInstruction === "MOVE") {
      runRobot.move();
      return;
    }

    if (firstWordInInstruction === "RIGHT") {
      runRobot.right();
      return;
    }

    if (firstWordInInstruction === "LEFT") {
      runRobot.left();
      return;
    }

    if (firstWordInInstruction === "REPORT") {
      console.log(runRobot.getPosition());
      return;
    }
  });
};

export { execute };
