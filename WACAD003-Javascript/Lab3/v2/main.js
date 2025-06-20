// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const colorInput = document.getElementById("shapeColor");

let shapeColor = null;
colorInput.addEventListener("input", () => {
  shapeColor = colorInput.value; 
});

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
class Ball {
  constructor(x, y, velX, velY, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.color = randomRGB();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }
  
    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
  
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }
  
    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(shapes) {
    for (let j = 0; j < shapes.length; j++) {
      if (this !== shapes[j]) {
        const dx = this.x - shapes[j].x;
        const dy = this.y - shapes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.size + shapes[j].size) {
          // pega cores diferentes de 'default' ou cria aleatorias
          const newColor = (shapeColor && shapeColor !== '') ? shapeColor : randomRGB();
          this.color = newColor;
          shapes[j].color = newColor;
        }
      }
    }
  }
}
class Triangle extends Ball {
  constructor(x, y, velX, velY, size) {
    super(x, y, velX, velY, size);
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x - this.size, this.y + this.size);
    ctx.lineTo(this.x + this.size, this.y + this.size);
    ctx.closePath();
    ctx.fill();
  }
}
class Square extends Ball {
  constructor(x, y, velX, velY, size) {
    super(x, y, velX, velY, size);
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x - this.size,
      this.y - this.size,
      this.size * 2,
      this.size * 2
    );
  }
}

const shapes = [];
while (shapes.length < 25) {
  const x = random(20, width - 20);
  const y = random(20, height - 20);
  const velX = random(-7, 7);
  const velY = random(-7, 7);
  const size = random(10, 20);

  const type = random(1, 3);
  if (type === 1) {
    shapes.push(new Ball(x, y, velX, velY, size));
  } else if (type === 2) {
    shapes.push(new Triangle(x, y, velX, velY, size));
  } else {
    shapes.push(new Square(x, y, velX, velY, size));
  }
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].draw();
    shapes[i].update();
    shapes[i].collisionDetect(shapes);
  }
  requestAnimationFrame(loop);
}

loop();