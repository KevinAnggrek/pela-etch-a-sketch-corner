// Select DOM Objects
const canvas = document.querySelector('#leaf-falling-canvas');
const ctx = canvas.getContext('2d');

// Initial values
const LEAF_TOTAL = 150;
const SNOWFLAKE_TOTAL = 200;
const leafArray = [];
const snowflakeArray=[];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create image objects
const leafImg = new Image();
leafImg.src = 'media/img/maple-leaf.png';
const darkerLeafImg = new Image();
darkerLeafImg.src = 'media/img/maple-leaf-darker.png';
const snowflakeImg = new Image();
snowflakeImg.src = 'media/img/snowflake.png';
const snowflakeImg2 = new Image();
snowflakeImg2.src = 'media/img/snowflake-2.png';


export function renderLeafAnimation() {
    for (let i=0;i<LEAF_TOTAL;i++) {
        leafArray.push(new Leaf());
    }
    render();
    
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        leafArray.forEach(leaf => leaf.animate())
        window.requestAnimationFrame(render)
    }
}

export function renderSnowAnimation() {
    for (let i=0;i<SNOWFLAKE_TOTAL;i++) {
        snowflakeArray.push(new Snowflake());
    }
    render();
    
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        snowflakeArray.forEach(snowflake => snowflake.animate())
        window.requestAnimationFrame(render)
    }
}


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
});

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
        this.x = (Math.random() * canvas.width * 2) - canvas.width; 
        this.y = (Math.random() * canvas.height * 2) - canvas.height; 
        this.w = 50;
        this.h = 50;
        this.opacity = this.w / 40; // Leaf opacity
        this.img = Math.random() < 0.5 ? snowflakeImg : snowflakeImg2;

        this.xVelocity = 1 + Math.random() * 1;
        this.yVelocity = 0.25 + Math.random() * 1;
    }

    draw() {
        if (this.y > canvas.height || this.x > canvas.width) { 
            this.x = (Math.random() * canvas.width * 2) - canvas.width; 
            this.y = 0;
        }

        ctx.globalAlpha = this.opacity;
        ctx.drawImage(
        this.img, 
        this.x, 
        this.y, 
        this.w,
        this.h
        );
    }

    animate() {
        if (Math.random()<0.9) {

        }
        else {
            if (Math.random()<0.5) {
                this.x += this.xVelocity;
            }
            else {
                this.x -= this.xVelocity;
            }
        }
        this.y += this.yVelocity;
        this.draw();
    }

}

