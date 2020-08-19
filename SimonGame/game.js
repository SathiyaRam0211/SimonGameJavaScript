var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var toggle = 1;
var level = 0;
function playSound(name){
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  toggle = 1;
}



function nextSequence()
{
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern = [];
    level++;
}

function checkAnswer(currentLvl){
  if (gamePattern[currentLvl] === userClickedPattern[currentLvl])
{
  console.log("success");

  if(gamePattern.length === userClickedPattern.length)
  {
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
else
{
  console.log("Fail");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },1000);
  $("h1").text("Game Over. Press any key to restart.");
  startOver();
}
}
// Game code

$(document).keydown(function(){
    if(toggle){
      $("#level-title").text("Level "+level);
      nextSequence();
      toggle = 0;
    }
});

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});
