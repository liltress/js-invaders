// handles turning around things when they collide

function insert_nocollide(ent) {
  insert_component(ent, "nocollide", null);
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

function insert_circular_collider(ent, radius = 20) {}
