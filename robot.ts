const coordinates = Array.from(new Array(5).keys());
type Coordinates = typeof coordinates[number];

const faces = ["EAST", "SOUTH", "WEST", "NORTH"];
type Faces = typeof faces[number];

type Position = {
  x: Coordinates;
  y: Coordinates;
  f: Faces;
};

const defaultPosition = {
  x: 0,
  y: 0,
  f: "NORTH",
};

const isValidPosition = (unknownPosition: any): unknownPosition is Position => {
  if (!coordinates.includes(unknownPosition.x)) {
    return false;
  }
  if (!coordinates.includes(unknownPosition.y)) {
    return false;
  }
  if (!faces.includes(unknownPosition.f)) {
    return false;
  }
  return true;
};

const robot = () => {
  let position: Position | undefined = undefined;

  return {
    place: (newPosition: unknown = { ...defaultPosition }) => {
      if (!isValidPosition(newPosition)) {
        throw new Error(
          `Could not place robot in position: ${JSON.stringify(newPosition)}`
        );
      }
      position = newPosition;
    },
    move: () => {
      if (!position) {
        throw new Error("Robot has not been placed");
      }
      if (position.f === "SOUTH") {
        if (position.y === 0) {
          throw new Error("Almost fell of the table");
        }
        position.y--;
        return;
      }

      if (position.f === "NORTH") {
        if (position.y === coordinates.length - 1) {
          throw new Error("Almost fell of the table");
        }
        position.y++;
        return;
      }

      if (position.f === "WEST") {
        if (position.x === 0) {
          throw new Error("Almost fell of the table");
        }
        position.x--;
        return;
      }

      if (position.f === "EAST") {
        if (position.x === coordinates.length - 1) {
          throw new Error("Almost fell of the table");
        }
        position.x++;
        return;
      }
    },
    left: () => {
      if (!position) {
        throw new Error("Robot has not been placed");
      }
      const currentFaceInArray = faces.indexOf(position.f);
      if (currentFaceInArray === 0) {
        position.f = faces[faces.length - 1];
        return;
      }
      position.f = faces[currentFaceInArray - 1];
    },
    right: () => {
      if (!position) {
        throw new Error("Robot has not been placed");
      }
      const currentFaceInArray = faces.indexOf(position.f);
      if (currentFaceInArray === faces.length - 1) {
        position.f = faces[0];
        return;
      }
      position.f = faces[currentFaceInArray + 1];
    },
    getPosition: () => {
      if (!position) {
        throw new Error("Robot has not been placed");
      }
      return position;
    },
  };
};

export { robot };
