const skyDim = {x: 500, y: 580};
const groundDim =  {x:500, y:170};
const birdDim = {x: 60, y: 45};
const obstacleDim = {x:60, y:300}

const birdInit =  {x: 0, y: 300};
let loc =  {x: birdInit.x, y: birdInit.y};//current birds location
let obstacleLeft
const movSpeed = 0 
const fallSpeed = 2
const fallInterval = 20
const jumpHeight = 50
let fallId, jumpId
let touchFlag = false //is bird touching ground?

function game(){
    const bird = document.querySelector('.bird')
    const playGround = document.querySelector('.play-ground')
    const ground = document.querySelector('.ground')

    function move(x,y){
        loc.y = y
        loc.x = x
        bird.style.left = x + 'px'
        bird.style.bottom = y + 'px'
        flag = true
        
    } 

    function freeMotion(){
        console.log("moving: " + loc.x + ':' + loc.y)
        if(loc.y<0 || loc.x > skyDim.x-birdDim.x - 5){
            touchFlag = true
            //alert("game over")
            clearInterval(fallId)
        }
        else move(loc.x+movSpeed, loc.y-fallSpeed)
    }

    function jump(){
        console.log("jumping")
        if(loc.y < skyDim.y-birdDim.y){
            // clearInterval(fallId)
            //console.log(loc.y)
            
            move(loc.x,loc.y+Math.min(jumpHeight,skyDim.y-birdDim.y - loc.y ))
            // fallId = setInterval(fall, fallInterval)
        }  
    }

    function control(e){
        if(e.keyCode === 32){
            if(!touchFlag) jump()
        }
    }

    let obstacles = []
    let obstacleIds = []

    function makeObstacle(){
        const obstacle = document.createElement('div')
        obstacle.classList.add('obstacle')
        obstacles.push(obstacle)
        playGround.appendChild(obstacle)
        obstacle.style.bottom = groundDim.y + 'px'
        obstacleLeft = groundDim.x + - obstacleDim.x
        obstacle.style.left = obstacleLeft + 'px'

        function move(){
            obstacleLeft -= 10
            obstacle.style.left = obstacleLeft  + 'px'
            if(obstacleLeft< -1*obstacleDim.x){
                clearInterval(obstacleId)
                playGround.removeChild(obstacle)
            }
        }
        let obstacleId = setInterval(move, 20)
        obstacleIds.push()
    }


    setInterval(makeObstacle, 200)


    move(birdInit.x, birdInit.y)
    //fallId = setInterval(freeMotion, fallInterval)
    document.addEventListener('keydown', control)
    

}
      
document.addEventListener("DOMContentLoaded", game)