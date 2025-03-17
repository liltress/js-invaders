//handles hp

function insert_hp(ent, args={hp:1}) {
  insert_component(ent, "hp", args.hp);
  return ent;
}