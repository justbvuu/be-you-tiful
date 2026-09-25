let screen = 0;
let bg;
let start;
let screen1;
let screen2;
let screen3;
let end;
let refreshButton;
let verifyButton;
let img = [];
let selection = [];
let selected = [];
let myInput;
//grid info
let gridX = 543;
let gridY = 357;
let size = 88;
let padding = 5;
// phrase stuff @_@
let phrase = "";
let phraseX = 0;
let phraseY = 0;
let phraseFont;
let phraseSize = 12;
let phraseColor;
let phraseColors = [
  "#AAD6EB",
  "#6B6B6B",
  "#000000",
  "#EDB7E8",
]
let fonts = ["Arial", "Georgia", "Times New Roman", "Courier New"];
let phraseStyle;
let phraseTime = 0;
let phraseDelay = 1500;
const phrases = [
  "your ideals?",
  "your guide?",
  "your friends?",
  "your freedom?",
  "your dreams?",
  "your all?",
  "your justice?",
  "your individuality?",
  "_our ideals?",
  "_our dreams?",
  "_our freedom?",
  "_our all?",
  "_our individuality",
  "_our justice?",
  "あなたの 自由", 
  "あなたの 全て", 
  "あなたの 自分らしさ",
  "あなたの 願い",
  "あなたの 理想",
];
async function setup() {
  createCanvas(1440, 1024);
  background(255);
  frameRate(10);

  bg = await loadImage("bg.png");
  start = await loadImage("imgs/solve.png");
  screen1 = await loadImage("imgs/grid/captcha.png");
  screen2 = await loadImage("imgs/grid/captcha1.png");
  screen3 = await loadImage("imgs/grid/captcha2.png");
  end = await loadImage("end.png");
  img = await Promise.all([
    loadImage("imggrid/0.jpg"),
    loadImage("imggrid/1.jpg"),
    loadImage("imggrid/2.jpg"),
    loadImage("imggrid/3.jpg"),
    loadImage("imggrid/4.jpg"),
    loadImage("imggrid/5.jpg"),
    loadImage("imggrid/6.jpg"),
    loadImage("imggrid/7.jpg"),
    loadImage("imggrid/8.jpg"),
    loadImage("imggrid/9.jpg"),
    loadImage("imggrid/10.jpg"),
    loadImage("imggrid/11.jpg"),
    loadImage("imggrid/12.jpg"),
    loadImage("imggrid/13.jpg"),
    loadImage("imggrid/14.jpg"),
    loadImage("imggrid/15.jpg"),
    loadImage("imggrid/16.jpg"),
    loadImage("imggrid/17.jpg"),
    loadImage("imggrid/18.jpg"),
    loadImage("imggrid/19.jpg"),
    loadImage("imggrid/20.jpg"),
    loadImage("imggrid/21.jpg"),
    loadImage("imggrid/22.jpg"),
    loadImage("imggrid/23.jpg"),
    loadImage("imggrid/24.jpg"),
    loadImage("imggrid/25.jpg"),
    loadImage("imggrid/26.jpg"),
    loadImage("imggrid/27.jpg"),
    loadImage("imggrid/28.jpg"),
    loadImage("imggrid/29.jpg"),
    loadImage("imggrid/30.jpg"),
    loadImage("imggrid/31.jpg"),
    loadImage("imggrid/32.jpg"),
    loadImage("imggrid/33.jpg"),
    loadImage("imggrid/34.jpg"),
    loadImage("imggrid/35.jpg"),
    loadImage("imggrid/36.jpg"),
    loadImage("imggrid/37.jpg"),
    loadImage("imggrid/38.jpg"),
    loadImage("imggrid/39.jpg"),
    loadImage("imggrid/40.jpg"),
    loadImage("imggrid/41.jpg"),
  ]);
  myInput = createInput();
  myInput.position(475, 630);
  image(start, 366, 284);
  myButton = createButton("verify <3");
  myButton.position(630, 630);
  myButton.mousePressed(checkAnswer);
  //creates a refresh button
  refreshButton = createButton("⭮");
  refreshButton.position(705, 742);
  refreshButton.size(42, 42);
  refreshButton.mousePressed(newGrid);
  refreshButton.hide();
  // verify button
  verifyButton = createButton("Verify");
  verifyButton.position(817, 742);
  verifyButton.size(91, 42);
  verifyButton.mousePressed(verify);
  verifyButton.hide();
}

function draw() {
  if (screen == 1) {
    image(screen1, 436, 140);
    //draws a 4 x 4 grid w/ padding using provided info
    for (let i = 0; i < 16; i++) {
      //shoutout to brother. % = modulo operator, basically checks how many times the number fits in another and sidelines the remainder. in this case if i want 4 COLUMNS, itll use the remainders for X for all the COLUMNS of images. floor(i/4) gives the row number by dividing by the # of rows and rounding down. floor() is the rounding function
      let x = gridX + (i % 4) * (size + padding);
      let y = gridY + floor(i / 4) * (size + padding);

      //randomizes image selection
      image(img[selection[i]], x, y, size, size);
      if (selected[i]) {
        push();
        fill(170, 214, 235, 85);
        stroke(170, 214, 235);
        strokeWeight(4);
        rect(x, y, size, size);
        pop();
      }
    }
  } 


  if (screen == 2) {
    image(screen2, 436, 140);
   for (let i = 0; i < 16; i++) {
      let x = gridX + (i % 4) * (size + padding);
      let y = gridY + floor(i / 4) * (size + padding);
      image(img[selection[i]], x, y, size, size);
      if (selected[i]) {
        push();
        fill(170, 214, 235, 85);
        stroke(170, 214, 235);
        strokeWeight(4);
        rect(x, y, size, size);
        pop();
      }
    }
    if (millis() - phraseTime > phraseDelay) {
    phrase = random(phrases);
    phraseX = random(100, 1200);
    phraseY = random(100, 900);
    phraseFont = random(fonts);
    phraseSize = random(12, 30);
    phraseColor = random(phraseColors);
    phraseStyle = random([
      NORMAL,
      ITALIC,
      BOLD,
      BOLDITALIC
    ]);

    phraseTime = millis();
    }
  textFont(phraseFont);
  textSize(phraseSize);
  textStyle(phraseStyle);
  fill(phraseColor);

  text(phrase, phraseX, phraseY);
  }
  if (screen == 3) {
    let phraseDelay = 500;
    image(screen3, 436, 140);
       for (let i = 0; i < 16; i++) {
      let x = gridX + (i % 4) * (size + padding);
      let y = gridY + floor(i / 4) * (size + padding);
      image(img[selection[i]], x, y, size, size);
      if (selected[i]) {
        push();
        fill(170, 214, 235, 85);
        stroke(170, 214, 235);
        strokeWeight(4);
        rect(x, y, size, size);
        pop();
      }
    }
    if (millis() - phraseTime > phraseDelay) {
    phrase = random(phrases);
    phraseX = random(100, 1200);
    phraseY = random(100, 900);
    phraseFont = random(fonts);
    phraseSize = random(12, 30);
    phraseColor = random(phraseColors);
    phraseStyle = random([
      NORMAL,
      ITALIC,
      BOLD,
      BOLDITALIC
    ]);

    phraseTime = millis();
    }
  textFont(phraseFont);
  textSize(phraseSize);
  textStyle(phraseStyle);
  fill(phraseColor);

  text(phrase, phraseX, phraseY);
  }
  if (screen >= 1) {
    refreshButton.show();
    verifyButton.show();
  } else {
    refreshButton.hide();
    verifyButton.hide();
  }
  if (screen == 4) {
    refreshButton.hide();
    verifyButton.hide();
    background(end);
  }
}

// for starting SolveMedia, checks answers. .toLowercase is to change the answer to lowercase for the answer
function checkAnswer() {
  if (myInput.value().toLowerCase() == "be (you)tiful") {
    screen = 1;
    newGrid();
    background(255);
    myInput.hide();
    myButton.hide();
  } else {
    myInput.value("");
  }
}

//shuffles the image array with new images, can control the range of images
function newGrid(start, end) {
  selection = [];
  selected = [];
  
   if (screen == 1) {
    start = 0;
    end = 15;
  } else if (screen == 2) {
    start = 14;
    end = 29;
  } else if (screen == 3) {
    start = 26;
    end = 41;
  }
  
  for (let i = start; i <= end; i++) {
    selection.push(i);
    selected.push(false);
  }
  shuffle(selection, true);
}

function verify() {
  screen++;
  if (screen <= 3) {
    newGrid();
  }
  if (screen == 3){
    background(bg);
  }
}

function mousePressed() {
  for (let i = 0; i < 16; i++) {
    let x = gridX + (i % 4) * (size + padding);
    let y = gridY + floor(i / 4) * (size + padding);

    if (mouseX > x && mouseX < x + size && mouseY > y && mouseY < y + size) {
      selected[i] = !selected[i];
    }
  }
}
