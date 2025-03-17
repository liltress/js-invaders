// handles turning around things when they collide

function insert_collide(ent, args={layers:[], masks:[], colission_logic:()=>{console.log("no colission logic provided!");}}) {
  insert_component(ent, "collide", 
  {func: args.colission_logic, 
    layers: args.layers, 
    masks: args.masks });
  return ent;
}

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

function insert_circular_collider(ent, args = { radius: 20 }) {
  insert_component(ent, "circular_collider", { radius: args.radius });
  return ent;
}

function colission_system(ents) {
  console.log("colission system");
  cartesian(ents, ents)
  .filter((pair) => { return pair[0] != pair[1] })
  .filter((pair) => { 
    return intersection(pair[0].collide.layers, pair[1].collide.masks).length != 0
  })
  .filter((pair) => {
    return vec_length(vec_sub(pair[0].position, pair[1].position)) <= 
      pair[0].circular_collider.radius +
       pair[1].circular_collider.radius;
  })
  .forEach(pair => {
    pair[0].collide.func(pair[0], pair[1]);
  });
}

function print_on_collide(ent1, ent2) {
  console.log(ent1, "\n", ent2);
}


/*
has to have a mark that overlaps with a layer
layers         masks
1 = a, b, c;   a
2 = b, c;      b, c
3 = a;         a, b, c

~1, 1~    1, 2     1, 3
 2, 1    ~2, 2~    2, 3
 3, 1     3, 2    ~3, 3~
*/