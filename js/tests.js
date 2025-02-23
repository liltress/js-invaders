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
  let ent1 = spawn();
  assert_eq(ent1, {});

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
}

EntityList = [];

review();
