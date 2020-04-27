# Simple Physics Engine

A library containing algorithms & abstract classes for building animations/games, regardless of the platform.

**This package is currently being developed and is not finished or tested.**

## Example Usage

Using the physics engine and adding a Bird character

```javascript
import { AbstractPhysics, RigidBody } from 'simple-physics-engine'

class Bird extends RigidBody {
  constructor(pos, options) {
    super(pos, options)
    // other constructor logic
  }

  // other extensions
}

class Physics extends AbstractPhysics {
  // implement abstract init() method
  function init() {
    addCharacter(bird)
    // other init logic
  }

  // implement abstract update() method
  function update(dt) {
    // your update logic
  }

  // other extensions
}
```

## Supported Algorithms

### Search

- A\* Search
- Uniform Cost Search (Dijkstra's Algorithm)
- Probabilistic Roadmap (PRM) Generation

## Supported Classes

### Math

- Vector

### Global Logic

- Physics (Abstract Class)

### Objects

All of these objects are abstract classes and are meant to be inherited from. For example, you could create a "Car" class by inheriting from "Agent"

#### Object Hierarchy

TODO: Add picture of hierarchy

#### Object Reference

| Name            | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| Spatial         | Root of all objects, just holds a position                                    |
| CollisionObject | Base collision object, holds some type of extent to check for collisions      |
| StaticBody      | An extension of CollisionObject that is incapable of moving                   |
| RigidBody       | An extension of CollisionObject that supports movement and can receive forces |
| Agent           | An extension of RigidBody that holds a goal and a path towards that goal      |

## TODO

- [ ] Write Particle and ParticleSystem classes
- [ ] Make sure BoundingSphere collision detection is robust, add bounce handling if time
- [ ] Implement kd-tree to make collision detection quicker
- [ ] Write abstract Camera class?
