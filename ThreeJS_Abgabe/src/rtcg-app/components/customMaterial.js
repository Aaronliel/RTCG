import { BufferGeometry, ShaderMaterial, Vector3, Vector2, BufferAttribute, BoxBufferGeometry, Mesh, MeshBasicMaterial, TextureLoader, FrontSide } from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { WebGLShader } from "https://unpkg.com/three@0.127.0/src/renderers/webgl/WebGLShader.js";
const vVertex_source = `
    uniform float time;

    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
    `;
const vFragment_source = `
        uniform vec3 objColor;
        uniform vec2 screensize;
        uniform float time;
        uniform float speed;

        void main() { 
            vec2 st = gl_FragCoord.xy/screensize;
            vec3 darkColor = vec3(0,0,0);
            st.y = st.y + time * speed;                     //"Bewegung" der Pulse in Y-Richtung

            float mixValue = sin(st.y *50.0) * 0.5 +0.5;    //Sinus-Gradient als Pulse
            
            vec3 color = mix(objColor, darkColor,mixValue);

            gl_FragColor = vec4(color,mixValue);
            
        }
    `;
const hVertex_source = `
    uniform float time;

    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
    `;
const hFragment_source = `
        uniform vec3 objColor;
        uniform vec2 screensize;
        uniform float time;
        uniform float speed;

        void main() { 
            vec2 st = gl_FragCoord.xy/screensize;
            vec3 darkColor = vec3(0,0,0);
            st.x = st.x + time * speed;

            float mixValue = sin(st.x *50.0) * 0.5 +0.5;    //Sinus-Gradient als Pulse

            vec3 color = mix(objColor, darkColor,mixValue);

            gl_FragColor = vec4(color,mixValue);
            
        }
    `;
const rVertex_source = `
    uniform float time;
    varying vec4 pos;

    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        pos = gl_Position;
    }
    `;
const rFragment_source = `
        uniform vec3 objColor;
        uniform vec2 screensize;
        uniform float time;
        uniform float speed;

        varying vec4 pos;

        void main() { 
            vec2 st = gl_FragCoord.xy/screensize;
            st.x = screensize.x/screensize.y;
            st = st * time * speed;
            vec3 darkColor = vec3(0,0,0);
            float mixValue = sqrt(pow(st.x-pos.x,2.)+pow(st.y +pos.y,2.));
            mixValue = sin(-mixValue);

            vec3 color = mix(objColor, darkColor,mixValue);

            gl_FragColor = vec4(color,1.0);
            
        }
    `;
function createVerticalLaserMat(renderer, _color = new Vector3(0, 1, 1), _speed = 1) {
    let colorOnInit = _color;
    const gl = renderer.getContext();
    let luminanceVal = 1;
    let elapsedTime = 0;


    const material = new ShaderMaterial({
        uniforms: {
            objColor: {
                value: _color
            },
            screensize: {
                value: new Vector2(window.innerWidth, window.innerHeight)
            },
            time: {
                value: 5
            },
            speed: {
                value: _speed
            }
        },
        vertexShader: vVertex_source,
        fragmentShader: vFragment_source,
    });
    material.tick = (delta) => {
        elapsedTime += delta;
        material.uniforms.time.value = elapsedTime;
    }
    return material;
}
function createHorizontalLaserMat(renderer, _color = new Vector3(0, 1, 1), _speed = 1) {
    let colorOnInit = _color;
    const gl = renderer.getContext();
    let luminanceVal = 1;
    let elapsedTime = 0;


    const material = new ShaderMaterial({
        uniforms: {
            objColor: {
                value: _color
            },
            screensize: {
                value: new Vector2(window.innerWidth, window.innerHeight)
            },
            time: {
                value: 5
            },
            speed: {
                value: _speed
            }
        },
        vertexShader: hVertex_source,
        fragmentShader: hFragment_source,
    });
    material.tick = (delta) => {
        elapsedTime += delta;
        material.uniforms.time.value = elapsedTime;
    }
    return material;
}
function createRadialLaserMat(renderer, _color = new Vector3(0, 1, 1), _speed = 1) {
    let colorOnInit = _color;
    const gl = renderer.getContext();
    let luminanceVal = 1;
    let elapsedTime = 0;


    const material = new ShaderMaterial({
        uniforms: {
            objColor: {
                value: _color
            },
            screensize: {
                value: new Vector2(window.innerWidth, window.innerHeight)
            },
            time: {
                value: 5
            },
            speed: {
                value: _speed
            }
        },
        vertexShader: rVertex_source,
        fragmentShader: rFragment_source,
    });
    material.tick = (delta) => {
        elapsedTime += delta;
        material.uniforms.time.value = elapsedTime;
    }
    return material;
}

export { createHorizontalLaserMat, createVerticalLaserMat, createRadialLaserMat };