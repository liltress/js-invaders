// player controller allows for steering the player character

function insert_player_controller(
  ent,
  args = { steer_rate: 1, looking_at: 0, speed: 20 },
) {
  insert_component(ent, "player_controller", {
    speed: args.speed,
  });
  return ent;
}

function insert_player(ent) {
  insert_component(ent, "player", null);
  return ent;
}

function player_controller_system(players, delta) {
  players.forEach((player) => {
    const v = (player.velocity = {
      x:
        player.input.right &&
        !player.input.left &&
        player.position.x < width * 0.9
          ? player.player_controller.speed
          : !player.input.right &&
              player.input.left &&
              player.position.x > width * 0.1
            ? -player.player_controller.speed
            : 0,
      y: 0,
    });
  });
}
