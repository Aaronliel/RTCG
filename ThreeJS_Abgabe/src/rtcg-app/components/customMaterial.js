import { BufferGeometry, ShaderMaterial, Vector3, Vector2, BufferAttribute, BoxBufferGeometry, Mesh, MeshBasicMaterial, TextureLoader, FrontSide } from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { WebGLShader } from "https://unpkg.com/three@0.127.0/src/renderers/webgl/WebGLShader.js";
function createCustomMat(renderer, _color = new Vector3(0, 1, 1), _alpha = 0) {
    let colorOnInit = _color;
    const gl = renderer.getContext();
    let luminanceVal = 1;
    let elapsedTime = 0;
    const vertex_source = `
        varying vec3 gradient;
        void main(){ 
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;
    const fragment_source = `
        uniform vec3 objColor;
        uniform float alpha;
        uniform float luminance;
        uniform vec2 interval;
        uniform float time;

        void main() { 
            vec2 st = gl_FragCoord.xy/interval;
            vec3 darkColor = vec3(0,0,0);
            float mixValue = sin(st.y *50.0) * 0.5 +0.5;
            vec3 color = mix(objColor, darkColor,mixValue);

            gl_FragColor = vec4(color,alpha);
        }
    `;
    const material = new ShaderMaterial({
        uniforms: {
            objColor: {
                value: _color
            },
            alpha: {
                value: _alpha
            },
            luminance: {
                value: luminanceVal
            },
            interval: {
                value: new Vector2(1920, 1080)
            },
            time: {
                value: 5
            }
        },
        vertexShader: vertex_source,
        fragmentShader: fragment_source,
    });
    material.tick = (delta) => {
        elapsedTime += delta * 5;
        const v = Math.sin(elapsedTime * 6) * 0.5 + 0.5;
        const beamColor = new Vector3(colorOnInit.x * v, colorOnInit.y * v, colorOnInit.z * v);
        // material.uniforms.objColor.value = elapsedTime;
    }
    return material;
}

export { createCustomMat };