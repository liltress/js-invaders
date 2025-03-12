const c = document.getElementById("Viewport");
const context = c.getContext("2d");

(async () => { // wrapping the game logic in an anonymous function to enable async functionality

ent1 = pipe(
    spawn,
    insert_vec2d,
    insert_circle,
  )();
  ent1.position = vec_add(ent1, { x:300, y: 300 });
  ent2 = pipe(
    spawn,
    insert_vec2d,
    insert_circle,
  )();
  ent2.position = vec_add(ent2, { x:200, y: 500 });
  ent2.sprite.color = Colors.Green;
  ent3 = pipe(
    spawn,
    insert_vec2d,
    insert_circle,
  )();
  ent3.position = vec_add(ent3, { x: 100, y: 50 })

  let count = 0;
  let input = {};

  let loop = true;
  while (loop) {

    input_system(input);
    draw_system();

    await sleep(66);
    //count++;
    //console.log(count);
    console.log(input);
    break;
  }
})();