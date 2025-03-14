function intersection(a) {
  // borrowed from stack overflow
  // takes List<List<T>> returns List<T>

  if (a.length > 2)
    return intersection([
      intersection(a.slice(0, a.length / 2)),
      intersection(a.slice(a.length / 2)),
    ]);

  if (a.length == 1) return a[0];
  if (a.length == 0) return [];

  //console.log("from inside intersection:", a);
  return a[0].filter(function (item) {
    return a[1].indexOf(item) !== -1;
  });
}

function deep_copy(a) {
  // my original
  if (typeof a != "object") {
    return a;
  }
  return JSON.parse(JSON.stringify(a));
}

function comp_obj_by_signature(obj1, obj2) {
  return JSON.stringify(Object.keys(obj1)) == JSON.stringify(Object.keys(obj2));
}

pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

pipe_with_args =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => {
      switch (typeof f) {
        case "function":
          return f(v);
        case "object":
          return f.func(v, f.args);
      }
    }, x);

function sleep(ms) {
  // must use inside async functions
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function empty_object(obj) {
  Object.keys(obj).forEach((key) => {
    delete obj[key];
  });
}
