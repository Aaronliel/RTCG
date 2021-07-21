import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";

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
        uniform float rectangleInterval;

        varying float fresnelFactor;

        void main() { 
            vec2 st = gl_FragCoord.xy/screensize;
            vec3 darkColor = vec3(1,0.4,0.25);
            st.y = st.y + time * speed;                     //"Bewegung" der Pulse in Y-Richtung

            float mixValue = sin(st.y *5.0*rectangleInterval)/5.0 + sin(st.y *3.0*rectangleInterval)/3.0 + sin(st.y*rectangleInterval) * 0.5 +0.5;     //Sinus-Gradient als Pulse
            
            vec3 color = mix(objColor, darkColor,mixValue);
            vec3 f_color = mix(color, darkColor, vec3(clamp(fresnelFactor,0.0,1.0)));
            if(mixValue < 0.3){
                mixValue = 0.0;
            }
            gl_FragColor = vec4(color,mixValue);
            
        }
    `;
function createVerticalLaserMat(_color = new THREE.Vector3(0, 1, 1), _speed = 1, _interval = 20) {
    let elapsedTime = 0;


    const material = new THREE.ShaderMaterial({
        uniforms: {
            objColor: {
                value: _color
            },
            screensize: {
                value: new THREE.Vector2(window.innerWidth, window.innerHeight)
            },
            time: {
                type: "f",
                value: 5
            },
            speed: {
                type: "f",
                value: _speed
            },
            rectangleInterval: {
                type: "f",
                value: _interval
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
const hFragment_source = `
        uniform vec3 objColor;
        uniform vec2 screensize;
        uniform float time;
        uniform float speed;
        uniform float rectangleInterval;

        varying float fresnelFactor;

        void main() { 
            vec2 st = gl_FragCoord.xy/screensize;
            vec3 darkColor = vec3(1,0.4,0.25);
            st.x = st.x + time * speed;                     //"Bewegung" der Pulse in X-Richtung
            // float rectangleInterval = 20.0;
            
            float mixValue = sin(st.x *5.0*rectangleInterval)/5.0 + sin(st.x *3.0*rectangleInterval)/3.0 + sin(st.x*rectangleInterval) * 0.5 +0.5;     //Sinus-Gradient als Pulse

            vec3 color = mix(objColor, darkColor,mixValue);
            vec3 f_color = mix(color, darkColor, vec3(clamp(fresnelFactor,0.0,1.0)));
            if(mixValue < 0.3){
                mixValue = 0.0;
            }
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
        uniform float rectangleInterval;

        varying vec4 pos;

        void main() {   
            vec2 st = gl_FragCoord.xy/screensize;         
            vec3 darkColor = vec3(1,0.4,0.25);
            float x = abs(st.x);                                    //
            x = x* time * speed;

            float mixValue = sin(x *5.0*rectangleInterval)/5.0 + sin(x*3.0*rectangleInterval)/3.0 + sin(x*rectangleInterval) * 0.5 +0.5;

            vec3 color = mix(objColor, darkColor,mixValue);

            gl_FragColor = vec4(color,mixValue);
            
        }
    `;

function createHorizontalLaserMat(_color = new THREE.Vector3(0, 1, 1), _speed = 1, _interval = 20) {
    let elapsedTime = 0;


    const material = new THREE.ShaderMaterial({
        uniforms: {
            objColor: {
                value: _color
            },
            screensize: {
                value: new THREE.Vector2(window.innerWidth, window.innerHeight)
            },
            time: {
                value: 5
            },
            speed: {
                value: _speed
            },
            rectangleInterval: {
                value: _interval
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
function createRadialLaserMat(_color = new THREE.Vector3(0, 1, 1), _speed = 1, _interval = 20) {
    let elapsedTime = 0;
    const material = new THREE.ShaderMaterial({
        uniforms: {
            objColor: {
                value: _color
            },
            screensize: {
                value: new THREE.Vector2(window.innerWidth, window.innerHeight)
            },
            time: {
                value: 5
            },
            speed: {
                value: _speed
            },
            rectangleInterval: {
                value: _interval
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

function createTransparentMat(_color = new THREE.Vector3(0, 1, 1), _alpha = 1) {
    const material = new THREE.ShaderMaterial({
        uniforms: {
            objColor: {
                value: _color
            },
            screensize: {
                value: new THREE.Vector2(window.innerWidth, window.innerHeight)
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