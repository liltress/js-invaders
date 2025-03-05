const c = document.getElementById("Viewport");
const context = c.getContext("2d");

ent1 = pipe(
  spawn,
  insert_vec2d,
  insert_sprite,
)();
ent1.position = vec_add(ent1, { x:300, y: 300 });
ent2 = pipe(
  spawn,
  insert_vec2d,
  insert_sprite,
)();
ent2.position = vec_add(ent2, { x:200, y: 500 });
ent2.sprite.color = Colors.Green;
ent3 = pipe(
  spawn,
  insert_vec2d,
  insert_sprite,
)();
ent3.position = vec_add(ent3, { x: 100, y: 50 })

draw_call(context);