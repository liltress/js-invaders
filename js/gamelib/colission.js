// handles turning around things when they collide

function insert_nocollide(ent) {
  insert_component(ent, "nocollide", null);
  return ent;
}

function insert_collide(ent) {
  insert_component(ent, "collide", null);
  return ent;
}

function insert_wall(ent, vert = true) {
  if (vert) {
    insert_component(ent, "vert_wall", null);
  } else {
    insert_component(ent, "horz_wall", null);
  }
  return ent;
}

function insert_circular_collider(ent, args = { radius: 20 }) {
  insert_component(ent, "circular_collider", { radius: args.radius });
  return ent;
}

function wall_colission_system(ents) {
  const vert_walls = query("vert_wall", (entities = ents));
  const horz_walls = query("horz_wall", (entities = ents));

  const circular_colliders = query("circular_collider", (entities = ents));

  const vert_wall_against_circle = cartesian(vert_walls, circular_colliders);
  console.log(vert_wall_against_circle);
}
