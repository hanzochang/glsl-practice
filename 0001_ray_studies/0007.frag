/*{ "audio": true }*/
precision mediump float;
uniform float time;
uniform vec2  mouse;
uniform vec2  resolution;
uniform float volume;

const float PI = 3.14159265;

const float sphereSize = 1.0;
const vec3 lightDir = vec3(0.45, 0.7, 0.1);

vec3 trans(vec3 p){
    return vec3(
      mod(p.x, 1.0) - 1.0,
      mod(p.y, 29.0) - 1.0,
      mod(p.z, 1.0) - 1.0
    );
}

float distanceFunc(vec3 p){
    vec3 q = abs(trans(p));
    return length(max(vec3(q.x, q.y, q.z) - vec3(0.8-0.006*volume, 0.001*volume+0.1, 0.99), 0.0));
}

vec3 getNormal(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        distanceFunc(p + vec3(  d, 0.0, 0.0)) - distanceFunc(p + vec3( -d, 0.0, 0.0)),
        distanceFunc(p + vec3(0.0,   d, 0.0)) - distanceFunc(p + vec3(0.0,  -d, 0.0)),
        distanceFunc(p + vec3(0.0, 0.0,   d)) - distanceFunc(p + vec3(0.0, 0.0,  -d))
    ));
}

float random2 (float x) {
    return fract(sin(x)*1.952);
}


void main(void){
    // fragment position
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3  cPos = vec3(2.78, 2.0, 2.0-(2.0*time));
    float angle = 90.0;
    float fov = angle * .5 * PI / 180.0;

    // ray
    vec3 ray = normalize(vec3(sin(fov) * p.x, sin(fov) * p.y, -cos(fov)));

    // marching loop
    float distance = 0.0;
    float rLen = 0.0;
    vec3  rPos = cPos;
    float mage = 0.0;
    for(int i = 0; i < 60; i++){
        distance = distanceFunc(rPos);
        rLen += distance;
        mage += sin(rLen+time)*0.2;
        rPos = cPos + ray * rLen + vec3(0.00*mage, mage*0.003*volume, 0.0);
    }

    // hit check
    if(abs(distance) < 0.001){
        vec3 normal = getNormal(rPos);
        float diff = clamp(dot(lightDir, normal), 0.1, 1.0);
        gl_FragColor = vec4(diff*1.0+0.1*sin(time), diff*1.0*volume*0.02, diff*1.0+0.1, 1.0);
    }else{
        gl_FragColor = vec4(vec3(0.0), 1.0);
    }
}
