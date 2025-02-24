var EntityList = []; // list of entity objects
var SystemsUpdate = []; // list of functions that run per frame per entity with component
var SystemsStartup = []; // list of functions that run when component is added

// Entity managment
function spawn() {
  //-> Entity
  EntityList[EntityList.length] = {};
  return EntityList[EntityList.length - 1];
}

function despawn(entity) {
  // remove
  //-> copy of the Entity
  let copy = shallow_copy(entity);

  const i = EntityList.indexOf(entity);
  EntityList = EntityList.slice(0, i).concat(EntityList.slice(i + 1));

  return copy;
}

function query(key) {
  //-> List<Entity>
  return EntityList.filter((entity) => key in entity);
}

function query_without(key) {
  return EntityList.filter((entity) => !(key in entity));
}

function query_several(keys) {
  return intersection(keys.map(query));
}

function query_without_several(keys) {
  return intersection(keys.map(query_without));
}

function query_comp(with_keys, without_keys) {
  return intersection([
    query_several(with_keys),
    query_without_several(without_keys),
  ]);
}

// System Managment

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

function run_systems(schedule) {
  let systems_list = get_systems_list(schedule);
}

// Component Managment

function insert_component(entity, key, val) {
  entity[key] = val;
}

function remove_component(entity, key) {
  // -> value of the component
  let copy = entity[key];
  let copy_str = JSON.stringify(entity[key]);
  let is_obj = typeof entity[key] == "object";

  delete entity[key];

  if (is_obj) {
    return JSON.parse(copy_str);
  }
  return copy;
}
