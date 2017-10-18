/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;

const float PI = 3.14;
const float PI_I = 1. / PI;

const float sphereSize = 1.0; // 球の半径

float distanceFunc(vec2 p) {
    return length(p) - sphereSize;
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec3 color = vec3(distanceFunc(p));

  gl_FragColor = vec4(color*0.3, 1.0);// + texture2D(backbuffer, uv);
}
