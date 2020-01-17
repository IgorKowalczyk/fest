/* (c) IGOR KOWALCZYK. All rights reserved. */

/* PARTICLES */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;
let mouse = {
x: null,
y: null,
radius: ((canvas.height/80) * (canvas.width/80))
}
window.addEventListener('mousemove',
function(event){
mouse.x = event.x;
mouse.y = event.y;
});
class Particle {
constructor(x, y, directionX, directionY, size, color) {
this.x = x;
this.y = y;
this.directionX = directionX;
this.directionY = directionY;
this.size = size;
this.color = color;
this.speedX = this.directionX;
this.speedY = this.directionY;
}
draw() {
ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI * 2, false);
ctx.transition = '300ms';
ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
ctx.fill();
}
update() {
if (this.x > canvas.width || this.x < 0){
this.directionX = -this.directionX;
this.speedX = this.directionX;
} if (this.y + this.size > canvas.height || this.y - this.size < 0){
this.directionY = -this.directionY;
this.speedY = this.directionY;
}
this.x += this.directionX;
this.y += this.directionY;
this.draw();
}
}
function connect() {
let opacityValue = 0.1;
for (let a = 0; a < particleArray.length; a++) {
for (let b = a; b < particleArray.length; b++){
let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x))
+   ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
if  (distance < (canvas.width/7) * (canvas.height/7))
{
opacityValue = 1-(distance/10000);
ctx.strokeStyle='rgba(0, 0, 0,' + opacityValue +')';
ctx.duration = '300ms';
ctx.beginPath();
ctx.lineWidth = 1;
ctx.moveTo(particleArray[a].x, particleArray[a].y);
ctx.lineTo(particleArray[b].x, particleArray[b].y);
ctx.stroke();
}
}
}
}
function init(){
particleArray = [];
let numberOfParticles = (canvas.height*canvas.width)/9000;
for (let i=0; i<numberOfParticles; i++){
let size = (Math.random()*5)+1;
let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
let directionX = (Math.random() * 2) - 1;
let directionY = (Math.random() * 2) - 1;
let color = 'gold';
particleArray.push(new Particle(x, y, directionX, directionY, size, color));
}
}
function animate(){
requestAnimationFrame(animate);
ctx.clearRect(0,0,innerWidth,innerHeight);
for (let i = 0; i < particleArray.length; i++){
particleArray[i].update();
}
connect();
}
init();
animate();
window.addEventListener('resize',
function(){
canvas.width = innerWidth;
canvas.height = innerHeight;
mouse.radius = ((canvas.height/80) * (canvas.width/80));
init();
}
)
window.addEventListener('mouseout',
function(){
mouse.x = undefined;
mouse.y = undefined;
}
)

/* /PARTICLES */
