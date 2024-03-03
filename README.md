# Physics Simulation with HTML5 Canvas

This project demonstrates a simple physics simulation implemented using HTML5 Canvas and JavaScript. The simulation consists of interconnected points and sticks, influenced by gravity, friction, and an oscillating engine.

## How to Use

1. Clone or download the repository.
2. Open `index.html` in a web browser.

## Features

- **Canvas Rendering:** Utilizes HTML5 Canvas for rendering graphics.
- **Physics Simulation:** Simulates point masses connected by sticks, affected by gravity, friction, and an oscillating engine.
- **Engine Animation:** Includes an oscillating engine that moves in a circular motion.

## Files

- `index.html`: HTML file containing the canvas element and JavaScript code.
- `README.md`: Markdown file describing the project and how to use it.

## Code Structure

- **`window.onload` Function:** Initializes the canvas and starts the animation loop.
- **Point and Stick Definitions:** Defines the points and sticks for the simulation.
- **Functions:**
  - `distance`: Calculates the distance between two points.
  - `updateEngine`: Updates the position and angle of the engine.
  - `updatePoints`: Updates the positions of the points based on velocity, gravity, and friction.
  - `constrainPoints`: Constrains the points within the canvas boundaries.
  - `updateSticks`: Updates the lengths of the sticks to maintain their initial lengths.
  - `renderPoints`: Renders the points on the canvas.
  - `renderSticks`: Renders the sticks on the canvas.
  - `renderEngine`: Renders the engine on the canvas.
  - `update`: Main update function for the animation loop.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
