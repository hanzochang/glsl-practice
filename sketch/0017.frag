/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;

vec2 tile(vec2 _st, float _zoom, float _offset){
  _st *= _zoom;
  return fract(_st - _offset/2.);
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  //vec3 color = vec3(1.0 - step(1.0, length(p)));
  vec3 color = vec3(1.0 - step(1.0, distance(p, vec2(0.0))));

  gl_FragColor = vec4(color*0.3,1.0);
}
