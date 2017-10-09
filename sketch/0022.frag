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
  float t = _t / 2.;
  vec3 c1 = vec3(_d - smoothstep((_d + t)*_q,    (_d + t)*_q+_a, distance(_p, vec2(0.0))));
  vec3 c2 = vec3(     smoothstep((_d - t)*_q-_a,  (_d - t)*_q,   distance(_p, vec2(0.0))));
  return vec3(c1*c2);
}


void main(void){
  float qu = time+volume*0.012;
  float tile_size = time*0.000;
  //tile_size = abs(4.0*cos(time*1.));
  float thick_base = 1.0;
  vec3 fg = vec3(1.);

  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 q = tile(p, tile_size, 0.) + vec2(-0.5);

  vec3 c1 = circle(q, abs(sin(qu)), thick_base, 0.2, 0.005);
  vec3 c2 = circle(q, abs(cos(qu)), thick_base, 0.2, 0.005);
  vec3 c3 = circle(q, abs(cos(qu)), thick_base, 0.03, 0.005);
  vec3 c4 = circle(q, abs(cos(qu)), thick_base, 0.04, 0.005);

  vec3 cx1 = circle(p, abs(sin(qu)+.2), thick_base*1.0, 0.2, 0.005);
  vec3 cx2 = circle(p, abs(sin(qu/2.)+.2), thick_base*1.0, 0.2, 0.005);
  vec3 cx3 = circle(p, abs(cos(qu)+.2), thick_base*1.2, 0.2, 0.005);

  vec3 color = (cx1 + cx2 + cx3) * (c1 + c2 + c3 +c4 + fg);

  gl_FragColor = vec4(color*.1,1.0);
}
