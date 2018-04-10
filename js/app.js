// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var colors = ['#4497ec', '#0fedff', '#0fedff', '#0fedff'];

// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Objects
function  Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 1;

    this.update = () => {
        this.radians += this.velocity; 
        this.x = mouse.x + Math.cos(this.radians) * randomIntFromRange(40,150); 
        this.y = mouse.y + Math.sin(this.radians) * 120;
        this.draw();
    }
}


Object.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.strokeStyle = '#4497ec';
    c.fill();
    c.closePath();
    c.stroke();
};

// Implementation
let particles; 
function init() {
    particles = [];

    for (let i = 0; i < 350; i++) {
        particles.push(new Particle(canvas.width/2, canvas.height /2, 4, randomColor(colors)));
    }
    console.log(particles);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "#000";
    c.fillRect(0, 0, canvas.width, canvas.height)
    
        particles.forEach(particle => {
        particle.update();
    });
}

init();
animate();
