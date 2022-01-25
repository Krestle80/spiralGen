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
let r = Math.random()*(255)
let g = Math.random()*(255)
let b = Math.random()*(255)
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

//defining the button rectangle
let rect = {
    x: canvas.width/2.3, 
    y: canvas.height/1.5, 
    width: 200, 
    height: 40
    
}

lineHandler = () =>{
    //setting up some variable to hold our starting data
    x = canvas.width/2
    y = canvas.height/2
    //keeps track of x position of current circle to stop the program once its off screen
    currentX = x + growth*Math.cos(theta)
    //resets theta value after its larger than 360 degrees
    if(theta === 361) theta = 0 
    //draws circle
    ctx.beginPath();
    ctx.arc(currentX, y + growth*Math.sin(theta), radius, 0, 2 * Math.PI)
    ctx.closePath()
    //fills circle in with the random color that was selected at the start
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fill()
    // slowly increases growth and theta to make the spiral come out of the page 
    theta += deltaTheta
    growth += deltaGrowth
}

buttonHandler = ()=>{
    //creates a rectangle to use as a button
    ctx.fillStyle = 'gray'
    ctx.fillRect(canvas.width/2, canvas.height/1.5, 100, 40)
    ctx.fillRect(canvas.width/2, canvas.height/1.5,-100, 40 )
    // adds black text to say what the button does
    ctx.fillStyle = 'black'
    ctx.font = "16px Arial";
    ctx.fillText("Click to make a new spiral", canvas.width/2.22, canvas.height/1.44);
}



animate= (time)=>{
    //makes sure that the last frame was long enough before the current frame attempt before drawing a new frame
    if(time-lastFrameTime < framMinTime){
        requestAnimationFrame(animate)
        return
    }
    //draws circles
    lineHandler()
    //draws button
    buttonHandler()
    //keeps track of the time of the last frame
    lastFrameTime = time
    //if the computer tries to draw a circle off the right side of the screen, it ends the animation
    if (currentX > canvas.width) return

    
    requestAnimationFrame(animate);
}

//function to allow a reset with button press
let startUp = () =>{
    //clears old animation
    ctx.clearRect(0,0,canvas.width,canvas.height)
    //refreshes all variables for lineHandler,some of them are randomly chosen
    theta = 0
    growth = 0
    currentX = 0
     r = Math.random()*(255)
     g = Math.random()*(255)
     b = Math.random()*(255)
    deltaTheta = Math.random()*(1-0.1)+0.1
    deltaGrowth = Math.random()*(10)
    radius = Math.random()*(50-1)+1

    //makes button functional
    canvas.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
    
        if (isInside(mousePos,rect)) {
            startUp();
        }
    })
    animate()
}
startUp()