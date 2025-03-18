const c = document.getElementById("Viewport");
const context = c.getContext("2d");

//entity declaration
player = pipe_with_args(
  spawn,
  insert_player,
  { func: insert_vec2d, args: { key: "position", x: 600, y: 600 } },
  { func: insert_vec2d, args: { key: "velocity", x: 0, y: 0 } },
  {
    func: insert_player_controller,
    args: { speed: 180 },
  },
  {
    func: insert_hp,
    args: { hp: 3 },
  },
  {
    func: insert_circle,
    args: { layer: 2, color: Colors.Green, radius: 15 },
  },
  {
    func: insert_collide,
    args: { colission_logic: print_on_collide, layers: ["player"], masks: [] },
  },
  { func: insert_circular_collider, args: { radius: 15 } },
  insert_input,
)();

input_holder = pipe(spawn, insert_input)();

enemy_scheduler = pipe(spawn, insert_enemy, insert_enemy_scheduler)();

//summon_wave(1, 200, 5, 3, 40, 20);

// System declaration
add_system(input_system, ["input"], []);
add_system(colission_system, ["collide", "circular_collider"], ["nocollide"]);

add_system(
  player_controller_system,
  ["position", "velocity", "player_controller", "input"],
  [],
  (do_delta = true),
);
add_system(enemy_movement_system, ["enemy", "enemy_movement"], []);
add_system(
  velocity_system_toggle,
  ["position", "velocity"],
  [],
  (do_delta = true),
);

add_system(health_system, ["hp"], []);
add_system(despawn_timer_system, ["despawn_timer"], [], (do_delta = true));
add_system(enemy_scheduler_system, ["enemy"], []);

add_system(draw_system, ["position", "sprite"], ["nodraw"]);

// game loop
(async () => {
  const minFrameTime = 1000 / 60;
  const timeScale = 1;

  let timeThisFrame = performance.now();
  let timeLastFrame = performance.now();
  // wrapping the game logic in an anonymous function to enable async functionality
  while (true) {
    timeThisFrame = performance.now();
    const delta = (timeThisFrame - timeLastFrame) / 1000;

    run_updates(delta * timeScale);

    timeLastFrame = timeThisFrame;
    await sleep(Math.max(0, minFrameTime - delta));
    //break;
  }
})();
