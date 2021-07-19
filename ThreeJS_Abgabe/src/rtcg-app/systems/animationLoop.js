import { Clock, Vector3 } from "https://unpkg.com/three@0.127.0/build/three.module.js";

let inputOutofClass = new Vector3(0, 0, 0);
class AnimationLoop {
    camera;
    scene;
    renderer;
    clock;
    animObjects;
    inputControlledObjects;
    input;

    constructor(_camera, _scene, _renderer) {
        this.camera = _camera;
        this.scene = _scene;
        this.renderer = _renderer;
        this.clock = new Clock();
        this.animObjects = [];
        this.inputControlledObjects = [];

    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick();
            this.renderer.render(this.scene, this.camera);
        });

        document.addEventListener("keypress", function (event) {
            switch (event.code) {
                case "KeyD":
                    inputOutofClass.x = 1;
                    break;
                case "KeyA":
                    inputOutofClass.x = -1;
                    break;
                case "KeyW":
                    inputOutofClass.y = -1;
                    break;
                case "KeyS":
                    inputOutofClass.y = 1;
                    break;
                case "KeyQ":
                    inputOutofClass.z = -1;
                    break;
                case "KeyE":
                    inputOutofClass.z = 1;
                    break;

                default:
                    break;
            }

        });

        document.addEventListener("keyup", function (event) {
            switch (event.code) {
                case "KeyD":
                    inputOutofClass.x = 0;
                    break;
                case "KeyA":
                    inputOutofClass.x = 0;
                    break;
                case "KeyW":
                    inputOutofClass.y = 0;
                    break;
                case "KeyS":
                    inputOutofClass.y = 0;
                    break;
                case "KeyQ":
                    inputOutofClass.z = 0;
                    break;
                case "KeyE":
                    inputOutofClass.z = 0;
                    break;

                default:
                    break;
            }
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    addAnimatedObject(_object) {
        this.animObjects.push(_object);
    }

    addInputControlledObject(_object) {
        this.inputControlledObjects.push(_object);
    }

    tick() {
        const delta = this.clock.getDelta();

        const fps_element = document.querySelector("#fps-counter");
        const fps = 1 / delta;
        fps_element.textContent = fps.toFixed(1);

        for (const obj of this.animObjects) {
            obj.tick(delta);
        }
        for (const obj of this.inputControlledObjects) {
            obj.update(delta, inputOutofClass);
        }

    }


}

export { AnimationLoop };