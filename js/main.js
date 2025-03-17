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
    args: { speed: 90 },
  },
  { 
    func: insert_hp,
    args: { hp: 3 }
  },

  {
    func: insert_circle,
    args: { layer: 2, color: Colors.Green, radius: 15 },
  },

  { func: insert_collide, args: { layers: ["player"], masks: [] }},
  { func: insert_circular_collider, args: { radius: 15 } },
  insert_input,
)();

enemy = pipe_with_args(
  spawn,
  insert_circle,
  { func: insert_vec2d, args: { key: "position", x: 600, y: 200 } },
  { func: insert_vec2d, args: { key: "velocity", x: 0, y: 0 } },
  { func: insert_collide, args: { layers: [], masks: ["players"] } },
  { func: insert_circular_collider, args: { radius: 10 } },
)();

input_holder = pipe(spawn, insert_input)();

// System declaration
add_system(input_system, ["input"], []);
add_system(
  colission_system,
  ["collide", "circular_collider"],
  ["nocollide"],
);
add_system(
  player_controller_system,
  ["position", "velocity", "player_controller", "input"],
  [],
  (do_delta = true),
);
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
