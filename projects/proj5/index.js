var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var isGameStarted = false;

$(document).keypress(function () {
  if (isGameStarted == false) {
    nextSequence();
    isGameStarted = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  CheckAnswer(userClickedPattern.length - 1);
});

function CheckAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 400);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function playSound(name) {
  audioAddress = "./sounds/" + name + ".mp3";
  var audio = new Audio(audioAddress);
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  elementId = "#" + randomChosenColor;
  $(elementId).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function animatePress(currentColour) {
  currentButton = "#" + currentColour;
  $(currentButton).addClass("pressed");
  setTimeout(function () {
    $(currentButton).removeClass("pressed");
  }, 100);
}

function startOver(){
    level = 0;
    isGameStarted = false;
    gamePattern = [];
}