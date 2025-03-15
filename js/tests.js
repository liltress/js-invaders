// this file contains unit tests that run before the game is started
// it is unneeded for the game to work and can be ommited out of the index.html for playing
// its here to make development easier

var successes = 0;
var failures = 0;

function fail(arg1, arg2) {
  failures++;
  console.log("error! arg1:", arg1, "does not equal arg2:", arg2);
}

function success() {
  successes++;
}

function assert_eq(arg1, arg2) {
  //ignore this
  if (typeof arg1 == typeof arg2 && typeof arg1 == "object") {
    if (JSON.stringify(arg1) === JSON.stringify(arg2)) {
      success();
      return;
    }
    fail(arg1, arg2);
    return;
  } else if (typeof arg1 == typeof arg2 && arg1 != "object") {
    if (arg1 === arg2) {
      success();
      return;
    }
    fail(arg1, arg2);
    return;
  }
  fail(arg1, arg2);
}

function review() {
  console.log("tests passed: ", successes, "\ntests failed: ", failures);
}

/*
{
  assert_eq(1 + 1, 2);
  assert_eq(1 + 1, 3);
  assert_eq({}, {});
  assert_eq({ id: 5 }, { id: 5 });
  assert_eq({ id: 5 }, { id: 6 });
  assert_eq({ id: 5 }, { ig: 5 });
}
*/

{
  let obj = { x: 0, y: 1 };
  empty_object(obj);
  assert_eq(obj, {});
}

{
  // adding and removing components
  let ent1 = spawn();
  assert_eq(ent1, {});

  let temp = spawn();
  assert_eq(EntityList.length, 2);
  temp["prop"] = 5;
  let deleted = despawn(temp);
  assert_eq(EntityList.length, 1);
  assert_eq(deleted, { prop: 5 });

  // querying for entities
  ent1["id"] = 1;
  ent1["color"] = "red";

  let ent2 = spawn();
  ent2["id"] = 2;
  ent2["color"] = "blue";
  ent2["position"] = { x: 1, y: 2 };

  let ent3 = spawn();
  ent3["id"] = 3;
  ent3["position"] = { x: 4, y: 5 };
  ent3["name"] = "John";

  assert_eq(comp_obj_by_signature(ent1, { id: 100, color: "glay" }), true);

  assert_eq(query("color"), [ent1, ent2]);
  assert_eq(query_without("position"), [ent1]);
  assert_eq(query_several(["id", "position"]), [ent2, ent3]);
  assert_eq(query_without_several(["position", "name"]), [ent1]);
  assert_eq(query_comp(["position"], ["color"]), [ent3]);
}

EntityList = [];

{
  // adding and removing systems
  let counter = 0;
  function inc(ents) {
    counter += ents.length;
  }
  function temp() {}

  spawn();
  spawn();
  spawn();

  add_system(inc, [], []);
  add_system(temp, [], []);
  assert_eq(SystemsUpdate, [
    { func: inc, with_keys: [], without_keys: [], do_delta: false },
    { func: temp, with_keys: [], without_keys: [], do_delta: false },
  ]);

  old_system = remove_system(temp);
  assert_eq(SystemsUpdate, [
    { func: inc, with_keys: [], without_keys: [], do_delta: false },
  ]);
  assert_eq(old_system, temp);

  //console.log(SystemsUpdate);
  run_updates();
  assert_eq(counter, 3);
}

EntityList = [];
SystemsUpdate = [];

// adding and removing components
{
  let ent = spawn();
  insert_component(ent, "id", 66);
  assert_eq(ent, { id: 66 });

  let counter = 0;
  function add(ent, ...nums) {
    //console.log(ent, nums);
    counter += ent["id"];
    counter += nums[0][0];
  }

  insert_component_with_setup(ent, "id", 12, add, 5);
  assert_eq(counter, 17);
  //console.log(counter, typeof counter);
}

EntityList = [];
SystemsStartup = [];
SystemsUpdate = [];

// testing vec2d game module
{
  let ent1 = spawn();
  let ent1_copy = insert_vec2d(ent1);

  assert_eq(ent1, { position: { x: 0, y: 0 } });
  assert_eq(ent1, ent1_copy);

  assert_eq(get_vec2d_ptr(ent1), { x: 0, y: 0 });
  assert_eq(get_vec2d_ptr(ent1.position), { x: 0, y: 0 });

  let ent2 = pipe(spawn, insert_vec2d)();
  ent2.position = vec_add(ent2, { x: 3, y: 4 });
  assert_eq(ent2, { position: { x: 3, y: 4 } });

  assert_eq(vec_sub(ent1, ent2), { x: -3, y: -4 });

  ent1.position = vec_add(ent1, { x: 5, y: 0 });

  assert_eq(vec_mult(ent1, 5), { x: 25, y: 0 });

  assert_eq(vec_dot(ent1, ent2), 15);
}

{
  ent1 = pipe(spawn, insert_circle, insert_vec2d)();
  ent2 = pipe(spawn, insert_circle, insert_vec2d, insert_nodraw)();

  assert_eq(query_several(["sprite", "position"]), [ent1, ent2]);
  assert_eq(query_comp(["sprite", "position"], ["nodraw"]), [ent1]);
}

EntityList = [];
SystemsStartup = [];
SystemsUpdate = [];

review();
