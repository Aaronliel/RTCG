import { WebGLRenderer } from "https://unpkg.com/three@0.127.0/build/three.module.js";

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(devicePixelRatio);
    renderer.physicalCorrectLight = true;
    renderer.shadowMap.autoUpdate = true;
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    return renderer;
}

export { createRenderer };