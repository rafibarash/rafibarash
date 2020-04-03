# Game Animation Primitives

A library containing algorithms & abstract classes for building animations/games, regardless of the platform.

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
