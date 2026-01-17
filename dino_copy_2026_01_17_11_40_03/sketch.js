// Converted to p5.js format
let dinoX, dinoY;
let groundY;
let gravity = 1;
let jumpVelocity = -15;
let velocityY = 0;
let isJumping = false;
let gameStarted = false;
let showBottleAfterRubbish = false;
let width;

let before;
let after;
let glitch;
let bottle;
let floor;
let sky;
let rubbish;
let recycle;
let trash;
let start;
let end;

let bag1;
let shirt2;
let shoe3;
let case4;
let coat5;
let bag6;
let bag7;
let chair8;

let obstacles;
let currentShape = 0;          // 0 = square, 1 = circle, 2 = triangle
let dinoColor; // default black


let timer;

const BOTTLE = 0;
const BAG1 = 1;
const SHIRT2 = 2;
const SHOE3 = 3;
const CASE4 = 4;
const COAT5 = 5;
const BAG6 = 6;
const BAG7 = 7;
const CHAIR8 = 8;

const RECYCLE = 0; // green
const RUBBISH = 1; // red
let recycleCount = 0; // Track how many recyclables collected
let rubbishCount = 0; // This was already there but now it's properly used

let year = 2025;
let gameSpeed = 1;
let dinoEndSpeed = 1;

let xt = 1;
let x = 1;

// For scrolling background images using array
let bgImages = []; // Array to hold two background images
let bgX = []; // Array to hold positions of background images

// For incrementing year at increasing rates
let lastYearIncrement = 0; // Track when we last incremented the year
let baseIncrementInterval = 8; // Start with 8 frames (about 7.5 per second)
let currentIncrementInterval = baseIncrementInterval;

function preload() {
  before = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/f9836b9b-6e2b-460c-b001-7ccecf914e98.PNG");
  after = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/1009250b-3a83-4046-a736-32fc177458fd.PNG");
  glitch = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/163bcad2-7777-4315-aa81-d8731fb55d07.PNG");
  bottle = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/7394fe24-8d7f-4eaa-a6c9-3926d9ee6e60.PNG");
  floor = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/5259dbf6-8f00-4c3f-9d7a-8c07a0734ac2.PNG");
  sky = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/08f62e49-d222-46be-a410-19e3a2e3b560.jpg");
  rubbish = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/187bf96a-7db2-43e9-a63e-2fc7b1ad589c.PNG");
  recycle = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/f233502f-d03c-4414-91bf-370f3e4d9e20.PNG");
  trash = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/912c36fb-74f8-42c7-8160-0c783570b36d.PNG");
  start = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/d82ece39-073e-4b55-91d1-65928b1723a9.JPG");
  end = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/edadccb4-5c22-48b9-93d9-25efb268bcb9.jpg");

  bag1 = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/06f0184e-47a3-4535-841e-ef95759c7693.PNG");
   
  
  
  shirt2 =      loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/59f1a93b-18cb-4b77-a67b-c0fe97d8d747.PNG");
  shoe3 = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/5561a5c8-17ee-4c27-a04e-7b2d60b7f5d1.PNG");
  case4 = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/4669c6ed-becb-4ac3-b3c9-bb142f9f90e0.PNG");
  coat5 = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/0562d259-e2d5-410c-9629-598b7562deea.PNG");
  bag6 = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/c99c19a2-8ba0-45af-878c-cb8b710a753d.PNG");
  bag7 = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/a1daff1d-f3ba-44dc-af2d-cc59667d5062.PNG");
  chair8 = loadImage("https://assets.editor.p5js.org/696b22a880e0d8ece195b9c4/74892cbe-6f44-4f6b-b86b-70edcb0809f3.PNG");
}

function setup() {
  width=800;
  createCanvas(800, 400);
  dinoX = 50;
  groundY = height - 100;
  dinoY = 0; // Start above ground (60 is dino height)
  obstacles = [];
  textAlign(LEFT, TOP);
  
  // Initialize background arrays
  bgX[0] = 0;       // First image at position 0
  bgX[1] = 800;     // Second image starts right after first
  
  dinoColor = color(0);
}

function resetGame() {
  // Reset all game variables to initial state
  dinoX = 50;
  dinoY = 0;
  velocityY = 0;
  isJumping = false;
  gameStarted = false;
  showBottleAfterRubbish = false;
  timer = 0;
  currentShape = 0;
  dinoColor = color(0);
  obstacles = [];
  year = 2025;
  gameSpeed = 1;
  dinoEndSpeed = 1;
  xt = 1;
  x = 1;
  recycleCount = 0;
  rubbishCount = 0;

  // Reset background positions
  bgX[0] = 0;
  bgX[1] = 800;

  // Reset year increment tracking
  lastYearIncrement = 0;
  currentIncrementInterval = baseIncrementInterval;
}

function draw() {
  background(255);

  let prob = random(0.09, 1);

  if (gameStarted) {
    timer++;
  }
  // print(timer); // Comment out for performance

  if (gameStarted && timer < 5000) {
    xt = xt - 1 * gameSpeed / 3;
  }
  image(sky, xt, 0);

  floor.resize(800, 400);
  image(floor, 0, 0);

  // Handle background images
  let currentBg1, currentBg2;
  if (timer < 2300) {
    currentBg1 = before;
    currentBg2 = before;
  } else if (timer >= 2300 && timer <= 2500) {
    if (prob < 0.1) {
      currentBg1 = before;
      currentBg2 = before;
    } else if (prob > 0.1 && prob < 0.7) {
      currentBg1 = after;
      currentBg2 = after;
    } else {
      currentBg1 = glitch;
      currentBg2 = glitch;
    }
  } else {
    currentBg1 = after;
    currentBg2 = after;
  }

  if (currentBg1 !== undefined) {
    currentBg1.resize(800, 400);
    currentBg2.resize(800, 400);
    
    image(currentBg1, bgX[0], 0);
    image(currentBg2, bgX[1], 0);
  }

  // Update scrolling positions
  if (gameStarted) {
    for (let i = 0; i < bgX.length; i++) {
      bgX[i] -= gameSpeed / 2;
      if (bgX[i] <= -800) {
        bgX[i] = bgX[(i + 1) % 2] + 800;
      }
    }
  }

  // Update and display dino (existing code remains the same)
  if (isJumping || gameStarted) {
    dinoY += velocityY;
    velocityY += gravity;

    if (dinoY >= groundY - 60) {
      dinoY = groundY - 60;
      isJumping = false;
      gameStarted = true;
      velocityY = 0;
    }
  }

  // Draw dino with current shape (existing code remains the same)
  fill(dinoColor);
  if (showBottleAfterRubbish) {
    bottle.resize(100, 100);
    image(bottle, dinoX, dinoY - 30);
  } else {
    switch (currentShape) {
      case BOTTLE:
        bottle.resize(100, 100);
        image(bottle, dinoX, dinoY - 30);
        break;
      case BAG1:
        bag1.resize(100, 100);
        image(bag1, dinoX, dinoY - 30);
        break;
      case SHIRT2:
        shirt2.resize(100, 100);
        image(shirt2, dinoX, dinoY - 30);
        break;
      case SHOE3:
        shoe3.resize(100, 100);
        image(shoe3, dinoX, dinoY - 30);
        break;
      case CASE4:
        case4.resize(100, 100);
        image(case4, dinoX, dinoY - 30);
        break;
      case COAT5:
        coat5.resize(100, 100);
        image(coat5, dinoX, dinoY - 30);
        break;
      case BAG6:
        bag6.resize(100, 100);
        image(bag6, dinoX, dinoY - 30);
        break;
      case BAG7:
        bag7.resize(100, 100);
        image(bag7, dinoX, dinoY - 30);
        break;
      case CHAIR8:
        chair8.resize(100, 100);
        image(chair8, dinoX, dinoY - 30);
        break;
    }
  }

  if (gameStarted) {
    // Update and display obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
      let o = obstacles[i];
      o.update();
      o.display();

      if (o.hits(dinoX, dinoY)) {
        if (o.type === RECYCLE) {
          let newShape;
          do {
            newShape = Math.floor(random(8));
          } while (newShape === currentShape);
          currentShape = newShape;
          showBottleAfterRubbish = false;
          recycleCount++;
        } else if (o.type === RUBBISH) {
          showBottleAfterRubbish = true;
          dinoY = 0;
          rubbishCount++;
        }
        obstacles.splice(i, 1);
      }
    }

    // SPAWN OBSTACLES (outside collision detection)
    if (year < 3050) {
      if (frameCount % 100 === 0) {
        if (random(1) < 0.4) {
          obstacles.push(new Obstacle(width, groundY, RECYCLE));
          obstacles.push(new Obstacle(width + 300, groundY, RUBBISH));
        } else {
          let type = (random(1) > 0.5) ? RECYCLE : RUBBISH;
          obstacles.push(new Obstacle(width, groundY, type));
        }
      }
    }

    // YEAR INCREMENT LOGIC
    let decadeCount = Math.floor((year - 2025) / 100);
    currentIncrementInterval = Math.max(2, baseIncrementInterval - decadeCount);

    if (frameCount - lastYearIncrement >= currentIncrementInterval) {
      year += 1;
      lastYearIncrement = frameCount;
    }

    // DISPLAY UI TEXT (moved outside obstacle loop)
    fill(67, 189, 255);
    textSize(24);
    textStyle(BOLD);
    text("Year: " + year, 10, 10);
    text("RECYCLE: " + recycleCount, 150, 10);
    text("RUBBISH: " + rubbishCount, 300, 10);

    // END GAME AND DIFFICULTY LOGIC
    if (year > 4000 && dinoX < 400) {
      dinoX += dinoEndSpeed;
    }

    gameSpeed = 4 + year / 1000;
  } else {
start.resize (width,height);
    image(start, 0,0);
  }

  // END GAME BACKGROUND
  if (year > 3025 && dinoX < 600 && x > -800) {
    dinoX += dinoEndSpeed;
    x = x - 1 * dinoEndSpeed * 2;
  }
  image(trash, x, 1600, 400);

  if (year > 3400) {
    end.resize(800, 400);
    image(end, 0, 0);
  }
}





function keyPressed() {
  if (key === ' ') {
    if (!gameStarted) {
      // Start the game
      isJumping = true;
      velocityY = jumpVelocity;
    } else if (!isJumping) {
      // During gameplay, make dino jump
      isJumping = true;
      velocityY = jumpVelocity;
    }

    // If game has ended (dino reached end), restart the game
    if (year > 3400) {
      resetGame();
    }
  }
  return;
}

class Obstacle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.type = type; // 0 = recycle (green), 1 = rubbish (red)
  }

  update() {
    this.x -= gameSpeed;
  }

  display() {
    if (this.type === RECYCLE) {
      recycle.resize(100, 100);
      image(recycle, this.x, this.y - 90);
    } else {
      rubbish.resize(100, 100);
      image(rubbish, this.x, this.y - 90);
    }
  }

  hits(dinoX, dinoY) {
    return (dinoX + 40 > this.x &&
      dinoX < this.x + this.width &&
      dinoY + 60 > this.y - this.height &&
      dinoY < this.y);
  }
}
