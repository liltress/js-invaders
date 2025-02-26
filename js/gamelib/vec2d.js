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
}

function vec_add(vec1, vec2) {

}

function vec_mult(vec, num) {
    // takes a vec2d and a float to multiply
    // division can be done with |float| < 1
}

function vec_length(vec) {
    // length of the vec2d
}

function vec_cross(vec1, vec2) {
    // cross product of the two vec2ds
}

function vec_dot(vec1, vec2) {
    // dot product of the two vec2ds
}

function vec_normal(vec) {
    // returns normalized vec2d
}

function vec_normalize(vec) {
    // destructively normalizes the vec2d
}

function vec_midpoint(vec1, vec2) {
    // treats two vecs as coordinates from the origin { 0, 0 }
    // and calculates the point halfway between
}