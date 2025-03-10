// handles graphical interface with the HTML5 canvas
// for the purposes of the game only implemented shape is a circle, with the sprite component
// the sprite uses the same position as the entity
// a nodraw componenet can be added to the entity to hide it from graphics, no value is needed

// component management
function insert_sprite(ent, color="#FF0000", radius=20, layer=1) {
  insert_component(
    ent,
    "sprite",
    {
      color: color,
      radius: radius,
      layer: layer,
    }
  );
  return ent;
}

function insert_nodraw(ent) {
  insert_component(
    ent,
    "nodraw",
    undefined,
  )
  return ent;
}

// systems
function draw_system(ctx=context) {
  let drawables = query_comp(["position", "sprite"], ["nodraw"]);

  //console.log(drawables);

  drawables.forEach(drawable => {
    ctx.beginPath();
    ctx.arc(
      drawable.position.x,
      drawable.position.y,
      drawable.sprite.radius,
      0,
      10,
    );
    ctx.fillStyle = drawable.sprite.color;
    ctx.fill();
  });
}