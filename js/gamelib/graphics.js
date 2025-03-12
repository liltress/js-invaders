// handles graphical interface with the HTML5 canvas
// the sprite uses the same position as the entity
// a nodraw componenet can be added to the entity to hide it from graphics, no value is needed

// sprite can be of types:
/*
  circle
  {
    type: "circle"
    layer: int
    color: str
    shapedata: {
      radius: int
    }
  }

*/

// component management
function insert_circle(ent, color="#FF0000", radius=20, layer=1) {
  insert_component(
    ent,
    "sprite",
    {
      type: "circle",
      layer: layer,
      color: color,
      spritedata: {
        radius: radius,
      }
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

function comp_drawable_by_layer(d1, d2) {
  if (d1.sprite.layer > d2.sprite.layer) {
    return true
  }
  return false
}

function draw_circle(ctx, circle_ent) {
        ctx.beginPath();
        ctx.arc(
          circle_ent.position.x,
          circle_ent.position.y,
          circle_ent.sprite.spritedata.radius,
          0,
          10,
        );
        ctx.fillStyle = circle_ent.sprite.color;
        ctx.fill();
}

// systems
function draw_system(drwbs, ctx=context) {

  let drawables = drwbs.sort((d1, d2) => {
    let a = d1.sprite.layer < d2.sprite.layer;
    console.log(a);
    return a
  });
  console.log(drawables);

  ctx.clearRect(0, 0, 1200, 675);

  drawables.forEach(drawable => {
    switch (drawable.sprite.type) {
      case "circle": {
        draw_circle(ctx, drawable);
        break; 
      }
      default:
        console.log("failed to render entity:", drawable);
    }
  });
}
