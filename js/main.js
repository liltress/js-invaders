const c = document.getElementById("Viewport");
const context = c.getContext("2d");

(async () => {
  // wrapping the game logic in an anonymous function to enable async functionality

  ent1 = pipe_with_args(
    spawn,
    { func: insert_vec2d, args: { key: "position", x: 300, y: 300 } },
    insert_circle,
  )();

  ent2 = pipe_with_args(
    spawn,
    { func: insert_vec2d, args: { key: "position", x: 325, y: 300 } },
    { func: insert_vec2d, args: { key: "velocity", x: 1, y: -1 } },
    {
      func: insert_circle,
      args: { layer: 2, color: Colors.Green, radius: 25 },
    },
  )();

  ent3 = pipe_with_args(
    spawn,
    { func: insert_vec2d, args: { key: "position", x: 350, y: 300 } },
    insert_circle,
  )();

  input_holder = pipe(spawn, insert_input)();

  add_system(input_system, ["input"], []);

  add_system(velocity_system, ["position", "velocity"], []);

  add_system(draw_system, ["position", "sprite"], ["nodraw"]);

  while (true) {
    run_updates();

    await sleep(30 * 10);
    //console.log(input_holder.input);
    //break;
  }
})();
