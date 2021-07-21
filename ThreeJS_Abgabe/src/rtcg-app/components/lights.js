import { AmbientLight, DirectionalLight } from "https://unpkg.com/three@0.127.0/build/three.module.js";
function createAmbientlight(color = 0xffffff, intensity = 1) {
    const ambientLight = new AmbientLight(color);
    ambientLight.power = intensity;

    return ambientLight;
}
function createDirectionallight(color = 0xffffff, intensity = 1) {
    const directionalLight = new DirectionalLight(color);
    directionalLight.power = intensity;
    directionalLight.castShadow = true;

    return directionalLight;
}

export { createDirectionallight, createAmbientlight };