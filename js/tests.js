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

  assert_eq(query("color"), [ent1, ent2]);
  assert_eq(query_without("position"), [ent1]);
  assert_eq(query_several(["id", "position"]), [ent2, ent3]);
  assert_eq(query_without_several(["position", "name"]), [ent1]);
  assert_eq(query_comp(["position"], ["color"]), [ent3]);

  EntityList = [];
}
{
  // adding and removing systems
  let counter = 0;
  function inc() {
    entities = query_without("any");
    for (let i = 0; i < entities.length; i++) {}
    counter++;
  }
  function temp() {}

  add_system(inc, Schedule.UPDATE);
  add_system(temp, Schedule.UPDATE);
  assert_eq(SystemsUpdate, [inc, temp]);

  remove_system(temp, Schedule.UPDATE);
  assert_eq(SystemsUpdate, [inc]);
}

/*
EntityList = [];
SystemsStartup = [];
SystemsUpdate = [];
*/

review();
