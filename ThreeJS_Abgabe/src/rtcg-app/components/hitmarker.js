import { BufferGeometry, BufferAttribute, BoxBufferGeometry, Mesh, MeshBasicMaterial, TextureLoader, FrontSide } from "https://unpkg.com/three@0.127.0/build/three.module.js";

function createHitmarker(minRadius = 0.05, maxRadius = 0.1, color = 0xff0000, speed = 2, maxScale = 2, offset = 0.01) {


    const geometry = new BufferGeometry();
    const angle60 = Math.PI / 3;
    const angle30 = Math.PI / 6;
    offset = 0.01;
    const vertices = new Float32Array([
        minRadius, 0.0, offset,
        maxRadius, 0.0, offset,
        angle30 * maxRadius, angle60 * maxRadius, offset,

        angle30 * maxRadius, angle60 * maxRadius, offset,
        minRadius * angle30, minRadius * angle60, offset,
        minRadius, 0.0, offset,

        minRadius * angle30, minRadius * angle60, offset,
        angle30 * maxRadius, angle60 * maxRadius, offset,
        -angle30 * maxRadius, angle60 * maxRadius, offset,

        -angle30 * maxRadius, angle60 * maxRadius, offset,
        minRadius * (-angle30), minRadius * angle60, offset,
        minRadius * angle30, minRadius * angle60, offset,

        minRadius * (-angle30), minRadius * angle60, offset,
        -angle30 * maxRadius, angle60 * maxRadius, offset,
        -maxRadius, 0.0, offset,

        -maxRadius, 0.0, offset,
        -minRadius, 0.0, offset,
        minRadius * (-angle30), minRadius * angle60, offset,

        -minRadius, 0.0, offset,
        -maxRadius, 0.0, offset,
        -angle30 * maxRadius, -angle60 * maxRadius, offset,

        -angle30 * maxRadius, -angle60 * maxRadius, offset,
        minRadius * (-angle30), minRadius * (-angle60), offset,
        -minRadius, 0.0, offset,

        minRadius * (-angle30), minRadius * (-angle60), offset,
        -angle30 * maxRadius, -angle60 * maxRadius, offset,
        angle30 * maxRadius, -angle60 * maxRadius, offset,

        angle30 * maxRadius, -angle60 * maxRadius, offset,
        minRadius * angle30, minRadius * (-angle60), offset,
        minRadius * (-angle30), minRadius * (-angle60), offset,

        minRadius * angle30, minRadius * (-angle60), offset,
        angle30 * maxRadius, -angle60 * maxRadius, offset,
        maxRadius, 0.0, offset,

        maxRadius, 0.0, offset,
        minRadius, 0.0, offset,
        minRadius * angle30, minRadius * (-angle60), offset,
    ]);

    const faces = new Float32Array([

    ])

    geometry.setAttribute('position', new BufferAttribute(vertices, 3));
    const material = new MeshBasicMaterial({ color: color });
    const mesh = new Mesh(geometry, material);

    mesh.tick = (delta) => {
        mesh.scale.x += speed * delta;
        mesh.scale.y += speed * delta;
        mesh.scale.x = mesh.scale.x % maxScale;
        mesh.scale.y = mesh.scale.y % maxScale;
    }
    return mesh;
}

export { createHitmarker };