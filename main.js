// When the window loads, set up the canvas and start the animation
window.onload = function () {
    // Get the canvas and its 2D rendering context
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    // Define variables for the points and sticks of the simulation
    var points = [],
        sticks = [],
        bounce = 0.9, // Coefficient of restitution for bounce
        gravity = 0.5, // Strength of gravity
        friction = 0.999, // Coefficient of friction
        angle = 0, // Initial angle for engine oscillation
        speed = 0.1, // Speed of the engine oscillation
        engine = { // Define parameters for the engine
            baseX: 450,
            baseY: 100,
            range: 100,
            angle: 0,
            speed: 0.05,
            x: 550,
            y: 100,
            pinned: true // Engine is pinned in place
        };

    // Define initial positions for points
    points.push({
        x: 100,
        y: 100,
        oldx: 100 + Math.random() * 50 - 25, // Initial x position with random variation
        oldy: 100 + Math.random() * 50 - 25  // Initial y position with random variation
    });
    points.push({
        x: 200,
        y: 100,
        oldx: 200,
        oldy: 100
    });
    points.push({
        x: 200,
        y: 200,
        oldx: 200,
        oldy: 200
    });
    points.push({
        x: 100,
        y: 200,
        oldx: 100,
        oldy: 200
    });

    points.push({
        x: 400,
        y: 100,
        oldx: 400,
        oldy: 100
    });
    points.push({
        x: 250,
        y: 100,
        oldx: 250,
        oldy: 100
    });

    // Define initial sticks connecting the points
    sticks.push({
        p0: points[0],
        p1: points[1],
        length: distance(points[0], points[1]) // Calculate initial length of the stick
    });
    sticks.push({
        p0: points[1],
        p1: points[2],
        length: distance(points[1], points[2])
    });
    sticks.push({
        p0: points[2],
        p1: points[3],
        length: distance(points[2], points[3])
    });
    sticks.push({
        p0: points[3],
        p1: points[0],
        length: distance(points[3], points[0])
    });
    sticks.push({
        p0: points[0],
        p1: points[2],
        length: distance(points[0], points[2]),
        hidden: true
    });

    sticks.push({
        p0: engine,
        p1: points[4],
        length: distance(engine, points[4])
    });
    sticks.push({
        p0: points[4],
        p1: points[5],
        length: distance(points[4], points[5])
    });
    sticks.push({
        p0: points[5],
        p1: points[0],
        length: distance(points[5], points[0])
    });

    // Function to calculate the distance between two points
    function distance(p0, p1) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Call the update function to start the animation loop
    update();

    // Function to update the engine's position and angle
    function updateEngine() {
        // Update engine position based on its oscillation
        engine.x = engine.baseX + Math.cos(engine.angle) * engine.range;
        engine.y = engine.baseY + Math.sin(engine.angle) * engine.range;
        engine.angle += engine.speed; // Increment engine oscillation angle
    }

    // Function to update the positions of the points
    function updatePoints() {
        // Update the position of each point based on velocity and gravity
        // Points not pinned are affected by friction and gravity
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            if (!p.pinned) {
                var vx = (p.x - p.oldx) * friction,
                    vy = (p.y - p.oldy) * friction;

                p.oldx = p.x;
                p.oldy = p.y;
                p.x += vx;
                p.y += vy;
                p.y += gravity;
            }
        }
    }

    // Function to constrain the points within the canvas boundaries
    function constrainPoints() {
        // Ensure points remain within the canvas boundaries
        // Apply bounce effect if a point hits the boundary
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            if (!p.pinned) {
                var vx = (p.x - p.oldx) * friction,
                    vy = (p.y - p.oldy) * friction;

                if (p.x > width) {
                    p.x = width;
                    p.oldx = p.x + vx * bounce;
                }
                else if (p.x < 0) {
                    p.x = 0;
                    p.oldx = p.x + vx * bounce;
                }
                if (p.y > height) {
                    p.y = height;
                    p.oldy = p.y + vy * bounce;
                }
                else if (p.y < 0) {
                    p.y = 0;
                    p.oldy = p.y + vy * bounce;
                }
            }
        }
    }

    // Function to update the lengths of the sticks
    function updateSticks() {
        // Adjust the length of each stick to maintain its initial length
        // Points connected by sticks are moved accordingly
        for (var i = 0; i < sticks.length; i++) {
            var s = sticks[i],
                dx = s.p1.x - s.p0.x,
                dy = s.p1.y - s.p0.y,
                distance = Math.sqrt(dx * dx + dy * dy),
                difference = s.length - distance,
                percent = difference / distance / 2,
                offsetX = dx * percent,
                offsetY = dy * percent;

            if (!s.p0.pinned) {
                s.p0.x -= offsetX;
                s.p0.y -= offsetY;
            }
            if (!s.p1.pinned) {
                s.p1.x += offsetX;
                s.p1.y += offsetY;
            }
        }
    }

    // Function to render the points on the canvas
    function renderPoints() {
        // Draw each point as a filled circle on the canvas
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            context.beginPath();
            context.arc(p.x, p.y, 5, 0, Math.PI * 2);
            context.fill();
        }
    }

    // Function to render the sticks on the canvas
    function renderSticks() {
        // Draw each stick connecting two points on the canvas
        // Sticks may have a specified color and width
        for (var i = 0; i < sticks.length; i++) {
            var s = sticks[i];
            if (!s.hidden) {
                context.beginPath();
                context.strokeStyle = s.color ? s.color : "black";
                context.lineWidth = s.width ? s.width : 1;
                context.moveTo(s.p0.x, s.p0.y);
                context.lineTo(s.p1.x, s.p1.y);
                context.stroke();
            }
        }
    }

    // Function to render the engine on the canvas
    function renderEngine() {
        // Draw the engine as a circle on the canvas
        // The engine's position is determined by its oscillation
        context.beginPath();
        context.arc(engine.baseX, engine.baseY, engine.range, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
        context.arc(engine.x, engine.y, 5, 0, Math.PI * 2);
        context.fill();
    }

    // Main update function for the animation loop
    function update() {
        updateEngine(); // Update engine position and angle
        updatePoints(); // Update positions of points
        for (var i = 0; i < 5; i++) { // Iterate multiple times for stability
            updateSticks(); // Update lengths of sticks
            constrainPoints(); // Constrain points within canvas boundaries
        }
        context.clearRect(0, 0, width, height); // Clear canvas
        renderSticks(); // Render sticks
        renderEngine(); // Render engine
        requestAnimationFrame(update); // Request next animation frame
    }
};
