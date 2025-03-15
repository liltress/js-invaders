const c = document.getElementById("Viewport");
const context = c.getContext("2d");

//entity declaration
player = pipe_with_args(
  spawn,
  insert_player,
  { func: insert_vec2d, args: { key: "position", x: 325, y: 300 } },
  { func: insert_vec2d, args: { key: "velocity", x: 0, y: 0 } },
  {
    func: insert_player_controller,
    args: { steer_rate: 5, looking_at: 0, speed: 90 },
  },
  {
    func: insert_circle,
    args: { layer: 2, color: Colors.Green, radius: 15 },
  },
  insert_collide,
  { func: insert_circular_collider, args: { radius: 15 } },
  insert_input,
)();

wall_left = pipe_with_args(
  spawn,
  insert_collide,
  { func: insert_vec2d, args: { key: "position", x: 0, y: 0 } },
  {
    func: insert_wall,
    args: { vert: true },
  },
)();
wall_right = pipe_with_args(
  spawn,
  insert_collide,
  { func: insert_vec2d, args: { key: "position", x: 1200, y: 0 } },
  {
    func: insert_wall,
    args: { vert: true },
  },
)();
wall_top = pipe_with_args(
  spawn,
  insert_collide,
  { func: insert_vec2d, args: { key: "position", x: 0, y: 675 } },
  {
    func: insert_wall,
    args: { vert: true },
  },
)();

wall_bottom = pipe_with_args(
  spawn,
  insert_collide,
  { func: insert_vec2d, args: { key: "position", x: 1200, y: 675 } },
  {
    func: insert_wall,
    args: { vert: true },
  },
)();

input_holder = pipe(spawn, insert_input)();

// System declaration
add_system(input_system, ["input"], []);
add_system(
  player_controller_system,
  ["position", "velocity", "player_controller", "input"],
  [],
  (do_delta = true),
);
add_system(wall_colission_system, ["collide"], ["nocollide"]);
add_system(
  velocity_system_toggle,
  ["position", "velocity"],
  [],
  (do_delta = true),
);
add_system(draw_system, ["position", "sprite"], ["nodraw"]);

const minFrameTime = 1000 / 60;
const timeScale = 1;

let timeThisFrame = performance.now();
let timeLastFrame = performance.now();

(async () => {
  // wrapping the game logic in an anonymous function to enable async functionality
  while (true) {
    timeThisFrame = performance.now();
    const delta = (timeThisFrame - timeLastFrame) / 1000;

    run_updates(delta * timeScale);

    timeLastFrame = timeThisFrame;
    await sleep(Math.max(0, minFrameTime - delta));
    break;
  }
})();
