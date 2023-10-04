// Select DOM Objects
const canvas = document.querySelector('#leaf-falling-canvas');
const ctx = canvas.getContext('2d');

// Initial values
const LEAF_TOTAL = 150;
const SNOWFLAKE_TOTAL = 200;
let leafArray = [];
let snowflakeArray=[];
let currentAnimation;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Classes
// Leaf class
class Leaf {
    constructor() {
        this.x = Math.random() * canvas.width; // Leaf starting X position
        this.y = (Math.random() * canvas.height * 2) - canvas.height; // Leaf starting Y position
        this.w = 50 + Math.random() * 15; // Leaf width
        this.h = 40 + Math.random() * 10; // Leaf height
        this.opacity = this.w / 40; // Leaf opacity
        this.flip = Math.random();
        this.img = Math.random() < 0.5 ? leafImg : darkerLeafImg;

        this.xVelocity = 0.5 + Math.random() * 1;
        this.yVelocity = 0.5 + Math.random() * 1;
        this.flipVelocity = Math.random() *0.003;
    }

    draw() { // Function that will draw the Leaf on the target canvas
        if (this.y > canvas.height || this.x > canvas.width) { // if leaf is outside of canvas
            this.x = -leafImg.width;
            this.y = (Math.random() * canvas.height * 2) - canvas.height;
            this.flip = Math.random();
        }

        ctx.globalAlpha = this.opacity; // Sets the opacity or alpha property of the context
        ctx.drawImage(
        this.img, 
        this.x, // x-axis coordinate of the canvas at which to place top-left corner of the image 
        this.y, // y-axis coordinate of the canvas at which to place top-left corner of the image 
        this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)), // the actual width of the image when drawn on the canvas, seems like the flipping effect is achieved through enlargement and reduction of the leaf's size
        this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5)) // the actual height of the image when drawn on the canvas
        );
    }

    animate() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.flip += this.flipVelocity;
        this.draw();
    }
}

// Snowflake Class
class Snowflake {
    constructor() {
        this.x = (Math.random() * canvas.width * 2) - canvas.width; // original x location
        this.y = (Math.random() * canvas.height * 2) - canvas.height; // original y location
        this.size = 50+Math.random() * 50;
        this.opacity = this.w / 40; // Leaf opacity
        this.img = Math.random() < 0.5 ? snowflakeImg : snowflakeImg2;
        this.behavior = Math.random() < 0.5 ? 'rotating' : 'zigzag'
        this.xMoveLimit = 0;
        this.xDir = Math.random() <0.5? 'right' : 'left';
        this.xVelocity = 0.25;
        this.yVelocity = 0.25 + Math.random() * 1;
        this.rotation = Math.random() *Math.PI*2; // Random initial rotation
        this.rotationSpeed = (Math.random() - 0.5) * 0.02; // Random speed between -0.01 to 0.01
    }

    draw() {
        if (this.y > canvas.height || this.x > canvas.width) { 
            this.x = (Math.random() * canvas.width * 2) - canvas.width; 
            this.y = 0;
        }
        ctx.globalAlpha = this.opacity;
        if (this.behavior==='rotating') {
            ctx.save();
            ctx.translate(this.x + this.size / 2, this.y + this.size / 2); // Translate the matrix of the context to the snowflake's center.
            ctx.rotate(this.rotation);
            ctx.drawImage( // If we do not translate and draw the image at this.x and this.y, the result will be snowflakes that orbit the original matrix location of (0,0) of the context, which we don't want. What we want is to achieve is rotating the snowflake image 
                this.img, 
                -this.size / 2, // since the matrix has been moved to the center of the snowflake, the top left corner of the image will be at half the width and height from the center of the snowflake / center of the ctx
                -this.size / 2, 
                this.size, 
                this.size
                ); // Draw the snowflake centered on the origin.
            ctx.restore(); // Restore the original state
            
        }
        else {
            ctx.drawImage(
                this.img, 
                this.x, 
                this.y, 
                this.size,
                this.size
            );
        }
    }

    animate() {
        if (this.behavior==='zigzag') {
            if (this.xDir==='right') {
                if (this.xMoveLimit >= 50) {
                    this.xDir = 'left';
                    this.xMoveLimit=0;
                }
                this.x += this.xVelocity;
                this.xMoveLimit+=this.xVelocity;
            }
            else {
                if (this.xMoveLimit >= 50) {
                    this.xDir = 'right';
                    this.xMoveLimit=0;
                }
                this.x -= this.xVelocity;
                this.xMoveLimit+=this.xVelocity;
            }
        }
        else {
            this.rotation += this.rotationSpeed;
        }
        this.y += this.yVelocity;
        this.draw();
    }
}

// Create image objects
const leafImg = new Image();
leafImg.src = 'media/img/maple-leaf.png';
const darkerLeafImg = new Image();
darkerLeafImg.src = 'media/img/maple-leaf-darker.png';
const snowflakeImg = new Image();
snowflakeImg.src = 'media/img/snowflake.png';
const snowflakeImg2 = new Image();
snowflakeImg2.src = 'media/img/snowflake-2.png';

function fillLeafArray() {
    for (let i=0;i<LEAF_TOTAL;i++) {
        leafArray.push(new Leaf());
    }
}

function fillSnowflakeArray() {
    for (let i=0;i<SNOWFLAKE_TOTAL;i++) {
        snowflakeArray.push(new Snowflake());
    }
}

function renderLeaf() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    leafArray.forEach(leaf => leaf.animate());
    currentAnimation = window.requestAnimationFrame(renderLeaf);
}

function renderSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    snowflakeArray.forEach(snowflake => snowflake.animate())
    currentAnimation = window.requestAnimationFrame(renderSnow)
}

export function renderLeafAnimation() {
    if (currentAnimation) {
        window.cancelAnimationFrame(currentAnimation);
    }
    leafArray.length = 0;
    fillLeafArray();
    renderLeaf();
}

export function renderSnowAnimation() {
    if (currentAnimation) {
        window.cancelAnimationFrame(currentAnimation);
    }
    snowflakeArray.length = 0;
    fillSnowflakeArray();
    renderSnow();
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
});



