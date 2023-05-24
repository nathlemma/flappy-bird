document.addEventListener("DOMContentLoaded", () => {
  const playGround = document.querySelector(".playGround");
  const cat = document.createElement("div");
  let catLeftSpace = 50;
  let catBottomSpace = 500;
  let numPlatform = 4;
  let platforms = [];
  const gravity = 1;
  const platformSpeed = 4;
  let time = 0; //seconds
  let flag = true;
  let gameOver = false;
  let movePlatformID;
  let fallID;
  let checkHeightID;
  let eventListener;

  function makeCat() {
    playGround.appendChild(cat);
    cat.classList.add("cat");
    cat.style.left = catLeftSpace + "px";
    cat.style.bottom = catBottomSpace + "px";
  }

  function endGame() {
    clearInterval(movePlatformID);
    clearInterval(fallID);
    clearInterval(checkHeightID);
    gameOver = true;
  }
  function freeFall() {
    console.log("cat bottom: " + catBottomSpace);
    if (catBottomSpace < 0) {
      endGame();
    }
    catBottomSpace += gravity * (-2 * time + 10);
    cat.style.bottom = catBottomSpace + "px";
    time += 1;
  }

  class Platform {
    constructor(bottom) {
      this.bottom = bottom;
      this.left = Math.random() * (400 - 90);
      this.element = document.createElement("div");
      const element = this.element;
      element.classList.add("platform");
      element.style.left = this.left + "px";
      element.style.bottom = this.bottom + "px";
      playGround.appendChild(this.element);
    }
  }

  function makePlatforms() {
    for (let i = 0; i < numPlatform; i++) {
      let gap = 600 / numPlatform;
      let bottom = i * gap + 60;
      platforms.push(new Platform(bottom));
      console.log(platforms);
    }
  }

  function movePlatforms(pixel) {
    if (!flag) {
      if (catBottomSpace < 0) {
        endGame();
      }
      catBottomSpace -= pixel;
      cat.style.bottom = catBottomSpace + "px";
    }
    platforms.forEach((platform) => {
      platform.bottom -= pixel;
      let element = platform.element;
      element.style.bottom = platform.bottom + "px";
    });
  }

  function moveUp(pixel) {
    catBottomSpace += pixel;
    cat.style.bottom = catBottomSpace + "px";
  }

  function moveRight(pixel) {
    catLeftSpace += pixel;
    cat.style.left = catLeftSpace + "px";
  }

  function moveLeft(pixel) {
    catLeftSpace -= pixel;
    cat.style.left = catLeftSpace + "px";
  }

  function checkHeight() {
    function compare(div1, div2) {
      var rect1 = div1.getBoundingClientRect();
      var rect2 = div2.getBoundingClientRect();
      if (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
      ) {
        clearInterval(fallID);
        flag = false;
        console.log("Divs are touching or overlapping.");
        // Do something when the divs touch or overlap
      } else {
        // Do something when the divs do not touch
      }
    }
    platforms.forEach((p) => {
      compare(p.element, cat);
    });
  }
  function run() {
    makeCat();
    makePlatforms();

    movePlatformID = setInterval(movePlatforms, 50, platformSpeed);
    fallID = setInterval(freeFall, 50);
    checkHeightID = setInterval(checkHeight, 1);

    eventListener = document.addEventListener("keydown", (event) => {
      if (event.key == "ArrowUp" && !gameOver) {
        moveUp(100);
        time = 0;
        if (!flag) {
          flag = true;
          fallID = setInterval(freeFall, 50);
          checkHeightID = setInterval(checkHeight, 1);
        }
      }
      if (event.key == "ArrowRight" && !gameOver) {
        moveRight(30);
        time = 0;
        if (!flag) {
          flag = true;
          fallID = setInterval(freeFall, 50);
          checkHeightID = setInterval(checkHeight, 1);
        }
      }

      if (event.key == "ArrowLeft" && !gameOver) {
        moveLeft(30);
        time = 0;
        if (!flag) {
          flag = true;
          fallID = setInterval(freeFall, 50);
          checkHeightID = setInterval(checkHeight, 1);
        }
      } else {
      }
      console.log("pressed: " + event.key);
    });
  }

  run();
});
