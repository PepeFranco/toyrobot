const coordinates = Array.from(new Array(5).keys());
type Coordinates = typeof coordinates[number];

const faces = ["North", "South", "West", "East"];
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

const isValidPosition = (
  unknownPosition: unknown
): unknownPosition is Position => {
  if (!coordinates.includes(unknownPosition.x)) {
    return false;
  }
  return true;
};

const robot = () => {
  const position: Position = defaultPosition;
  return {
    place: (newPosition: Position = defaultPosition) => {
      if (!isValidPosition(newPosition)) {
        throw new Error();
      }
      position.x = newPosition.x;
      position.y = newPosition.y;
      position.f = newPosition.f;
    },
    position,
  };
};

export { robot };
