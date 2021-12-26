const canvas = document.getElementById("cw");
const context = canvas.getContext("2d");
let particlesArray = [];

const cursor = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};

const dt = 1.0
const du = 0.1
const edgeWidth = 0.1
class Particle {
    constructor(strokeColor) {
        this.V=Math.random()*5+2
        this.theta=Math.random()*2*Math.PI
        this.x = cursor.x + randn_bm() * 100;
        this.y = cursor.y + randn_bm() * 100;
        this.u = this.V*Math.sin(this.theta);
        this.v = this.V*Math.cos(this.theta);
        this.size = 20;
        this.alpha = 10 * Math.PI / 180;
        this.strokeColor = strokeColor;
        this.fillColor = strokeColor;
        this.theta = Math.atan2(this.v,this.u);

    }
    move()  {
        this.x = this.x + this.u*  dt;
        this.y = this.y + this.v * dt;
        this.theta = Math.atan2(this.u,this.v)
    }

    draw() {
        let L=this.size
        let a=this.alpha
        let th=this.theta
        context.beginPath();
        context.fillStyle = this.fillColor;
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - L*Math.sin(th-a), this.y - L*Math.cos(th-a));
        context.lineTo(this.x - L*Math.sin(th+a), this.y - L*Math.cos(th+a));
        context.fill();
    }

    detectEdge() {
        if ( this.x > innerWidth * (1 - edgeWidth)){
            this.u = this.u-du
        }
        if ( this.x < innerWidth * edgeWidth){
            this.u = this.u + du
        }
        if ( this.y > innerHeight * (1 - edgeWidth)){
            this.v = this.v - du
        }
        if ( this.y < innerHeight * edgeWidth){
            this.v = this.v + du
        }

    }
}




// addEventListener("click", (e) => {
//     cursor.x = e.clientX;
//     cursor.y = e.clientY;
// });

// addEventListener(
//     "touchmove",
//     (e) => {
//         e.preventDefault();
//         cursor.x = e.touches[0].clientX;
//         cursor.y = e.touches[0].clientY;
//     },
//     { passive: false }
// );

addEventListener("resize", () => setSize());

function generateParticles(amount) {
    for (let i = 0; i < amount; i++) {
        particlesArray[i] = new Particle(
            generateColor(),
        );
    }
}

function generateColor() {
    let hexSet = "0123456789ABCDEF";
    let finalHexString = "#";
    for (let i = 0; i < 6; i++) {
        finalHexString += hexSet[Math.ceil(Math.random() * 15)];
    }
    return finalHexString;
}

function setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
}


// Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function anim() {
    requestAnimationFrame(anim);
    context.fillStyle = "rgba(0,0,0,0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach((particle) => particle.move());
    particlesArray.forEach((particle) => particle.draw());
    particlesArray.forEach((particle) => particle.detectEdge());
}

generateParticles(100);
setSize();
anim();