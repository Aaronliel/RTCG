import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";

const particleVertexSource = `
uniform float count;

attribute float size;
attribute vec4 pColor;

varying vec4 vColor;

void main(){

    gl_Position= projectionMatrix * modelViewMatrix *vec4(position,1.0);
    gl_PointSize = size* count / gl_Position.w;
    vColor = pColor;
}
`

const particleFragmentSource = `
    uniform sampler2D sparkTexture;

    
    
    varying vec4 vColor;

    void main(){
        gl_FragColor = texture2D(sparkTexture, gl_PointCoord)* vColor ;
    }
`

class ParticleSystem {
    geometry;
    material;
    points;
    particles = [];
    camera
    constructor(_camera, _count = 10) {
        this.camera = _camera;
        const uniforms = {
            texture: {
                value: new THREE.TextureLoader().load("src/rtcg-app/Assets/spark.png")
            },
            count: {
                value: _count
            }
        };
        this.material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: particleVertexSource,
            fragmentShader: particleFragmentSource,
            blending: THREE.NormalBlending,
            depthTest: true,
            depthWrite: false,
            transparent: true,
            vertexColors: true
        });

        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute("position", new THREE.Float32BufferAttribute([], 3));
        this.geometry.setAttribute("size", new THREE.Float32BufferAttribute([], 1));
        this.geometry.setAttribute("pColor", new THREE.Float32BufferAttribute([], 3));

        this.points = new THREE.Points(this.geometry, this.material);

        this.addParticles(_count);
        this.updateGeometry();
    }


    addParticles(count = 10) {
        for (let i = 0; i < count; i++) {
            let grayscale = Math.random();
            grayscale = clamp(grayscale, 0, 0.5);
            this.particles.push({
                position: new THREE.Vector3(
                    ((Math.random() - 0.5) * 2 - 1) * 2,
                    ((Math.random() - 0.5) * 2 - 1) * 2,
                    ((Math.random() - 0.5) * 2 - 1) * 2,
                ),
                size: (Math.random() + 0.2) * 5,
                pColor: new THREE.Vector3(
                    Math.random(), grayscale, grayscale),
                alpha: 1.0,
                life: 0.01
            });

        }
        this.particles.tick = (delta) => {
            for (const particle of this.particles) {
                particle.life -= delta;
                let dst = particle.position.distanceTo(new THREE.Vector3(0, 0, 0));
                particle.position.multiplyScalar(1.25 + delta);

                if (dst >= 1 || particle.life <= 0) {
                    particle.position.random().sub(new THREE.Vector3(0.5, 0.5, 0)).multiplyScalar(0.5);
                    particle.position.clampLength(0.0, 0.2);
                    particle.life = Math.random() * 2;
                    console.log("tick");
                }
            }

            this.updateGeometry();
        }
    }



    updateParticles() {
        this.particles.sort((a, b) => {
            const d1 = this.camera.position.distanceTo(a.position);
            const d2 = this.camera.position.distanceTo(b.position);

            if (d1 > d2) {
                return -1;
            }
            if (d2 > d1) {
                return 1;
            }
            return 0;
        });
    }

    updateGeometry() {
        const positions = [];
        const sizes = [];
        const colors = []
        for (const particle of this.particles) {
            positions.push(particle.position.x, particle.position.y, particle.position.z);
            sizes.push(particle.size);
            colors.push(
                particle.pColor.x,
                particle.pColor.y,
                particle.pColor.z,
                1 / (10 * particle.position.distanceTo(new THREE.Vector3(0, 0, 0))));
        }
        this.geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        this.geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));
        this.geometry.setAttribute("pColor", new THREE.Float32BufferAttribute(colors, 4));


        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.size.needsUpdate = true;
        this.geometry.attributes.pColor.needsUpdate = true;
    }
}

function clamp(_in, _min, _max) {
    if (_in < _min) {
        return _min;
    }
    if (_in > _max) {
        return _max;
    }
    return _in;

}

export { ParticleSystem };