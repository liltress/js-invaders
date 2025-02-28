// handles coordinate and velocity calculations through a vec2d component
// coordinates follow the HTML canvas standard: X growing Left -> Right, Y growing Top -> Bottom
// position is represented by object of format vec2d: { x: float, y: float }
// the vec2d pattern is followed by position and velocity components

function insert_vec2d(ent, x=0, y=0, key="position") {
    return insert_component(ent, key, { x: x, y: y });
}

function get_vec2d_ptr(obj, key="position") {
    // object passed in is verified to follow the vec2d pattern, and then return
    // otherwise it checks of the object has component that follows the same pattern
    // the key used for comparison can be changed if needed to get the velocity or other component

    if (comp_obj_by_signature(obj, { x: 0, y: 0 })) {
        return obj;
    }
    if (comp_obj_by_signature(obj[key], { x: 0, y: 0 })) {
        return obj[key];
    }
    return undefined;
}

function vec_sub(vec1, vec2) {
    // for both arguments takes a vec2d object, 
    // or an object that has a vec2d component following the pattern
    v1 = get_vec2d_ptr(vec1);
    v2 = get_vec2d_ptr(vec2);

    return { x: v1.x - v2.x, y: v1.y - v2.y };
}

function vec_add(vec1, vec2) {
    v1 = get_vec2d_ptr(vec1);
    v2 = get_vec2d_ptr(vec2);

    return { x: v1.x + v2.x, y: v1.y + v2.y };
}

function vec_mult(vec, num) {
    // takes a vec2d and a float to multiply
    // division can be done with |float| < 1
    v = get_vec2d_ptr(vec);
    return { x: v.x*num, y: v.y*num }
}

function vec_length(vec) {
    // length of the vec2d
    v = get_vec2d_ptr(vec);
    return Math.sqrt(v.x*v.x + v.y+v.y);
}

/*
function vec_cross(vec1, vec2) {
    // cross product of the two vec2ds
    // ! I REALIZED I DONT NEED THIS ONE IN 2D
}
*/

function vec_dot(vec1, vec2) {
    // dot product of the two vec2ds
    v1 = get_vec2d_ptr(vec1);
    v2 = get_vec2d_ptr(vec2);
    return v1.x*v2.x + v1.y*v2.y;
}

function vec_normal(vec) {
    // returns normalized vec2d
    v = get_vec2d_ptr(vec);
    len = vec_length(v);
    return { x: v.x / len, y: v.y / len }
}

function vec_normalize(vec) {
    // destructively normalizes the vec2d
    // returns vec pointer
    v = get_vec2d_ptr(vec);
    v = vec_normal(v);
    return v;
}

function vec_lerp(vec1, vec2, t) {
    // t ranges from 0.0 to 1.0
    // returns the lerp between vec1 and vec2
    v1 = get_vec2d_ptr(vec1);
    v2 = get_vec2d_ptr(vec2);
    return { x: (v1.x + (v2.x - v1.x) * t), y: (v1.y + (v2.y - v2.y) * t) };
}