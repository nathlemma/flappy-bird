document.addEventListener("DOMContentLoaded", () => {
  const playGround = document.querySelector(".playGround")
  const cat = document.createElement("div")
  let catLeftSpace = 50
  let catBottomSpace = 500
  let numPlatform = 4
  let platforms = []
  const gravity = 1
  let gap
  const platformSpeed = 4
  let time = 0 
  let fallSpeed = 5
  let isTouching = false
  let isFalling = true
  let gameOver = false
  let movePlatformID
  let fallID
  let jumpID
  let checkHeightID
  let eventListener

  function makeCat() {
    playGround.appendChild(cat)
    cat.classList.add("cat")
    cat.style.left = catLeftSpace + "px"
    cat.style.bottom = catBottomSpace + "px"
  }
  class Platform {
    constructor(bottom) {
      this.bottom = bottom
      this.left = Math.random() * (400 - 90)
      this.element = document.createElement("div")
      const element = this.element
      element.classList.add("platform")
      element.style.left = this.left + "px"
      element.style.bottom = this.bottom + "px"
      playGround.appendChild(this.element)
    }
  }

  function makePlatforms() {
    for (let i = 0; i < numPlatform; i++) {
      gap = 600 / numPlatform
      let bottom = i * gap + 60
      platforms.push(new Platform(bottom))
      console.log(platforms)
    }
  }

  function movePlatforms(fallSpeed) {
    platforms.forEach((platform) => {
      platform.bottom -= fallSpeed
      let element = platform.element
      element.style.bottom = platform.bottom + "px"
      if (platform.bottom < 0) {
        let removedPlat = platforms.shift()
        removedPlat.element.classList.remove('platform')
        platforms.push(new Platform(600))
      }
    })
  }

  function endGame(){
    console.log("game over")
  }

  function moveUp(pixel) {
    catBottomSpace += pixel
    cat.style.bottom = catBottomSpace + "px"
  }

  function moveRight(pixel) {
    catLeftSpace += pixel
    cat.style.left = catLeftSpace + "px"
  }

  function moveLeft(pixel) {
    catLeftSpace -= pixel
    cat.style.left = catLeftSpace + "px"
  }

  function fall() {
    if (catBottomSpace < 0) {
      endGame()
    }
    if(!isTouching) {
      platforms.forEach((platform) => {
        if (
          catBottomSpace >= platform.bottom &&
          catBottomSpace <= platform.bottom + 15 &&
          catLeftSpace + 60 >= platform.left &&
          catLeftSpace <= platform.left + 85
        ) {
          isTouching = true
          isFalling = false
          console.log("Touching")
        }
      })
    }
    if (isFalling) {
      catBottomSpace += gravity * (-2 * time + 10)
      cat.style.bottom = catBottomSpace + 'px'
      time += 1
    }
    else{
        clearInterval = fallID
        catBottomSpace -= fallSpeed
        cat.style.bottom = cat.bottom + "px"
    }
    
  }
  

  // function checkHeight(){
  //   function compare(div1, div2) {
  //     var rect1 = div1.getBoundingClientRect()
  //     var rect2 = div2.getBoundingClientRect()
  //     if (
  //       rect1.left < rect2.right &&
  //       rect1.right > rect2.left &&
  //       rect1.top < rect2.bottom &&
  //       rect1.bottom > rect2.top
  //     ) {
  //       clearInterval(fallID)
  //       flag = false
  //       console.log("Divs are touching or overlapping.")
  //       // Do something when the divs touch or overlap
  //     } else {
  //       // Do something when the divs do not touch
  //     }
  //   }
  //   platforms.forEach((p) => {
  //     compare(p.element, cat)
  //   })
  // }
  function run() {
    makeCat()
    makePlatforms()
    setInterval(movePlatforms,30,platformSpeed)
    fallID = setInterval(fall, 30)

  }
  run()
})
