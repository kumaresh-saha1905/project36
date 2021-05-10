var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var Feeding; 
//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Foody();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed Food");
   feed.position(1000,95);
   feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

 
}

function draw() {
  background(46,139,87);
  foodObj.display();
  dog.display();
  
  //write code to read fedtime value from the database 
   lastFed=database.ref('FeedTime').on("value" , function(data){
     lastFed=data.val();
   })
 
  //write code to display text lastFed time here
  fill("red");
   text(15);
  if(lastFed>12){
    text("Last Feed : 9 PM" ,750,30);

  }
  if(lastFed==0){
    text("Last Feed : 12 AM" ,750,30);
    
  } 
  else{
    text("Last Feed : 7 AM" ,750,30);
    
  } 
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
    var food_dog=foodObj.getFoodStock();
    if(food_dog<0){
      foodObj.updateFoodStock(food_dog*0);

    }else{
      foodObj.updateFoodStock(food_dog-1);
    }
    
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
