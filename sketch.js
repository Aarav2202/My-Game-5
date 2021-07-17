var bgImg, bg;
var superHero, heroImg;
var edges;
var dragon, dragonImg;
var monster, monsterImg;
var cloud1, cloud2, cloud3;
var monsterObs, monsterObsImg;
var coin, coinImg;
var coinGroup;
var monsGroup;
var gameState = "play";
var bonus = []
var score = 0;
var gameOver, gameOverImg;
var bgDark;

function preload() {

  bgImg = loadImage("sky.jpeg");
  heroImg = loadImage("Superhero.png");
  dragonImg = loadAnimation("dragonImg.gif")
  monsterImg = loadImage("monster.png");
  cloud1 = loadImage("Cloud1.png");
  cloud2 = loadImage("Cloud2.png");
  cloud3 = loadImage("cloud3.png");
  monsterObsImg = loadImage("monster2.png");
  coinImg = loadImage("Coin.png");
  gameOverImg = loadImage("gameOverImg.png");
  bgDark= loadImage("bgDark.jpeg")
}



function setup() {

  createCanvas(800, 400)

  bg = createSprite(750, 200);
  bg.addImage(bgImg)
  bg.scale = 0.9;
  bg.velocityX = -3;

  superHero = createSprite(400, 200);
  superHero.addImage(heroImg);
  superHero.scale = 0.2;

  gameOver = createSprite(400,200);
  gameOver.addImage(gameOverImg);
  gameOver.visible= false;

  edges = createEdgeSprites();

  monster = createSprite(100, 170);
  monster.addImage(monsterImg);
  monster.scale = 0.38;

  coinGroup = new Group();
  monsGroup = new Group();
  cloudGroup= new Group();
}

function draw() {
  background(0)

  if (bg.x < 0) {
    bg.x = 750;
  }
  
if(gameState === "play"){
  monster.y = superHero.y;
  spawnClouds();

  if (keyDown("UP_ARROW")) {
    superHero.y -= 5;
  }
  if (keyDown("DOWN_ARROW")) {
    superHero.y += 5;
  }
  if(superHero.isTouching(monsGroup)){
    superHero.velocityX= 0;
    monsGroup.setVelocityXEach(0);
    monster.velocityX= 2;
    monsGroup.setLifetimeEach(-1);
    gameState= "touched";

  }
  superHero.collide(edges);

  
  coins();
  obstacle();

  for(var i=0;i<bonus.length;i++){
    if(bonus[i].isTouching(superHero)){
      bonus[i].destroy();
      score= score+2;
    }
  }
  
}
else if(gameState === "touched"){
  coinGroup.destroyEach();
  spawnClouds();

  if(monster.x>850){
    gameState= "end";
    monsGroup.setVelocityXEach(0);
  }
  if(monster.x === 400){
    superHero.destroy()
  }
}
else{
    //imageMode(CENTER);
    //image(gameOverImg, 400, 200);
    background(bgDark);
    gameOver.visible= true;
    monsGroup.destroyEach();
    cloudGroup.destroyEach();
    bg.destroy();
    
}
  drawSprites();
  textSize(20)
  text("score : "+score,50,50)
}
function spawnClouds(){
if(frameCount % 100 === 0){
  cloud = createSprite(850,Math.round(random(50,300)))  
  
  var rand= Math.round(random(1,3))
  switch(rand){
    case 1 : cloud.addImage(cloud1)
      cloud.scale= 0.1
            break;
    case 2 : cloud.addImage(cloud2)
      cloud.scale= 0.25
            break;
    case 3 : cloud.addImage(cloud3)
      cloud.scale= 0.1
            break;
  }
  cloud.velocityX= -3;
  superHero.depth= cloud.depth+1;
  monster.depth= cloud.depth+1;
}


}

function coins(){
  if(frameCount % 80 === 0){
    coin = createSprite(830,Math.round(random(50,250)));
    coin.addImage(coinImg);
    coin.scale= 0.25
    coin.velocityX= -4
    coin.lifetime= 250;
    coin.setCollider("circle",0,0,60)
    bonus.push(coin);

    coinGroup.add(coin);

  }
  
}
function obstacle(){
  if(frameCount % 150 === 0){
    monsterObs = createSprite(830,Math.round(random(50,250)));
    monsterObs.addImage(monsterObsImg);
    monsterObs.scale= 0.12
    monsterObs.velocityX= -4
    monsterObs.lifetime= 250;
    monsGroup.add(monsterObs);
    

  }
  
}