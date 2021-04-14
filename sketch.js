var player
var bg,backgroundImg
var bug,bugImg
var rocket,rocketimg
var coin,coinimg
var boy,boyimg
var obstacle,obstacleGroup,coinGroup;
var score=0;
var life;
var lifecount=3

function preload(){
backgroundImg=loadImage("background.jpg")
bugImg=loadAnimation("bug1.png","bug2.png","bug3.png","bug4.png","bug5.png","bug6.png")
rocketimg=loadImage("rocket.png")
coinimg=loadImage("coin.png")
boyimg=loadImage("boy.png")
}
function setup(){
createCanvas(1200,500);




bg=createSprite(600,250,1200,500)
bg.velocityX=-20
bg.scale=1.75
bg.x=width/2
bg.addImage(backgroundImg)

boy=createSprite(150,350,10,10)
boy.addImage(boyimg)
boy.setCollider("rectangle",0,0,30,110)

obstacleGroup = new Group()
coinGroup = new Group()

ground=createSprite(600,500,1200,20)
ground.shapeColor="brown"
life1=createSprite(width-(width/15),50)
life2=createSprite(width-(width/18),50)
life3=createSprite(width-(width/23),50)
life1.addImage(boyimg)
life2.addImage(boyimg)
life3.addImage(boyimg)

life1.scale=0.2
life2.scale=0.2
life3.scale=0.2

}


function draw(){
background(0)


if(bg.x<200){
    bg.x=width/2
}
 
spawnbugs()
spawnCoin()



if(keyDown("up_arrow")){
boy.velocityY = -15
}

boy.velocityY = boy.velocityY+0.5

if(keyDown("right_arrow")){
    boy.x=boy.x+5
    
    }


if(boy.isTouching(coinGroup)){
    score++
coinGroup.destroyEach()
    }

    if(obstacleGroup.isTouching(boy))
    { obstacleGroup.destroyEach();
         
         if (lifecount===3)
         { life1.visible=false;
         } 
         if(lifecount===2)
         { life2.visible=false;
         }
          if(lifecount===1){ life3.visible=false; 
            alert("GAME OVER",width/2,height/2); }
            lifecount--; 
         }

boy.collide(ground)
drawSprites();

fill(0)
text("Score :"+ score,width-(width/6),50)

}


function spawnbugs(){
if(frameCount%200 === 0){
    obstacle=createSprite(width,135,10,10);
    
    obstacle.scale=0.5
obstacle.velocityX=-2
obstacle.y=Math.round(random(135,450))

var rand= Math.round(random(1,2))
switch(rand){
case 1 :  obstacle.addAnimation("bug",bugImg)
break;

case 2 :  obstacle.addAnimation("rocket",rocketimg)
obstacle.scale= 0.25;
obstacle.velocityX=-6;
break;
}

obstacleGroup.add(obstacle)
}
}

function spawnCoin(){
    if(frameCount%50 === 0){

        coin= createSprite(width,250,10,10);
        coin.y=Math.round(random(10,400))
        coin.addImage(coinimg);
        coin.scale=0.1
        coin.velocityX=-5
        coinGroup.add(coin)
 

    }
}