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
    cube.update = (delta, input) => {
        cube.position.x += input.x * delta;
        cube.position.z += input.y * delta;
        cube.rotation.y -= input.z * delta;
    }

    return cube;
}

export { createCube };