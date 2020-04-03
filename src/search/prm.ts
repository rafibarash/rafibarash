import { Vector } from "../math";
import { CollisionObject, Agent } from "../engine";
import astarSearch from "./astarSearch";

/**
 * Constructs a Probabilistic Roadmap connecting a goal position to all starting positions
 * @param goalPos: goal position
 * @param startPositions: starting positions to connect to goal
 * @param config
 *    - numSamples: number of samples taken on each try (default: 200)
 *    - maxDistance: max distance to connect nodes (default: no max distance)
 *    - maxTries: number of tries to build PRM before giving up (default: 25)
 *    - search: what search algorithm to use (default: A* Search)
 */
const buildPRM = (
  goal: Vector,
  agents: Array<Agent>,
  obstacles: Array<CollisionObject>,
  { numSamples = 200, maxDistance = 0, maxTries = 10, search = astarSearch }
): Map<Vector, Set<Vector>> => {
  // Initialize some outer loop variables
  let graph: Map<Vector, Set<Vector>>;
  const agentPositions = agents.map(agent => agent.getPos());
  let nodes = [...agentPositions, goal];
  let numTries = 1;

  // Try building PRM until valid roadmap built or maxTries reached
  while (numTries < maxTries) {
    // Sample nodes and build graph
    let sampledNodes = sampleValidNodes(numSamples * numTries, obstacles);
    nodes.push(...sampledNodes);
    graph = buildGraph(nodes, maxDistance);
    // Check if all agents can reach the goal position
    // set paths if able to reach otherwise break and try again
    let allValidPaths = true;
    for (let agent of agents) {
      let path = search(graph, agent.getPos(), goal); // TODO: Factor in agent's extent during search
      if (path.length === 0) {
        // No possible path found
        allValidPaths = false;
        numTries++;
        break;
      } else {
        // set agent's path to path found
        agent.setPath(path);
      }
    }
    // Check for all valid paths
    if (allValidPaths) break;
  }

  return graph;
};

// Helper method for buildPRM to sample 'n' nodes and return list of valid nodes
const sampleValidNodes = (
  n: number,
  obstacles: Array<CollisionObject>
): Array<Vector> => {
  const validNodes: Array<Vector> = [];
  // TODO: Implement

  return validNodes;
};

// Helper method for buildPRM to build a graph from a list of nodes
const buildGraph = (
  nodes: Array<Vector>,
  maxDistance: number
): Map<Vector, Set<Vector>> => {
  const graph = new Map<Vector, Set<Vector>>();
  // TODO: Implement

  return graph;
};

export default buildPRM;
