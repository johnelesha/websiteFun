// Select Canvas
var canvas = document.querySelector("#pong");
var ctx = canvas.getContext("2d");

//Game Variables
var COM_LEVEL = 0.2;
var PLAYER_WIDTH = 20;
var PLAYER_HEIGHT = 100;
var BALL_START_SPEED = 0.7;
var BALL_DELTA_SPEED = 0.1;

// Game Objects
var player = {
  x: 0,
  y: canvas.height / 2 - PLAYER_HEIGHT / 2,
  width: PLAYER_WIDTH,
  height: PLAYER_HEIGHT,
  color: "#3AB0FF",
  score: 0,
};

var computer = {
  x: canvas.width - PLAYER_WIDTH,
  y: canvas.height / 2 - PLAYER_HEIGHT / 2,
  width: PLAYER_WIDTH,
  height: PLAYER_HEIGHT,
  color: "#ff1a92",
  score: 0,
};

var ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  raidus: 10,
  speed: BALL_START_SPEED,
  velocityX: 5,
  velocityY: 5,
  color: "#3aB0FF",
};

var net = {
  x: canvas.width / 2 - 1,
  y: 0,
  width: 2,
  height: 10,
  color: "#3066e2",
};

//Draw Shapes
//Draw Rectangle
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// DrawCircle
function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

//Draw Text
function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "45px fantasy";
  ctx.fillText(text, x, y);
}
drawText("Ping Pong Game", 200, 300, "White");

function drawNet() {
  for (var i = 0; i <= canvas.height; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}

//Render
function render() {
  drawRect(0, 0, canvas.width, canvas.height, "#35103b");

  drawNet();

  drawText(player.score, canvas.width / 4.5, canvas.height / 5, "#59CE8F");
  drawText(
    computer.score,
    (3 * canvas.width) / 4,
    canvas.height / 5,
    "#59CE8F"
  );

  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(
    computer.x,
    computer.y,
    computer.width,
    computer.height,
    computer.color
  );

  drawCircle(ball.x, ball.y, ball.raidus, ball.color);
}

function collision(b, p) {
  b.top = b.y - b.raidus;
  b.bottom = b.y + b.raidus;
  b.left = b.x - b.raidus;
  b.right = b.x + b.raidus;

  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;
  return (
    b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
  );
}

//Reset Ball
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = BALL_START_SPEED;
  ball.velocityX = -ball.velocityX;
}

//player Movement 
canvas.addEventListener("mousemove", (e) => {
  if (paused) return;

  var rect = canvas.getBoundingClientRect();
  player.y = e.clientY - rect.top - player.height / 2;
})

function lerp(a, b, t) {
  return a + (b - a) * t;
}

var paused = false;

// Update
function update() {
  if (paused) return;
  ball.x += ball.velocityX * ball.speed;
  ball.y += ball.velocityY * ball.speed;

  if (ball.y + ball.raidus > canvas.height || ball.y - ball.raidus < 0) {
    ball.velocityY = -ball.velocityY;
  }

  var selectedPlayer = ball.x < canvas.width / 2 ? player : computer;
  if (collision(ball, selectedPlayer)) {
    ball.velocityX = -ball.velocityX;

    ball.speed += BALL_DELTA_SPEED;
  }


  //Compuer Move Ai 
  var targetPos = ball.y - computer.height / 2;
  var currentPos = computer.y;
  computer.y = lerp(currentPos, targetPos, COM_LEVEL);

  if (ball.x - ball.raidus < 0) {
    computer.score++;
    resetBall();
  } else if (ball.x + ball.raidus > canvas.width) {
    player.score++;
    resetBall();
  }
}


//Game Init..
function game() {
  update();
  render();
}

var FPS = 60;
setInterval(game, 1000 / FPS);


var pauseBtn = document.querySelector("#pause");

pauseBtn.addEventListener("click", () => {
  if (pauseBtn.innerHTML === "Resume") {
    pauseBtn.innerHTML = "Pause";
    paused = false;
  } else {
    pauseBtn.innerHTML = "Resume"
    paused = true;
  }
})


