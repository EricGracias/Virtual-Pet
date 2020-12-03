//Create variables here

var database;
var dog, dogHappy, foodS, foodStock;

function preload()
{
  //load images here
  dogImage = loadAnimation("images/dogImg.png");
  dogHappy = loadAnimation("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 660);
  
  dog = createSprite(400,500,20,20);
  dog.addAnimation("dog",dogImage);
  dog.scale = 0.2; 

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(46, 139, 87);

  //readStock(data);
  //writeStock(x);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeAnimation("dog",dogHappy);
  }

  drawSprites();
  //add styles here

  fill("white");
  stroke("black");
  text("food remaining:"+foodS,400,300);
  textSize(20);
  text("Note:press UP_ARROW Key to feed Drago Milk.",190,50);
  

}

function readStock(data){
  foodS = data.val();

}

function writeStock(x){

  if(x<=0){
    x=0;

  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


