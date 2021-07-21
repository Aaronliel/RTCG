import { BufferGeometry, ShaderMaterial, RawShaderMaterial, Vector3, Vector2, BufferAttribute, BoxBufferGeometry, Mesh, MeshBasicMaterial, TextureLoader, FrontSide } from "https://unpkg.com/three@0.127.0/build/three.module.js";

const beamVertex_source = `
    uniform float time;

    varying float fresnelFactor;

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
    
        vec3 I = worldPosition.xyz - cameraPosition;
    
        fresnelFactor = 10. + 1.5 * pow( 1.0 + dot( normalize( I ), worldNormal ),5. );
    
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
    `;

const vFragment_source = `
        uniform vec3 objColor;
        uniform vec2 screensize;
        uniform float time;
        uniform float speed;

        varying float fresnelFactor;

        void main() { 
            vec2 st = gl_FragCoord.xy/screensize;
            vec3 darkColor = vec3(1,0.4,0.25);
            st.y = st.y + time * speed;                     //"Bewegung" der Pulse in Y-Richtung

            float mixValue = sin(st.y *5. + st.y*2.5 + st.y*1.25) * 0.5 +0.5;    //Sinus-Gradient als Pulse
            
            vec3 color = mix(objColor, darkColor,mixValue);
            vec3 f_color = mix(color, darkColor, vec3(clamp(fresnelFactor,0.0,1.0)));
            
            gl_FragColor = vec4(color,mixValue);
            
        }
    `;

const hFragment_source = `
        uniform vec3 objColor;
        uniform vec2 screensize;
        uniform float time;
        uniform float speed;

        varying float fresnelFactor;

        void main() { 
            vec2 st = gl_FragCoord.xy/screensize;
            vec3 darkColor = vec3(1,0.4,0.25);
            st.x = st.x + time * speed;                     //"Bewegung" der Pulse in X-Richtung

            float mixValue = sin(st.x *5.0 + st.x *2.5 + st.x * 1.25) * 0.5 +0.5;     //Sinus-Gradient als Pulse

            vec3 color = mix(objColor, darkColor,mixValue);
            vec3 f_color = mix(color, darkColor, vec3(clamp(fresnelFactor,0.0,1.0)));

            gl_FragColor = vec4(color,mixValue);
            
        }
    `;

const transparentFragment_source = `
uniform vec3 objColor;
uniform vec2 screensize;
uniform float alpha;

varying float fresnelFactor;

void main() { 
    vec2 st = gl_FragCoord.xy/screensize;
    vec3 darkColor = vec3(0.0,0.5,0.2);

    vec3 f_color = objColor * vec3(clamp(fresnelFactor,0.0,1.0));

    gl_FragColor = vec4(f_color,alpha);
    
}
`;

const rVertex_source = `
    uniform float time;
    varying vec4 pos;

    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        pos = modelMatrix * vec4(position,1.0);
    }
    `;
const rFragment_source = `
        uniform vec3 objColor;
        uniform vec2 screensize;
        uniform float time;
        uniform float speed;

        varying vec4 pos;

        void main() {            
            vec3 darkColor = vec3(1,0.4,0.25);
            
            float mixValue = sin(time * speed * 5.)* 0.5 + 0.5;

            vec3 color = mix(objColor, darkColor,mixValue);

            gl_FragColor = vec4(color,mixValue);
            
        }
    `;
function createVerticalLaserMat(_color = new Vector3(0, 1, 1), _speed = 1) {
    let colorOnInit = _color;
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
        vertexShader: beamVertex_source,
        fragmentShader: vFragment_source,
    });
    material.tick = (delta) => {
        elapsedTime += delta;
        material.uniforms.time.value = elapsedTime;
    }

    return material;
}
function createHorizontalLaserMat(_color = new Vector3(0, 1, 1), _speed = 1) {
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
        vertexShader: beamVertex_source,
        fragmentShader: hFragment_source,
    });
    material.tick = (delta) => {
        elapsedTime += delta;
        material.uniforms.time.value = elapsedTime;
    }
    return material;
}
function createRadialLaserMat(_color = new Vector3(0, 1, 1), _speed = 1) {
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

function createTransparentMat(_color = new Vector3(0, 1, 1), _alpha = 1) {
    const material = new ShaderMaterial({
        uniforms: {
            objColor: {
                value: _color
            },
            screensize: {
                value: new Vector2(window.innerWidth, window.innerHeight)
            },
            alpha: {
                value: _alpha
            }
        },
        vertexShader: beamVertex_source,
        fragmentShader: transparentFragment_source,
    });

    return material;
}


export { createHorizontalLaserMat, createVerticalLaserMat, createRadialLaserMat, createTransparentMat };