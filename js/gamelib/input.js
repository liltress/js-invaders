// handles getting the input from the user

function handle_keypress(ent, keycode, action_str, inp_value = true) {
  document.addEventListener("keydown", function (event) {
    if (event.key == keycode) {
      // SPACEBAR
      ent.input[action_str] = inp_value;
    }
  });
  document.addEventListener("keyup", function (event) {
    if (event.key == keycode) {
      ent.input[action_str] = false;
    }
  });
}

function input_system(ents) {
  // ! FOUND A BETTER WAY TO DO THIS
  //console.log("from inside input system:", ents);
  ents.forEach((ent) => {
    handle_keypress(ent, " ", "physics_pause");
    handle_keypress(ent, "a", "left");
    handle_keypress(ent, "d", "right");
  });
}

function insert_input(ent) {
  // adds the input component that copies which inputs you have
  insert_component(ent, "input", {});
  return ent;
}
