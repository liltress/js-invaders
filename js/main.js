const c = document.getElementById("Viewport");
const context = c.getContext("2d");

(async () => {
  // wrapping the game logic in an anonymous function to enable async functionality

  ent1 = pipe(spawn, insert_vec2d, insert_circle)();
  ent1.position = vec_add(ent1, { x: 300, y: 300 });

  ent2 = pipe(spawn, insert_vec2d, insert_circle)();
  ent2.position = vec_add(ent2, { x: 325, y: 300 });
  insert_vec2d(ent2, 1, -1, "velocity");
  ent2.sprite.color = Colors.Green;
  ent2.sprite.layer = 2;

  ent3 = pipe(spawn, insert_vec2d, insert_circle)();
  ent3.position = vec_add(ent3, { x: 350, y: 300 });

  input_holder = pipe(spawn, insert_input)();

  add_system(input_system, ["input"], []);

  add_system(velocity_system, ["position", "velocity"], []);

  add_system(draw_system, ["position", "sprite"], ["nodraw"]);

  while (true) {
    run_updates();

    await sleep(30);
    console.log(input_holder.input);
    //break;
  }
})();
