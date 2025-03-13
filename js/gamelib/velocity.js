// handles changing position of the objects
// system acts on antities with position and velocity components from vec2d module
// changing the velocity is handles in the physics module

function velocity_system(ents) {
  ents.forEach((ent) => {
    ent.position = vec_add(ent.position, ent.velocity);
  });
}
