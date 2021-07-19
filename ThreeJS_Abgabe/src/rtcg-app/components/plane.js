import { PlaneGeometry, Mesh, MeshPhysicalMaterial, MeshBasicMaterial, TextureLoader, FrontSide } from "https://unpkg.com/three@0.127.0/build/three.module.js";

function createPlane(x, y, _color) {
    const geometry = new PlaneGeometry(x, y);
    const material = new MeshPhysicalMaterial({ color: _color });

    const plane = new Mesh(geometry, material);
    plane.castShadow = true;
    plane.receiveShadow = true;
    return plane;
}

export { createPlane };