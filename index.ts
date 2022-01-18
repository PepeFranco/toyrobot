import { readFileSync } from "fs";
const execute = (path: string) => {
  readFileSync(path);
};

export { execute };
