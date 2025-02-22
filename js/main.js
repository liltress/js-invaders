var Viewport = document.getElementsByName("Viewport");

let e = spawn();
e["id"] = 1;
e["ie"] = 2;
e["if"] = 3;
let e2 = spawn();
e2["id"] = 2;
e2["ie"] = 3;
let e3 = spawn();
e3["id"] = 5;
e3["if"] = 6;
let e4 = spawn();
e4["ie"] = 7;
e4["if"] = 11;
let e5 = spawn();
e5["if"] = 12;
let e6 = spawn();
e6["id"] = 1;
e6["ie"] = 1;
e6["ik"] = 0;

console.log(EntityList);
console.log(query("ie"));
console.log(query_without("ie"));
console.log(query_several(["id", "ie"]));
console.log(query_without_several(["id", "ie"]));
console.log(query_comp(["id", "ie"], ["ik", "ij"]));
