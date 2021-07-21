import { BufferGeometry, RawShaderMaterial, BufferAttribute, BoxBufferGeometry, Mesh, MeshBasicMaterial, TextureLoader, FrontSide } from "https://unpkg.com/three@0.127.0/build/three.module.js";

function createRay() {


    const geometry = new BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.

    const angle60 = Math.PI / 3;
    const angle30 = Math.PI / 6;
    const offset = 1.0;
    const radius = 0.05;
    const vertices = new Float32Array([
        radius, 0.0, offset,
        radius, 0.0, 0.0,
        angle30 * radius, angle60 * radius, 0.0,

        radius, 0.0, offset,
        angle30 * radius, angle60 * radius, 0.0,
        angle30 * radius, angle60 * radius, offset,


        angle30 * radius, angle60 * radius, offset,
        angle30 * radius, angle60 * radius, 0.0,
        -angle30 * radius, angle60 * radius, 0.0,

        angle30 * radius, angle60 * radius, offset,
        -angle30 * radius, angle60 * radius, 0.0,
        -angle30 * radius, angle60 * radius, offset,

        -angle30 * radius, angle60 * radius, offset,
        -angle30 * radius, angle60 * radius, 0.0,
        -radius, 0.0, 0.0,

        -radius, 0.0, offset,
        -angle30 * radius, angle60 * radius, offset,
        -radius, 0.0, 0.0,

        radius, 0.0, offset,
        angle30 * radius, -angle60 * radius, 0.0,
        radius, 0.0, 0.0,

        angle30 * radius, -angle60 * radius, offset,
        angle30 * radius, -angle60 * radius, 0.0,
        radius, 0.0, offset,

        angle30 * radius, -angle60 * radius, 0.0,
        angle30 * radius, -angle60 * radius, offset,
        -angle30 * radius, -angle60 * radius, 0.0,

        -angle30 * radius, -angle60 * radius, offset,
        -angle30 * radius, -angle60 * radius, 0.0,
        angle30 * radius, -angle60 * radius, offset,

        -angle30 * radius, -angle60 * radius, offset,
        -radius, 0.0, 0.0,
        -angle30 * radius, -angle60 * radius, 0.0,

        -radius, 0.0, offset,
        -radius, 0.0, 0.0,
        -angle30 * radius, -angle60 * radius, offset,
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