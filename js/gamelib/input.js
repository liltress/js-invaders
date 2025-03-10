// handles getting the input from the user

function input_system(inp=input) { // ! FIND A BETTER WAY TO DO THIS WELL 
  document.addEventListener("keydown", function(event) {
    if (event.keyCode == 32) { // SPACEBAR
      inp["physics_run"] = true;
    }
  });
  document.addEventListener("keyup", function(event) {
    if (event.keyCode == 32) {
      delete inp["physics_run"];
    }
  });
}