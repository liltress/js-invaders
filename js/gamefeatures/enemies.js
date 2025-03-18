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
  for (var i = 0; i < yn; i++) {
    units.push([]);
    for (var j = 0; j < xn; j++) {
      units[i].push({
        x: hw - aw / 2 + diameter / 2 + (diameter + margin) * j,
        y: height * 0.1 + i * (diameter + margin),
      });
    }
  }
  return units;
}

function spawn_enemies(positions, hp, speed, xn, diameter, margin) {
  let aw = xn * diameter + (xn - 1) * margin;
  positions.forEach((row) => {
    //console.log(row);
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
        {
          func: insert_collide,
          args: {
            colission_logic: print_on_collide,
            layers: ["enemy"],
            masks: ["player"],
          },
        },
        {
          func: insert_circular_collider,
          radius: diameter / 2,
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
      ent.position.x += ent.position.x > ent.right_wall.x ? -5 : 5;
      ent.position.y += ent.sprite.spritedata.radius;
    }
    if (ent.position.y > height) {
      remove_system(velocity_system_toggle);
      alert("you lost ! insert a yellow circle");
    }
  });
}

function insert_enemy_scheduler(ent) {
  insert_component(ent, "enemy_scheduler", { turn: 0 });
}

function enemy_scheduler_system(ents) {
  scheduler = query("enemy_scheduler", ents)[0];
  t = scheduler.enemy_scheduler.turn;
  enemies = query_without("enemy_scheduler", ents);
  console.log(enemies);
  turn_tax = Math.max(5, Math.floor(t / 3));
  if (enemies.length == 0) {
    summon_wave(
      Math.floor(t / 3) + 1,
      Math.min(1000, 150 + t * 25),
      Math.min(25, 5 + t),
      Math.min(5, t + 1),
      40,
      45,
    );

    scheduler.enemy_scheduler.turn += 1;
    scheduler.enemy_scheduler.turn =
      scheduler.enemy_scheduler.turn > 4 ? 100 : scheduler.enemy_scheduler.turn;
  }
}
