import { Vector3, Vector2, ShadowMaterial, Group } from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { createCamera } from "./components/camera.js";
import { createCube } from "./components/box.js";
import { createScene } from "./components/scene.js";
import { attachedRay } from "./components/attachedRay.js";
import { createAmbientlight } from "./components/ambientLight.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { AnimationLoop } from "./systems/AnimationLoop.js";
import { createDirectionallight } from "./components/directionalLight.js";
import { createOrbCTRL } from "./systems/OrbitCTRL.js";
import { loadGLTF } from "./components/gltf.js";
import { ARButton } from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';
import { createPlane } from "./components/plane.js";
import { createHitmarker } from "./components/hitmarker.js";
import { createGroup } from "./components/group.js";
import { createRay } from "./components/rayVisualizer.js";
import { createCustomMat } from "./components/customMaterial.js";

let camera;
let renderer;
let scene;
let animLoop;
class RTCG {

    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        const resizer = new Resizer(container, camera, renderer);
        container.append(renderer.domElement);

        renderer.shadowCameraNear = 3;
        renderer.shadowCameraFar = camera.far;
        renderer.shadowCameraFov = 50;

        renderer.shadowMapBias = 0.0039;
        renderer.shadowMapDarkness = 0.5;
        renderer.shadowMapWidth = 2048;
        renderer.shadowMapHeight = 2048;

        renderer.xr.enabled;
        document.body.appendChild(ARButton.createButton(renderer));

        const OrbitControls = createOrbCTRL(camera, renderer.domElement);
        OrbitControls.enablePan = false;
        OrbitControls.maxZoom = 0;
        OrbitControls.minZoom = 2;
        OrbitControls.minPolarAngle = 0;

        const plane = createPlane(20, 20, 0x0f6f0f);
        scene.add(plane);
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(0, -0.5, 0);


        const cube = createCube(0, 0, 0, 0xff0000);
        scene.add(cube);
        cube.position.set(0, 0, 0);

        const particleSys = createCube(0.1, 0.1, 0.1, 0xffffff);
        scene.add(particleSys);

        const circleBlue = createHitmarker(0.05, 0.1, 0xff006f, 2, 2, 0.01);
        const circleCyan = createHitmarker(0.05, 0.1, 0xff6f6f, 4, 2, 0.01);
        const circlePurple = createHitmarker(0.05, 0.1, 0xff06ff, 6, 2, 0.01);
        const circleYellow = createHitmarker(0.05, 0.1, 0xff6f00, 8, 2, 0.01);

        const group = createGroup([circleBlue, circleCyan, circlePurple, circleYellow]);

        const downray = createRay();
        // scene.add(downray);
        cube.add(downray);
        downray.rotation.set(-Math.PI / 2, 0, 0)
        downray.scale.z = (1, 1, 100);
        const customMat = createCustomMat(renderer, new Vector3(1, 0.1, 0.1), 0.5);
        downray.material = customMat;

        // cube.rotation.z = 0.5;

        const oneCube = createCube(1, 1, 10, 0x6f6f00);
        scene.add(oneCube);
        oneCube.position.set(10, 0, 0);

        const directionalLight = createDirectionallight(0xffffff, 0.1);
        directionalLight.position.set(-1, 1, 0);
        scene.add(directionalLight);

        const gltf = loadGLTF("src/rtcg-app/Assets/PortalCube.glb");
        console.log(gltf);
        cube.add(gltf);
        console.log(gltf, gltf.getObjectByName("Cube", true));

        gltf.scale.set(5, 5, 5);
        gltf.position.set(-0.05 * gltf.scale.x, 0, 0.05 * gltf.scale.z);


        const childRay = new attachedRay(scene, cube, group, 0.1);
        childRay.rayVisualizer.material = customMat;

        animLoop = new AnimationLoop(camera, scene, renderer);
        animLoop.addAnimatedObject(downray);
        animLoop.addAnimatedObject(childRay);
        animLoop.addAnimatedObject(customMat);
        animLoop.addAnimatedObject(childRay.rayVisualizer);
        animLoop.addAnimatedObject(circleBlue);
        animLoop.addAnimatedObject(circleCyan);
        animLoop.addAnimatedObject(circlePurple);
        animLoop.addAnimatedObject(circleYellow);
        animLoop.addInputControlledObject(cube);
        this.start();


        // this.render("./Assets/scene.gltf");
    }

    start() {
        animLoop.start();
    }

    render() {
        renderer.render(scene, camera);
    }
}

export { RTCG };