// player controller allows for steering the player character

function insert_player_controller(
  ent,
  args = { steer_rate: 1, looking_at: 0, speed: 20 },
) {
  insert_component(ent, "player_controller", {
    speed: args.speed,
    cooldown: 0,
  });
  return ent;
}

function insert_player(ent) {
  insert_component(ent, "player", null);
  return ent;
}

function player_controller_system(players, delta) {
  players.forEach((player) => {
    player.player_controller.cooldown = Math.max(
      player.player_controller.cooldown - delta,
      0,
    );
    const boost = player.input.boost ? 2 : 1;
    const v = player.player_controller.speed * boost;
    player.velocity = {
      x:
        player.input.right &&
        !player.input.left &&
        player.position.x < width * 0.9
          ? v
          : !player.input.right &&
              player.input.left &&
              player.position.x > width * 0.1
            ? -v
            : 0,
      y: 0,
    };
    if (
      player.player_controller.cooldown == 0 &&
      player.input.shoot &&
      !player.input.boost
    ) {
      player.player_controller.cooldown += 0.33;
      pipe_with_args(
        spawn,
        {
          func: insert_vec2d,
          args: {
            key: "position",
            x: player.position.x,
            y: player.position.y - 21,
          },
        },
        {
          func: insert_vec2d,
          args: {
            key: "velocity",
            x: 0,
            y: -900,
          },
        },
        {
          func: insert_circle,
          args: { radius: 5, color: Colors.Yellow, layer: 0 },
        },
        {
          func: insert_collide,
          args: {
            layers: [],
            masks: ["enemy"],
            colission_logic: (enemy, bullet) => {
              despawn(bullet);
              enemy.hp -= 1;
            },
          },
        },
        { func: insert_circular_collider, args: { radius: 5 } },
        insert_despawn_timer,
      )();
    }
  });
}
