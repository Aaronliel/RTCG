import { AmbientLight } from "https://unpkg.com/three@0.127.0/build/three.module.js";
function createAmbientlight(color = 0xffffff, intensity = 1) {
    const ambientLight = new AmbientLight(color);
    ambientLight.power = intensity;

    return ambientLight;
}

export { createAmbientlight };