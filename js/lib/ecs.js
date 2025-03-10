var EntityList = []; // list of entity objects
var SystemsUpdate = []; // list of functions that run per frame

// Entity managment
function spawn() {
  //-> Entity
  EntityList.push({});
  return EntityList[EntityList.length - 1];
}

function despawn(entity) {
  // remove
  //-> copy of the Entity
  let copy = deep_copy(entity);

  //const i = EntityList.indexOf(entity);
  //EntityList = EntityList.slice(0, i).concat(EntityList.slice(i + 1));

  EntityList = EntityList.filter((e) => e != entity);

  return copy;
}

function query(key, entities = EntityList) {
  //-> List<Entity>
  //console.log("there is a query inwoked", entities);
  return entities.filter((entity) => key in entity);
}

function query_without(key, entities = EntityList) {
  return entities.filter((entity) => !(key in entity));
}

function query_several(keys, entities = EntityList) {
  //console.log("AAAAAAAAAAAAAAAAA", entities);
  return intersection(keys.map((key) => query(key, entities)));
}

function query_without_several(keys, entities = EntityList) {
  return intersection(keys.map((key) => query_without(key, entities)));
}

function query_comp(with_keys, without_keys, entities = EntityList) {
  return intersection([
    query_several(with_keys, entities),
    query_without_several(without_keys, entities),
  ]);
}

// System Managment
/*
class Schedule {
  static #_UPDATE = "Update";
  static #_STARTUP = "Startup";

  static get UPDATE() {
    return this.#_UPDATE;
  }
  static get STARTUP() {
    return this.#_UPDATE;
  }
}

function get_systems_list(schedule) {
  switch (schedule) {
    case Schedule.UPDATE: {
      return SystemsUpdate;
    }
    case Schedule.STARTUP: {
      return SystemsStartup;
    }
  }
}

function add_system(system, schedule) {
  let systems_list = get_systems_list(schedule);
  systems_list[systems_list.length] = system;
}

function remove_system(system, schedule) {
  switch (schedule) {
    case Schedule.UPDATE: {
      const i = SystemsUpdate.indexOf(system);
      SystemsUpdate = SystemsUpdate.slice(0, i).concat(
        SystemsUpdate.slice(i + 1),
      );
    }
    case Schedule.STARTUP: {
      const i = SystemsStartup.indexOf(system);
      SystemsStartup = SystemsStartup.slice(0, i).concat(
        SystemsStartup.slice(i + 1),
      );
    }
  }
}
*/

function add_system(system) {
  SystemsUpdate.push(system);
}

function remove_system(system) {
  let copy = system;
  SystemsUpdate = SystemsUpdate.filter((s) => s != system);
  return copy;
}

function run_updates() {
  SystemsUpdate.forEach((f) => f());
}

// Component Managment

// Functions return the original entity pointer,
// allowing them to be curried

// Functions for adding a specific component, e g:
// position, velocity, sprite, ai -
// should do the same

function insert_component(entity, key, val) {
  entity[key] = val;

  return entity;
}

function remove_component(entity, key) {
  // -> value of the component
  /*let copy = entity[key];
  let copy_str = JSON.stringify(entity[key]);
  let is_obj = typeof entity[key] == "object";
  */

  delete entity[key];
  /*
  if (is_obj) {
    return JSON.parse(copy_str);
  }
  */
  return entity;
}

function insert_component_with_setup(entity, key, val, setup, ...extra_args) {
  insert_component(entity, key, val);
  setup(entity, extra_args); //must be function of form func(Entity, ...extra_args)

  return entity;
}
