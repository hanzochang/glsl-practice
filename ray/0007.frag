/*{ "audio": true }*/
precision mediump float;
uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;
uniform float volume;

const float PI = 3.14159265;
const float angle = 100.0;
const float fov = angle * 0.2 * PI / 180.0;

vec3  cPos = vec3(0.0, 0.0, 2.0);
const float sphereSize = 1.0;
const vec3 lightDir = vec3(0.2, 0.2, 0.3);

vec3 trans(vec3 p){
    return mod(p, 2.0) - 1.0;
}

float distanceFunc(vec3 p){
    vec3 q = abs(trans(p));
    return length(max(q - vec3(0.05, 0.9, 0.5), 0.0));
}

//float distanceFunc(vec3 p){
//    return length(trans(p)) - sphereSize;
//}

vec3 getNormal(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        distanceFunc(p + vec3(  d, 0.0, 0.0)) - distanceFunc(p + vec3( -d, 0.0, 0.0)),
        distanceFunc(p + vec3(0.0,   d, 0.0)) - distanceFunc(p + vec3(0.0,  -d, 0.0)),
        distanceFunc(p + vec3(0.0, 0.0,   d)) - distanceFunc(p + vec3(0.0, 0.0,  -d))
    ));
}

void main(void){
    // fragment position
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);


    // ray
    vec3 ray = normalize(vec3(sin(fov) * p.x, sin(fov) * p.y, -cos(fov)));

    cPos = vec3(cPos.x, cPos.y+time, cPos.z +time);
    // marching loop
    float distance = 0.0;
    float rLen = 0.0;
    vec3  rPos = cPos;
    for(int i = 0; i < 64; i++){
        distance = distanceFunc(rPos);
        rLen += distance;
        rPos = cPos + ray * rLen;
    }


    // hit check
    if(abs(distance) < 0.001){
        vec3 normal = getNormal(rPos);
        float diff = clamp(dot(lightDir, normal)+0.5, 0.1, 1.0);
        gl_FragColor = vec4(vec3(diff), 1.0);
    }else{
        gl_FragColor = vec4(vec3(0.0), 1.0);
    }
}
