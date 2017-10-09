/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;

vec2 tile(vec2 _st, float _zoom, float _offset){
  _st *= _zoom;
  return fract(_st - _offset/2.);
}

// @param [vec2]  _p positon
// @param [float] _q
// @param [float] _d diamerter
// @param [float] _t thickness
// @param [float] _a anti_aliases_width
vec3 circle(vec2 _p, float _q, float _d, float _t, float _a){
  float t = _t / 4.;
  vec3 c1 = vec3(_d - smoothstep((_d)*_q+t,     (_d)*_q+t+_a, distance(_p, vec2(0.0))));
  vec3 c2 = vec3(     smoothstep((_d)*_q-t-_a,  (_d)*_q-t,   distance(_p, vec2(0.0))));
  return vec3(c1*c2);
}


void main(void){
  // quantity
  float qu = 3.14/2.*volume;
  float tile_size = time*0.000;
  float thick_base = 1.0;
  vec3 fg = vec3(1.);

  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 q = tile(p, tile_size, 0.) + vec2(-0.5);

  p = vec2(sqrt(p.x), sqrt(p.y));

  vec3 color = vec3(0.0);

  for(float i = 0.; i < 100.0; i++){
    vec3 cx = circle(vec2(p.x, p.y), 0.1*i, 1.0, 0.1, 0.004);
    color += cx;
  }

  gl_FragColor = vec4(color*.1,1.0);
}
