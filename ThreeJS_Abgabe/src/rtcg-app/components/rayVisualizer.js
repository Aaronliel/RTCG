import { BufferGeometry, RawShaderMaterial, BufferAttribute, BoxBufferGeometry, Mesh, MeshBasicMaterial, TextureLoader, FrontSide } from "https://unpkg.com/three@0.127.0/build/three.module.js";

function createRay() {


    const geometry = new BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    const vertices = new Float32Array([
        -0.05, -0.05, 0.0,
        -0.05, 0.05, 0.0, //1
        0.05, -0.05, 0.0,

        -0.05, 0.05, 0.0,
        0.05, 0.05, 0.0,  //2
        0.05, -0.05, 0.0,

        0.05, -0.05, 0.0,
        0.05, 0.05, 0.0,  //3
        0.05, -0.05, 1.0,

        0.05, -0.05, 1.0,
        0.05, 0.05, 0.0,  //4
        0.05, 0.05, 1.0,

        0.05, 0.05, 1.0,
        0.05, 0.05, 0.0,  //5
        -0.05, 0.05, 1.0,

        -0.05, 0.05, 0.0,
        -0.05, 0.05, 1.0, //6
        0.05, 0.05, 0.0,

        -0.05, 0.05, 0.0,
        -0.05, -0.05, 0.0, //7
        -0.05, -0.05, 1.0,

        -0.05, 0.05, 0.0,
        -0.05, -0.05, 1.0, //8
        -0.05, 0.05, 1.0,

        0.05, -0.05, 0.0,
        -0.05, -0.05, 1.0,  //9
        -0.05, -0.05, 0.0,

        0.05, -0.05, 0.0,
        -0.05, -0.05, 1.0,  //9
        -0.05, -0.05, 0.0,

        0.05, -0.05, 0.0,
        0.05, -0.05, 1.0,
        -0.05, -0.05, 1.0,

        -0.05, 0.05, 1.0,
        -0.05, -0.05, 1.0,    //11
        0.05, -0.05, 1.0,

        0.05, 0.05, 1.0,
        -0.05, 0.05, 1.0, //12
        0.05, -0.05, 1.0

    ]);

    geometry.setAttribute('position', new BufferAttribute(vertices, 3));
    const material = new MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new Mesh(geometry, material);

    mesh.tick = (delta) => {
        mesh.rotation.z += 20 * delta;
    }
    return mesh;
}

export { createRay };