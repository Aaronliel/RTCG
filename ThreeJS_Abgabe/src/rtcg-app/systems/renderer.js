import { WebGLRenderer, PCFSoftShadowMap } from "https://unpkg.com/three@0.127.0/build/three.module.js";

function createRenderer(camera) {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(devicePixelRatio);
    renderer.physicalCorrectLight = true;
    renderer.shadowMap.autoUpdate = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.shadowMapSoft = true;
    renderer.alpha = true;
    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = camera.far;
    renderer.shadowCameraFov = 50;

    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = 2048;
    renderer.shadowMapHeight = 2048;

    renderer.xr.enabled;

    const gl = renderer.getContext();
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);

    return renderer;
}

export { createRenderer };