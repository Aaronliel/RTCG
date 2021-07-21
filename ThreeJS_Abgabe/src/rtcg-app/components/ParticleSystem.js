import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";

class ParticleSystem {
    material;
    constructor() {
        const uniforms = {
            texture: {

            },
            count: {

            }
        };

        this.material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: ,
            fragmentShader: ,
        })
    }
}