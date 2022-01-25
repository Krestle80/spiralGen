let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

frame = 0 
//setting up some variable to hold our starting data
    x = canvas.width/2
    y = canvas.height/2
    theta = 0
    deltaTheta = Math.random()*(1-0.1)+0.1
    growth= 0
    deltaGrowth = Math.random()*(10)
    radius= Math.random()*(50-1)+1 
    //making a gloabal variable so i can stop it once it fills the screen
    currentX = 0
    console.log(deltaTheta, deltaGrowth)
    //0.7612886436911847 0.2562268100311482 good dtheta and dgrowth values
lineHandler = () =>{
    currentX = x + growth*Math.cos(theta)
    if(theta === 361) theta = 0 
    ctx.beginPath();
    ctx.arc(x + growth*Math.cos(theta), y + growth*Math.sin(theta), radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fillStyle = `blue`
    ctx.fill()
    theta += deltaTheta
    growth += deltaGrowth
}

animate= ()=>{
    lineHandler()
    if (currentX > canvas.width) return
    console.log('frame') 
    frame ++ 
    requestAnimationFrame(animate);
}
animate()
