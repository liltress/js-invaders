const c = document.getElementById("Viewport");
const context = c.getContext("2d");

ent1 = pipe_with_args(
  spawn,
  { func: insert_vec2d, args: { key: "position", x: 300, y: 300 } },
  insert_circle,
)();

ent2 = pipe_with_args(
  spawn,
  { func: insert_vec2d, args: { key: "position", x: 325, y: 300 } },
  { func: insert_vec2d, args: { key: "velocity", x: 20, y: -20 } },
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
add_system(velocity_system, ["position", "velocity"], [], (do_delta = true));
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
    //break;
  }
})();
