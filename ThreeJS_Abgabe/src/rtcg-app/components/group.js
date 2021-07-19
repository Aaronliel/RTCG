import { Group } from "https://unpkg.com/three@0.127.0/build/three.module.js";

function createGroup(objects = []) {
    const group = new Group();
    for (const obj of objects) {
        group.add(obj);
    }

    group.hide = (_visible) => {
        for (const child of group.children) {
            child.material.visible = _visible;
        }
    }
    return group;
}
export { createGroup };