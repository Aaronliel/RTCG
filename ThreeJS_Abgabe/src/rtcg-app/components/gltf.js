import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { Mesh, TextureLoader, MeshPhongMaterial } from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { createScene } from './scene.js';


function loadGLTF(_modelURL) {
    let loader = new GLTFLoader();
    let scene = createScene();
    let root;
    let obj3D;
    let Tloader = new TextureLoader();
    obj3D = loader.load(_modelURL, function (_gltf) {
        root = _gltf.scene;
        // scene.add(root);
        console.log(_gltf);
        obj3D = _gltf.scene.getObjectByName("Cube");
        obj3D.material = new MeshPhongMaterial();
        obj3D.material.alphaMap = Tloader.load("src/rtcg-app/Assets/textures/DefaultMaterial_Opacity.bmp");
        obj3D.material.map = Tloader.load("src/rtcg-app/Assets/textures/DefaultMaterial.001_baseColor.jpeg");
        scene.add(obj3D);
    });
    console.log(obj3D);


    scene.update = (delta, input) => {
        scene.position.x += input.x * delta;
        scene.position.z += input.y * delta;
        scene.rotation.y -= input.z * delta;
    }
    return scene;
}

export { loadGLTF };