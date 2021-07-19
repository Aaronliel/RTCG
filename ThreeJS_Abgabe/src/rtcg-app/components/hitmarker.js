import { BufferGeometry, BufferAttribute, BoxBufferGeometry, Mesh, MeshBasicMaterial, TextureLoader, FrontSide } from "https://unpkg.com/three@0.127.0/build/three.module.js";

function createHitmarker(minRadius = 0.05, maxRadius = 0.1, color = 0xff0000, speed = 2, maxScale = 2, offset = 0.01) {


    const geometry = new BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    const angle60 = Math.PI / 3;
    const angle30 = Math.PI / 6;
    offset = 0.01;
    const vertices = new Float32Array([
        minRadius, 0.0, offset,                                    //1
        maxRadius, 0.0, offset,                                          //2     //I
        angle30 * maxRadius, angle60 * maxRadius, offset,                                  //4

        angle30 * maxRadius, angle60 * maxRadius, offset,                                  //4
        minRadius * angle30, minRadius * angle60, offset,          //3     //II
        minRadius, 0.0, offset,                                    //1

        minRadius * angle30, minRadius * angle60, offset,          //3
        angle30 * maxRadius, angle60 * maxRadius, offset,                                  //4     //III
        -angle30 * maxRadius, angle60 * maxRadius, offset,                                 //6

        -angle30 * maxRadius, angle60 * maxRadius, offset,                                 //6
        minRadius * (-angle30), minRadius * angle60, offset,       //5     //IV
        minRadius * angle30, minRadius * angle60, offset,          //3

        minRadius * (-angle30), minRadius * angle60, offset,       //5                                                    
        -angle30 * maxRadius, angle60 * maxRadius, offset,                                 //6     //V
        -maxRadius, 0.0, offset,                                         //8

        -maxRadius, 0.0, offset,                                         //8
        -minRadius, 0.0, offset,                                   //7     //VI
        minRadius * (-angle30), minRadius * angle60, offset,       //5

        -minRadius, 0.0, offset,                                   //7
        -maxRadius, 0.0, offset,                                         //8     //VII
        -angle30 * maxRadius, -angle60 * maxRadius, offset,                                //10

        -angle30 * maxRadius, -angle60 * maxRadius, offset,                                //10
        minRadius * (-angle30), minRadius * (-angle60), offset,    //9     //VIII
        -minRadius, 0.0, offset,                                   //7

        minRadius * (-angle30), minRadius * (-angle60), offset,    //9
        -angle30 * maxRadius, -angle60 * maxRadius, offset,                                //10    //IX
        angle30 * maxRadius, -angle60 * maxRadius, offset,                                 //12    

        angle30 * maxRadius, -angle60 * maxRadius, offset,                                 //12
        minRadius * angle30, minRadius * (-angle60), offset,	    //11    //X
        minRadius * (-angle30), minRadius * (-angle60), offset,    //9                                 

        minRadius * angle30, minRadius * (-angle60), offset,       //11
        angle30 * maxRadius, -angle60 * maxRadius, offset,                                 //12    //XI
        maxRadius, 0.0, offset,                                          //2

        maxRadius, 0.0, offset,                                          //2
        minRadius, 0.0, offset,                                    //1     //XII
        minRadius * angle30, minRadius * (-angle60), offset,       //11
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