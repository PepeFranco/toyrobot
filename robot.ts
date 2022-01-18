const coordinates = new Array(5).keys() as const;
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

const robot = () => {
  const position: Position = defaultPosition;
  return {
    place: (newPosition?: Position = defaultPosition) => {
      position.x = newPosition.x;
      position.y = newPosition.y;
      position.f = newPosition.f;
    },
    position,
  };
};

export { robot };
