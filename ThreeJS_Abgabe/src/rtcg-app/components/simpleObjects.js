import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";

function createSphere(_radius = 1, _segments = 5, _color = 0xffffff) {
    const geometry = new THREE.SphereBufferGeometry(_radius, _segments._segments);
    const pMaterial = new THREE.MeshPhongMaterial({ color: _color });
    const sphere = new THREE.Mesh(geometry, pMaterial);
    let speed = 1;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.material.depthTest = true;

    return sphere;
}

function createCube(x = 2, y = 2, z = 2, _color = 0x0f0f0f) {
    const geometry = new THREE.BoxBufferGeometry(x, y, z);


    const pMaterial = new THREE.MeshPhongMaterial({ color: _color });
    const cube = new THREE.Mesh(geometry, pMaterial);
    let speed = 1;
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.material.depthTest = true;

    cube.tick = (delta) => {
        cube.rotation.y += 0.5 * delta * speed;
    }
    cube.update = (delta, input) => {                               //moving the ocject by WASD/QE => input.x (W/-S) as forward, input.y (A/D) sideways, input.z as Y-Rotation
        cube.rotation.y -= input.z * delta;
        var forward = new THREE.Vector3(0, 0, 1 * input.x * delta);
        var right = new THREE.Vector3(-1 * input.y * delta, 0, 0);

        forward.applyEuler(cube.rotation);
        right.applyEuler(cube.rotation);
        cube.position.add(forward.add(right));
    }

    return cube;
}


function createPlane(x, y, _color) {
    const geometry = new THREE.PlaneGeometry(x, y);
    const material = new THREE.MeshPhysicalMaterial({ color: _color });

    const plane = new THREE.Mesh(geometry, material);
    plane.castShadow = true;
    plane.receiveShadow = true;
    return plane;
}


function createHitmarker(minRadius = 0.05, maxRadius = 0.1, color = 0xff0000, speed = 2, maxScale = 2, offset = 0.01) {


    const geometry = new THREE.BufferGeometry();
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

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshPhongMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);

    material.hide = (bool) => {

    }

    return mesh;
}



function createRay(_radius = 0.01) {


    const geometry = new THREE.BufferGeometry();

    const angle60 = Math.PI / 3;
    const angle30 = Math.PI / 6;
    const offset = 1.0;
    const vertices = new Float32Array([
        _radius, 0.0, offset,
        _radius, 0.0, 0.0,
        angle30 * _radius, angle60 * _radius, 0.0,

        _radius, 0.0, offset,
        angle30 * _radius, angle60 * _radius, 0.0,
        angle30 * _radius, angle60 * _radius, offset,


        angle30 * _radius, angle60 * _radius, offset,
        angle30 * _radius, angle60 * _radius, 0.0,
        -angle30 * _radius, angle60 * _radius, 0.0,

        angle30 * _radius, angle60 * _radius, offset,
        -angle30 * _radius, angle60 * _radius, 0.0,
        -angle30 * _radius, angle60 * _radius, offset,

        -angle30 * _radius, angle60 * _radius, offset,
        -angle30 * _radius, angle60 * _radius, 0.0,
        -_radius, 0.0, 0.0,

        -_radius, 0.0, offset,
        -angle30 * _radius, angle60 * _radius, offset,
        -_radius, 0.0, 0.0,

        _radius, 0.0, offset,
        angle30 * _radius, -angle60 * _radius, 0.0,
        _radius, 0.0, 0.0,

        angle30 * _radius, -angle60 * _radius, offset,
        angle30 * _radius, -angle60 * _radius, 0.0,
        _radius, 0.0, offset,

        angle30 * _radius, -angle60 * _radius, 0.0,
        angle30 * _radius, -angle60 * _radius, offset,
        -angle30 * _radius, -angle60 * _radius, 0.0,

        -angle30 * _radius, -angle60 * _radius, offset,
        -angle30 * _radius, -angle60 * _radius, 0.0,
        angle30 * _radius, -angle60 * _radius, offset,

        -angle30 * _radius, -angle60 * _radius, offset,
        -_radius, 0.0, 0.0,
        -angle30 * _radius, -angle60 * _radius, 0.0,

        -_radius, 0.0, offset,
        -_radius, 0.0, 0.0,
        -angle30 * _radius, -angle60 * _radius, offset,
    ]);

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.tick = (delta) => {
        mesh.rotation.z += 20 * delta;
    }
    return mesh;
}

export { createRay, createCube, createPlane, createHitmarker, createSphere };