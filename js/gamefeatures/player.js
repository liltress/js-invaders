// player controller allows for steering the player character

function insert_player_controller(ent, steer_rate = 1) {
  insert_component(ent, "player_controller", { steer_rate: steer_rate });
  return ent;
}

function player_controller_system(players, delta) {
  players.forEach((player) => {});
}
