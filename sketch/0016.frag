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
  float offset = 0.10;
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  
  p = tile(p, floor(10.0 * abs(sin(time))), offset);

  float o = 1.0 - step(1.0 - 0.10, max(abs(p.x), abs(p.y)));
  vec3 color = vec3(o*0.2);

  gl_FragColor = vec4(color+vec3(0.2),1.0);
}
