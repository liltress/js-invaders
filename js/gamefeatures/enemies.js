// enemy spawners and units

function insert_enemy(ent) {
  insert_component(ent, "enemy", null);
  return ent;
}

function insert_enemy_movement(ent, args = { speed: 80 }) {
  insert_component(ent, "enemy_movement", { left: false, speed: args.speed });
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

function spawn_enemies(positions, hp) {
  positions.forEach((row) => {
    row.forEach((pos) => {
      pipe_with_args(
        spawn,
        { func: insert_hp, args: { hp: hp } },
        insert_circle,
        insert_enemy,
        { func: insert_vec2d, args: { key: "position", x: pos.x, y: pos.y } },
        {
          func: insert_vec2d,
          args: { key: "initial_position", x: pos.x, y: pos.y },
        },
      )();
    });
  });
}
