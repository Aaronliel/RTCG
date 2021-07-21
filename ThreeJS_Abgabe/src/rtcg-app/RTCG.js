import { Vector3, Vector2 } from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { createCamera } from "./components/camera.js";
import { createCube, createPlane, createHitmarker, createRay } from "./components/simpleObjects.js";
import { createScene } from "./components/scene.js";
import { attachedRay } from "./components/attachedRay.js";
import { createAmbientlight, createDirectionallight } from "./components/lights.js";
import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { AnimationLoop } from "./systems/AnimationLoop.js";
import { createOrbCTRL } from "./systems/OrbitCTRL.js";
import { loadGLTF } from "./components/gltf.js";
import { ARButton } from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';
import { createGroup } from "./components/group.js";
import { createVerticalLaserMat, createHorizontalLaserMat, createRadialLaserMat } from "./components/customMaterial.js";

let camera;
let renderer;
let scene;
let animLoop;
class RTCG {

    constructor(container) {

        camera = createCamera();
        scene = createScene();
        renderer = createRenderer(camera);
        const resizer = new Resizer(container, camera, renderer);
        container.append(renderer.domElement);
        document.body.appendChild(ARButton.createButton(renderer));

        //#region stationary
        const OrbitControls = createOrbCTRL(camera, renderer.domElement);

        const ambientLight = createAmbientlight(0x000fff, 100);

        const directionalLight = createDirectionallight(0xffffff, 10);
        directionalLight.position.set(-1, 1.5, 1);
        scene.add(directionalLight);

        const plane = createPlane(20, 20, 0xafafaf);
        scene.add(plane);
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(0, -0.5, 0);

        const oneCube = createCube(1, 1, 10, 0xafaf00);
        scene.add(oneCube);
        oneCube.position.set(5, 0, 0);
        //#endregion

        const speed = 20;
        const cube = createCube(0, 0, 0, 0xff0000);
        scene.add(cube);
        cube.position.set(0, 0, 0);

        const circleBlue = createHitmarker(0.05, 0.1, 0xff006f, 2, 2, 0.01);
        const rLaserMat = createRadialLaserMat(new Vector3(1, 0.1, 0.1), speed);            //creating material with "moving shader" on the X-Axis
        circleBlue.material = rLaserMat;
        const group = createGroup([circleBlue]);

        //creating the incoming laser-beam
        const downray = createRay();
        cube.add(downray);
        downray.rotation.set(-Math.PI / 2, 0, 0)
        downray.scale.z = (1, 1, 100);
        const vLaserMat = createVerticalLaserMat(new Vector3(1, 0.0, 0.0), speed);          //creating material with "moving shader" on the Y-Axis
        downray.material = vLaserMat;

        //loading portal cube model
        const gltf = loadGLTF("src/rtcg-app/Assets/PortalCube.glb");
        cube.add(gltf);
        gltf.scale.set(5, 5, 5);
        gltf.position.set(-0.05 * gltf.scale.x, 0, 0.05 * gltf.scale.z);                    //because of a pivot offset in the gltf-model there's a correction needed

        //attaching the reflected laser-beam
        const childRay = new attachedRay(scene, cube, group, 0.1);
        const hLaserMat = createHorizontalLaserMat(new Vector3(1, 0.0, 0.0), -speed);
        childRay.rayVisualizer.material = hLaserMat;

        //setup moving Objects
        animLoop = new AnimationLoop(camera, scene, renderer);
        animLoop.addAnimatedObjects([downray, childRay, vLaserMat, hLaserMat, rLaserMat, childRay.rayVisualizer]);
        animLoop.addInputControlledObject(cube);
        this.start();
    }

    start() {
        animLoop.start();
    }

    render() {
        renderer.render(scene, camera);
    }
}

export { RTCG };