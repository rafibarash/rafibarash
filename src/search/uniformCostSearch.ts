import TinyQueue from "tinyqueue";
import type { Comparator } from 'tinyqueue';
import Vector from "../math/Vector";
import { sumPathDistance } from './util';

// Compares sum path distances of each path, sorts in ascending order
const pathComparator: Comparator<Array<Vector>> = (path1: Array<Vector>, path2: Array<Vector>): number => {
  // Calculate f(x) = g(x), where g(x) is sumPathDistance
  const sum1 = sumPathDistance(path1);
  const sum2 = sumPathDistance(path2);

  // Sort in ascending order
  if (sum1 > sum2) return 1;
  else if (sum1 < sum2) return -1;
  return 0;
}

// UCS through graph from start to goal
const uniformCostSearch = (
  graph: Map<Vector, Set<Vector>>,
  start: Vector,
  goal: Vector
): Array<Vector> => {
  // Make sure start and goal in graph
  if (!graph.has(start) || !graph.has(goal)) {
    throw new Error("Graph must contain start and goal.");
  }
  
  let path: Array<Vector> = [];
  const visited = new Set<Vector>();
  const queue = new TinyQueue<Array<Vector>>([[start]], pathComparator);

  // While queue is not empty add all neighbors of unvisited nodes to queue
  while (queue.length > 0) {
    // Get current path and it's last node from queue
    let curPath = queue.pop();
    let curNode = curPath[curPath.length - 1];
    // Check for goal
    if (curNode == goal) {
      path = curPath;
      break;
    }
    // Add all unvisited neighbors of curNode to queue
    let neighbors = graph.get(curNode);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        let nextPath = [...curPath, neighbor];
        queue.push(nextPath);
        visited.add(neighbor);
      }
    }
  }

  return path;
};

export default uniformCostSearch;
