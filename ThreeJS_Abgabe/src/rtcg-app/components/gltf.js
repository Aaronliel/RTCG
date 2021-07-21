import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { Mesh, TextureLoader, MeshPhongMaterial, Vector3 } from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { createScene } from './scene.js';
import { createTransparentMat } from './customMaterial.js';


function loadGLTF(_modelURL) {
    let loader = new GLTFLoader();
    let scene = createScene();
    let root;
    let cube;
    let metalRings;
    let lens;
    let Tloader = new TextureLoader();
    cube = loader.load(_modelURL, function (_gltf) {
        root = _gltf.scene;
        cube = _gltf.scene.getObjectByName("Cube");
        cube.material = new MeshPhongMaterial({ color: 0x6f6f6f });
        cube.castShadow = true;
        cube.receiveShadow = true;
        metalRings = _gltf.scene.getObjectByName("Metalrings");
        metalRings.material = new MeshPhongMaterial({ color: 0x000000 });
        lens = _gltf.scene.getObjectByName("Lens");
        lens.material = createTransparentMat(new Vector3(0, 0.5, 0), 0.950);
        scene.add(cube);
    });


    scene.update = (delta, input) => {
        scene.position.x += input.x * delta;
        scene.position.z += input.y * delta;
        scene.rotation.y -= input.z * delta;
    }
    return scene;
}

export { loadGLTF };