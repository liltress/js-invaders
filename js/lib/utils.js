function intersection(a) {
  // borrowed from stack overflow
  // takes List<List<T>> returns List<T>
  if (a.length > 2)
    return intersection([
      intersection(a.slice(0, a.length / 2)),
      intersection(a.slice(a.length / 2)),
    ]);

  if (a.length == 1) return a[0];

  return a[0].filter(function (item) {
    return a[1].indexOf(item) !== -1;
  });
}

function deep_copy(a) {
  if (typeof a != "object") {
    return a;
  }
  return JSON.parse(JSON.stringify(a));
}

function comp_obj_by_signature(obj1, obj2) {
  return (JSON.stringify(Object.keys(obj1)) == JSON.stringify(Object.keys(obj2)));
}