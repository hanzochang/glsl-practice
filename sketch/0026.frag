/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;


void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  //float c = step(0.95, distance(p, vec2(0.0))) - step(1.0, distance(p, vec2(0.0)));
  float u = sin((atan(p.y, p.x) + time * 0.5) * 6.0);
  float c = 0.01 / abs(u - length(p));

  gl_FragColor = vec4(vec3(c), 1.0);
}
