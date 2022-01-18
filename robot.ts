const coordinates = Array.from(new Array(5).keys());
type Coordinates = typeof coordinates[number];

const faces = ["East", "South", "West", "North"];
type Faces = typeof faces[number];

type Position = {
  x: Coordinates;
  y: Coordinates;
  f: Faces;
};

const defaultPosition = {
  x: 0,
  y: 0,
  f: "North",
};

const rotations = ["Left", "Right"];
type Rotations = typeof rotations[number];

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
        throw new Error();
      }
      position = newPosition;
    },
    move: () => {
      if (!position) {
        throw new Error();
      }
      if (position.f === "South") {
        if (position.y === 0) {
          throw new Error();
        }
        position.y--;
        return;
      }
      position.y++;
    },
    rotate: (rotation: Rotations) => {
      const currentFaceInArray = faces.indexOf(position.f);
      if (rotation === "Right") {
        if (currentFaceInArray === faces.length - 1) {
          position.f = faces[0];
          return;
        }
        position.f = faces[currentFaceInArray + 1];
        return;
      }
      if (currentFaceInArray === 0) {
        position.f = faces[faces.length - 1];
        return;
      }
      position.f = faces[currentFaceInArray - 1];
    },
    getPosition: () => position,
  };
};

export { robot };
