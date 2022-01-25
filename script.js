let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//some variables to set max frame rate
let fps = 30;
let framMinTime = (1000/60)*(60/fps)- (1000/60)*0.5
let lastFrameTime = 0
// making these global so i can update them across a couple functions
let theta = 0
let growth= 0
let deltaTheta = 0
let deltaGrowth = 0
let radius = 0

    //making a gloabal variable so i can stop the animation loop once the pattern leaves the screen
let currentX = 0

    //0.7612886436911847 0.2562268100311482 good dtheta and dgrowth values
//Function to get the mouse position
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

let rect = {
    x: canvas.width/2.3, 
    y: canvas.height/1.5, 
    width: 200, 
    height: 40
    
}
let thetaRandomizer = () =>{
    deltaTheta = Math.random()*(1-0.1)+0.1

    return deltaTheta
} 
let growthRandomizer = () => {
    deltaGrowth = Math.random()*(10)
    return deltaGrowth
}
let radiusRandomizer = () => {
    radius= Math.random()*(50-1)+1 
    return radius    
}
lineHandler = () =>{
    //setting up some variable to hold our starting data
    x = canvas.width/2
    y = canvas.height/2
    currentX = x + growth*Math.cos(theta)
    if(theta === 361) theta = 0 
    ctx.beginPath();
    ctx.arc(currentX, y + growth*Math.sin(theta), radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fillStyle = `blue`
    ctx.fill()
    theta += deltaTheta
    growth += deltaGrowth
}

buttonHandler = ()=>{
    ctx.fillStyle = 'gray'
    ctx.fillRect(canvas.width/2, canvas.height/1.5, 100, 40)
    ctx.fillRect(canvas.width/2, canvas.height/1.5,-100, 40 )
    ctx.fillStyle = 'black'
    ctx.font = "16px Arial";
    ctx.fillText("Click to make a new spiral", canvas.width/2.22, canvas.height/1.44);
}



animate= (time)=>{
    if(time-lastFrameTime < framMinTime){
        requestAnimationFrame(animate)
        return
    }
    lineHandler()
    buttonHandler()
    lastFrameTime = time
    if (currentX > canvas.width) return

    
    requestAnimationFrame(animate);
}

let startUp = () =>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
    theta = 0
    growth = 0
    currentX = 0
    deltaTheta = thetaRandomizer()
    deltaGrowth = growthRandomizer()
    radius = radiusRandomizer()
    canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
    
        if (isInside(mousePos,rect)) {
            startUp();
        }
    })
    animate()
}
startUp()