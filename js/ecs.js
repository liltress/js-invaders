var EntityList = [];

function spawn() {
  //-> Entity
  EntityList[EntityList.length] = {};
  return EntityList[EntityList.length - 1];
}

function despawn(entity) {
  //-> void
  const i = EntityList.indexOf(entity);
  EntityList = EntityList.slice(0, i).concat(EntityList.slice(i + 1));
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
