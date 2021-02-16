var balloon, database;

function preload(){
  background_img = loadImage("Images/Background.png")
  balloon_img = loadAnimation("Images/Hot Air Balloon-02.png", "Images/Hot Air Balloon-03.png", "Images/Hot Air Balloon-01.png")
}

function setup() {
  createCanvas(800,500);
  database = firebase.database()
  balloon = createSprite(100,350,20,20)
  balloon.addAnimation("balloon_image",balloon_img)
  balloon.scale = 0.5
  database.ref("balloon/position").on("value", function(data){
    var position = data.val()
    balloon.x = position.x,
    balloon.y = position.y
    
  })
}

function draw() {
  background(background_img);
  if(keyDown("left")){
      changePosition(-10,0)
  }
  if(keyDown("right")){
    changePosition(10,0)
  }
  if(keyDown("up")){
    changePosition(0,-10)
    balloon.scale = balloon.scale + 0.01
  }
  if(keyDown("down")){
    changePosition(0,10)
    balloon.scale = balloon.scale - 0.01
  }
  
  drawSprites()
  fill("black")
  textSize(20)
  text("Use arrow keys to move the hot-air balloon.", 200, 50)
}

function changePosition(x,y){
  database.ref("balloon/position").set({
    x: balloon.x+x,
    y: balloon.y+y
  })
}