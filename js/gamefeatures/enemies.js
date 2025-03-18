// enemy spawners and units

function insert_enemy(ent) {
  insert_component(ent, "enemy", null);
  return ent;
}

function insert_enemy_movement(ent, args = { speed: 5 }) {
  insert_component(ent, "enemy_movement", { speed: args.speed });
  return ent;
}

function gen_positions(xn, yn, diameter, margin) {
  let hw = width / 2;
  let aw = xn * diameter + (xn - 1) * margin;
  let units = [];
  for (var j = 0; j < xn; j++) {
    units.push({
      x: hw - aw / 2 + diameter / 2 + (diameter + margin) * j,
      y: 0,
    });
  }
  return [units];
}

function spawn_enemies(positions, hp, speed, xn, diameter, margin) {
  let aw = xn * diameter + (xn - 1) * margin;
  positions.forEach((row) => {
    row.forEach((pos) => {
      pipe_with_args(
        spawn,
        { func: insert_hp, args: { hp: hp } },
        insert_circle,
        insert_enemy,
        { func: insert_enemy_movement, args: { speed: 100 } },
        { func: insert_vec2d, args: { key: "position", x: pos.x, y: pos.y } },
        { func: insert_vec2d, args: { key: "velocity", x: speed, y: 0 } },
        {
          func: insert_vec2d,
          args: { key: "right_wall", x: pos.x + (width - aw) / 2, y: 0 },
        },
        {
          func: insert_vec2d,
          args: { key: "left_wall", x: pos.x - (width - aw) / 2, y: 0 },
        },
      )();
    });
  });
}
function summon_wave(hp, speed, xn, yn, diameter, margin) {
  spawn_enemies(
    gen_positions(xn, yn, diameter, margin),
    hp,
    speed,
    xn,
    diameter,
    margin,
  );
}

function enemy_movement_system(ents) {
  ents.forEach((ent) => {
    if (ent.position.x > ent.right_wall.x || ent.position.x < ent.left_wall.x) {
      ent.velocity.x = -ent.velocity.x;
      ent.position.y += ent.sprite.spritedata.radius * 2;
    }
  });
}
