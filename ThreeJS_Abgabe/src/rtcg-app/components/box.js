import { BoxBufferGeometry, Mesh, MeshPhysicalMaterial, MeshPhongMaterial, TextureLoader, FrontSide, Vector3 } from "https://unpkg.com/three@0.127.0/build/three.module.js";

function createCube(x = 2, y = 2, z = 2, color = 0x0f0f0f) {
    const geometry = new BoxBufferGeometry(x, y, z);


    const pMaterial = new MeshPhongMaterial({ color: color });
    const cube = new Mesh(geometry, pMaterial);
    let speed = 1;
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.tick = (delta) => {
        cube.rotation.y += 0.5 * delta * speed;
    }
    cube.update = (delta, input) => {                               //moving the ocject by WASD/QE => input.x (W/-S) as forward, input.y (A/D) sideways, input.z as Y-Rotation
        cube.rotation.y -= input.z * delta;
        var forward = new Vector3(0, 0, 1 * input.x * delta);
        var right = new Vector3(-1 * input.y * delta, 0, 0);

        forward.applyEuler(cube.rotation);
        right.applyEuler(cube.rotation);
        cube.position.add(forward.add(right));
    }

    return cube;
}

export { createCube };