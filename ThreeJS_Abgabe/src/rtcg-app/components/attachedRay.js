import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { RTCG } from "../RTCG.js";
import { createRay, createCube } from "./simpleObjects.js";


class attachedRay {
    target = createCube(0.05, 0.05, 0.05, 0xff00ff);

    scene;
    parent;
    origin = new THREE.Vector3(0, 0, 0);
    direction = new THREE.Vector3(1, 0, 0);
    rayVisualizer = createRay();
    raycaster = new THREE.Raycaster(new THREE.Vector3(0, 0, 0), this.direction, 0.1, 50);
    childRays = [];
    distance = 0.5;
    splash;
    constructor(_scene, _parent, _splash, _distance = 0.5) {
        this.scene = _scene;
        this.distance = _distance;
        _scene.add(this.rayVisualizer);
        _scene.add(this.target);
        this.parent = _parent;
        this.parent.add(this.rayVisualizer);
        this.parent.add(this.target);

        this.target.position.x = 5;
        this.target.material.visible = false;
        this.tick = (delta) => { this.castRay() };
        if (!_splash) {
            this.splash = createCube(0.5, 0.5, 0.5, 0x0f0000);
        } else {
            this.splash = _splash;
        }
        this.parent.add(this.splash);
        this.splash.hide(false);
    }

    setParent(_parent) {
        this.parent = _parent;
        this.raycaster.set(this.parent.position, this.direction);
        this.parent.attach(this.rayVisualizer);
        this.parent.attach(this.raycaster);
    }

    setRaycaster(_origin, _direction) {
        this.origin = _origin;
        this.target.position.x = _direction.x;
        this.target.position.y = _direction.y;
        this.target.position.z = _direction.z;

        this.rayVisualizer.position = _origin;
    }


    castRay() {
        let parentPos = new THREE.Vector3();
        this.parent.getWorldPosition(parentPos);
        let targetPos = new THREE.Vector3();
        this.target.getWorldPosition(targetPos);
        this.direction = targetPos.sub(parentPos.add(this.origin));
        // this.direction.x = targetPos.x - this.addVectors(parentPos, this.origin).x;
        // this.direction.y = targetPos.y - this.addVectors(parentPos, this.origin).y;
        // this.direction.z = targetPos.z - this.addVectors(parentPos, this.origin).z;
        this.direction.normalize()
        this.raycaster.set(this.parent.position, this.direction);

        this.rayVisualizer.position.x = this.distance;
        this.rayVisualizer.rotation.y = Math.PI / 2;
        const intersects = this.raycaster.intersectObjects(this.scene.children);



        if (intersects.length > 0) {
            this.rayVisualizer.scale.z = intersects[0].distance;

            this.splash.position.x = intersects[0].distance;

            this.splash.lookAt(intersects[0].point.add(intersects[0].face.normal));

            this.splash.hide(true);
        }
        else {
            this.rayVisualizer.scale.z = 0;
            this.splash.hide(false);
        }
    }

}

export { attachedRay };