import { OrbitControls } from 'https://unpkg.com/three@0.117.0/examples/jsm/controls/OrbitControls.js';

function createOrbCTRL(camera, canvas) {
    camera.position.set(0, 0, 5);
    camera.rotation.set(0, 0, 0);

    const controls = new OrbitControls(camera, canvas);

    controls.enableDampening = true;
    controls.tick = () => controls.update();

    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotation = true;
    controls.enablePan = false;
    controls.maxZoom = 0;
    controls.minZoom = 2;
    controls.minPolarAngle = 0;

    return controls;
}

export { createOrbCTRL };