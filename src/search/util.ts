import Vector from '../math/Vector';

// Returns the sum path distance moving from start to end of a vector array
// Used as g(x) in searches
export const sumPathDistance = (path: Array<Vector>): number => {
  if (path.length === 0) return 0;

  let sum = 0;
  let prev = path[0];

  for (let i = 1; i < path.length - 1; i++) {
    const cur = path[i];
    sum += prev.distance(cur);
    prev = cur;
  }

  return sum;
};

// Returns the distance from the last vector in the path to the goal
// Used as h(x) in searches
export const distanceToGoal = (path: Array<Vector>, goal: Vector): number => {
  const lastPos = path[path.length - 1];
  return lastPos.distance(goal);
};
