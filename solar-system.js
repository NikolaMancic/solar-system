var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth * 0.98; // use 98% of size to prevent scroll bars
canvas.height = window.innerHeight * 0.98;
var ctx = canvas.getContext('2d');

var bgCanvas = document.createElement('canvas');
bgCanvas.width = canvas.width;
bgCanvas.height = canvas.height;
var bgCtx = bgCanvas.getContext('2d');

var spritesheet = new Image();

var W = canvas.width;
var H = canvas.height;

var centerX = W / 2;
var centerY = H / 2;

var PI2 = Math.PI * 2;

function rand(max) { return Math.random() * max; }

var sun = {x: centerX, y: centerY, radius: 50, srcX: 0, srcY: 0};

var planets = {
    mercury: {angle: rand(PI2), radius: 4,  orbit: 70,  speed: 0.001, srcX: 100, srcY: 125},
    venus:   {angle: rand(PI2), radius: 8,  orbit: 90,  speed: 0.001, srcX: 100, srcY: 50},
    earth:   {angle: rand(PI2), radius: 8,  orbit: 110, speed: 0.001, srcX: 100, srcY: 75},
    mars:    {angle: rand(PI2), radius: 6,  orbit: 135, speed: 0.001, srcX: 100, srcY: 100},
    jupiter: {angle: rand(PI2), radius: 20, orbit: 170, speed: 0.001, srcX: 0,   srcY: 100},
    saturn:  {angle: rand(PI2), radius: 16, orbit: 210, speed: 0.001, srcX: 50,  srcY: 100},
    uranus:  {angle: rand(PI2), radius: 12, orbit: 240, speed: 0.001, srcX: 100, srcY: 0},
    neptune: {angle: rand(PI2), radius: 12, orbit: 270, speed: 0.001, srcX: 100, srcY: 25}
};

function drawBackground() {
    'use strict';

    bgCtx.fillStyle = '#000';
    bgCtx.fillRect(0, 0, W, H);

    // draw rings
    bgCtx.strokeStyle = '#222';
    bgCtx.strokeWidth = 1;
    for (var planet in planets) {
        var p = planets[planet];

        bgCtx.beginPath();
        bgCtx.arc(centerX, centerY, p.orbit, 0, PI2, false);
        bgCtx.stroke();
        bgCtx.closePath();
    }

    // draw stars
    bgCtx.fillStyle = '#FFF';
    for(var i = 0; i < 150; i++) {
        bgCtx.fillRect(rand(W), rand(H), 1, 1);
    }

    // draw sun
    bgCtx.drawImage(spritesheet,
                    sun.srcX, sun.srcY, sun.radius * 2, sun.radius * 2,
                    sun.x - sun.radius, sun.y - sun.radius, sun.radius * 2, sun.radius * 2);
}

function draw() {
    'use strict';

    ctx.drawImage(bgCanvas, 0, 0);

    // draw planets
    for (var planet in planets) {
        var p = planets[planet];

        var x = centerX + Math.cos(p.angle) * p.orbit;
        var y = centerY + Math.sin(p.angle) * p.orbit;
        ctx.drawImage(spritesheet,
                      p.srcX, p.srcY, p.radius * 2, p.radius * 2,
                      x - p.radius, y - p.radius, p.radius * 2, p.radius * 2);

        p.angle += p.speed;
    }

    window.requestAnimationFrame(draw);
}

spritesheet.addEventListener('load', function() {
    'use strict';

    drawBackground();
    draw();
});

spritesheet.src = 'solar-system.png';
