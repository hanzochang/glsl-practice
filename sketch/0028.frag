/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;

vec2 tile(vec2 _st, float _zoom, float _offset){
  _st *= _zoom;
  return fract(_st - _offset/2.);
}

vec3 hline(vec2 _p, float _t, float _r){
  vec3 c = vec3(step(_r*_p.x, _p.y)) * vec3((1.0 - step(_r*_p.x+_t, _p.y) ));
  return vec3(c);
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  //p = tile(p, 1.0, .0);

  vec3 color = vec3(0.0);
  for(float i = -1.; i <= 1. ; i ++){
    vec3 c1 = hline(p, 0.004, i);
    color += c1;
  }
  //vec3 c1 = hline(p, 0.01, sin(p.x));
  //vec3 color = c1;
  //gl_FragColor = vec4(vec3(c1-y2+y3)*0.3, 1.0);
  gl_FragColor = vec4(color*0.3, 1.0);
}
