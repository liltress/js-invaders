// handles changing position of the objects
// system acts on antities with position and velocity components from vec2d module
// changing the velocity is handles in the physics module

function velocity_system(ents, delta = 1) {
  ents.forEach((ent) => {
    ent.position = vec_add(ent.position, vec_mult(ent.velocity, delta));
  });
}
