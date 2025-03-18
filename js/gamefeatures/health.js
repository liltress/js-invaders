//handles hp

function insert_hp(ent, args = { hp: 1 }) {
  insert_component(ent, "hp", args.hp);
  return ent;
}

function health_system(ents) {
  ents.forEach((ent) => {
    if (ent.hp <= 0) {
      console.log("despawned entity");
      despawn(ent);
    }
  });
}
