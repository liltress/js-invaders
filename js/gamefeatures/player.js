// player controller allows for steering the player character

function insert_player_controller(
  ent,
  args = { steer_rate: 1, looking_at: 0, speed: 20 },
) {
  insert_component(ent, "player_controller", {
    steer_rate: args.steer_rate,
    looking_at: args.looking_at,
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
    /*
    console.log(
      "from inside player controller system: \nplayer velocity:",
      player.velocity,
      "\ncontroller:",
      player.player_controller,
      "\ndelta:",
      delta,
    );
    */
    if (player.input.turn_counter && !player.input.turn_clockwise) {
      player.player_controller.looking_at -=
        player.player_controller.steer_rate * delta;
    } else if (!player.input.turn_counter && player.input.turn_clockwise) {
      player.player_controller.looking_at +=
        player.player_controller.steer_rate * delta;
    }

    player.velocity = {
      x:
        player.player_controller.speed *
        Math.cos(player.player_controller.looking_at),
      y:
        player.player_controller.speed *
        Math.sin(player.player_controller.looking_at),
    };
  });
}
