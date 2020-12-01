PLAY=0;
END=1;
var gameState=PLAY;
var monkey , monkey_running ;
var ground,groundImg,background,backgroundImg;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  backgroundImg = loadImage("2020-12-01 (4).png");
  groundImg = loadImage("2020-12-01 (6).png");
}



function setup() {
  createCanvas(600,360);
  
  background=createSprite(300,200);
  background.addImage(backgroundImg);
  background.scale=1;
 background.x = background.width/2;
  background.velocityX = -4;
  
  monkey = createSprite(80,288,20,20);
  monkey.addAnimation("runninig",monkey_running);
  monkey.scale=0.1;
  
  
  
  ground = createSprite(400,420,1320,10);
  ground.addImage(groundImg);
  ground.scale=1;
  ground.x = ground.width/2;
  
  score=0;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
  
}


function draw() {
  
  if(ground.x<0) {
    ground.x= ground.width/2;
    
  }
  monkey.velocityY= monkey.velocityY + 0.6;
  ground.velocityX = -(4 + 3*score/3);
    monkey.collide(ground);
  
  if(background.x<0) {
    background.x= background.width/2;
    
  }
  
  if(gameState===PLAY) {
  survivalTime=Math.ceil(frameCount/frameRate());
  
  if(monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    score = score+1;
       
  }
  
  if(score>0 && score%3===0  ) {
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: monkey.scale=0.12;
              break;
      case 2: monkey.scale=0.14;
              break;
      case 3: monkey.scale=0.16;
              break;
      case 4: monkey.scale=0.18;
              break;
      default:
              break;
    }
    
  }
  
  
  spawnBananas();
  spawnObstacle();
    
  }
  
  
  
  if(touches.length>0 || keyDown("space") && monkey.y>=height-250){
    monkey.velocityY = -12;
    console.log(monkey.y);
    touches = [] ;
  }
  
   
  
    if(gameState===END) {
      obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.destroyEach();
      background.velocityX = 0;
      score = 0;
      survivalTime=survivalTime+0;
      
    }
  
  if(gameState===PLAY && monkey.isTouching(obstacleGroup)) {
  gameState=END;
  }
  
  drawSprites();
  
  stroke("yellow");
  textSize(18);
  fill("yellow");
  text("score : " + score,490,50);
  
  stroke("black");
  textSize(18);
  fill("black");
  
  text("SurvivalTime : " + survivalTime,90,50);
}

function spawnBananas() {
  if(frameCount%80===0) {
    banana = createSprite(300,Math.round(random(100,300),20,20));
    banana.addImage(bananaImage);
    banana.scale= 0.1;
    banana.velocityX = - (7 + 3*score/3);
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}
function spawnObstacle() {
  if(frameCount%200===0) {
    obstacle = createSprite(Math.round(random(300,500)),325,20,20);
    obstacle.addImage(obstacleImage) ;
    obstacle.scale = 0.1;
    obstacle.velocityX = -(7 + 3*score/3);
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}





