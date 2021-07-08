const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var boyImg, treeImg;
var mango1, mango2, mango3, mango4, mango5, mango6, mango7, mango8;
var launcher1, stone1, ground1;

function preload(){
  boyImg = loadImage("boy.png");
  treeImg = loadImage("tree.png");
}

function setup() {
	createCanvas(800, 700);

	engine = Engine.create();
	world = engine.world;
  
  mango1 = new mango(620, 330, 40);
  mango2 = new mango(630, 250, 50);
  mango3 = new mango(570, 370, 40);
  mango4 = new mango(570, 280, 45);
  mango5 = new mango(520, 325, 45);
  mango6 = new mango(730, 340, 45);
  mango7 = new mango(670, 360, 35);
  mango8 = new mango(680, 290, 40);

	ground1 = new ground(width/2, 690, width, 55);
	stone1 = new stone(235, 420, 30);
  launcher1 = new launcher(stone1.body, {x:105, y:523});

	Engine.run(engine);
}

function mouseDragged(){
  Matter.Body.setPosition(stone1.body, {x:mouseX, y:mouseY});
}
function mouseReleased(){
  launcher1.fly();
}

function draw() {
  background("lightblue");

  Engine.update(engine);
  
  imageMode(CENTER);
  image(boyImg, 140, 575, 120, 220);

  push();
  translate(600, 400);
  image(treeImg, 20, 20, 350, 500);
  pop();

  ground1.display();
  stone1.display();
  launcher1.display();

  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();
  mango8.display();
 
  detectCollision(stone1, mango1);
  detectCollision(stone1, mango2);
  detectCollision(stone1, mango3);
  detectCollision(stone1, mango4);
  detectCollision(stone1, mango5);
  detectCollision(stone1, mango6);
  detectCollision(stone1, mango7);
  detectCollision(stone1, mango8);

  textSize(20);
  fill(0);
  text("Press 'space' to get another chance", 30, 40);
}
function keyPressed(){
  if(keyCode===32){
    Matter.Body.setPosition(stone1.body, {x:85, y:500});
    launcher1.attach();
  }
}

function detectCollision(a, b){
  var posA = a.body.position;
  var posB = b.body.position;
  var d = dist(posA.x, posA.y, posB.x, posB.y);
  if(d <= a.r + b.r ){
    Matter.Body.setStatic(b.body, false);
  }
}