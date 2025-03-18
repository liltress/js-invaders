function insert_despawn_timer(ent, args = { lifetime: 5 }) {
  insert_component(ent, "despawn_timer", args.lifetime);
  return ent;
}

function despawn_timer_system(ents, delta) {
  ents.forEach((ent) => {
    ent.despawn_timer = ent.despawn_timer - delta;
    if (ent.despawn_timer <= 0) {
      despawn(ent);
    }
  });
}
