import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { createRay, createCube } from "./simpleObjects.js";


class attachedRay {

    //creating a target for the Raycaster to look at
    target = createCube(0.05, 0.05, 0.05, 0xff00ff);

    scene;
    parent;
    origin = new THREE.Vector3(0, 0, 0);
    direction = new THREE.Vector3(1, 0, 0);

    //creating the visible Ray
    rayVisualizer = createRay();


    raycaster = new THREE.Raycaster(new THREE.Vector3(0, 0, 0), this.direction, 0.1, 50);
    distance;
    splash;
    constructor(_scene, _parent, _splash, _distance = 0.5) {
        this.scene = _scene;
        this.distance = _distance;
        this.parent = _parent;

        if (!_splash) {
            this.splash = createCube(0.5, 0.5, 0.5, 0x0f0000);
        } else {
            this.splash = _splash;
        }

        this.parent.add(this.splash);
        this.splash.visible(false);

        this.parent.add(this.rayVisualizer);
        this.parent.add(this.target);

        this.target.position.x = 5;
        this.target.material.visible = false;




        this.tick = (delta) => { this.castRay() };

    }


    castRay() {
        //preparing vectors for calculations
        let parentPos = new THREE.Vector3();
        this.parent.getWorldPosition(parentPos);
        let targetPos = new THREE.Vector3();
        this.target.getWorldPosition(targetPos);

        //calculating ray/raycast direction
        this.direction = targetPos.sub(parentPos.add(this.origin));
        this.direction.normalize();

        this.raycaster.set(this.parent.position, this.direction);

        //aligning visual ray to actual raycast-ray
        this.rayVisualizer.position.x = this.distance;
        this.rayVisualizer.rotation.y = Math.PI / 2;


        const intersects = this.raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0) {

            //scaling visual up to hit point
            this.rayVisualizer.scale.z = intersects[0].distance - this.distance;

            //placing hitmarker according to hit-surface
            this.splash.position.x = intersects[0].distance;
            this.splash.lookAt(intersects[0].point.add(intersects[0].face.normal));
            this.splash.visible(true);
        }
        else {

            //reset visual indicators
            this.rayVisualizer.scale.z = 0;
            this.splash.visible(false);
        }
    }

}

export { attachedRay };