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
  float tile_size = volume*6.0;

  float thick_base = .2;
  vec3 fg = vec3(1.);

  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 q = tile(p, tile_size, 0.) + vec2(-0.5);

  p = vec2(p.x, p.y);

  vec3 color = vec3(0.0);
  float vol = volume *1.0;
  float t = time*.50;

  for(float i = 0.; i < 100.0; i++){
    vec3 cx = circle(vec2(p.x+(i*0.06*sin(t)), p.y+(i*0.06*cos(t))), pow(0.07*i, 3.0), 1.0, 0.0001*vol, 0.004);
    //color += vec3(0.0, cx.y,0.001) + vec3(cx.x*0.7*vol+0.0005, 0.0, 0.0) + vec3(0.0, 0.0 ,cx.z*0.03);
    color += vec3(cx.x+0.01, cx.y+0.01, cx.z+0.01);
  }

  vec3 c1 = vec3(1.0) - circle(q, abs(sin(time)), thick_base, 0.2, 0.005);
  vec3 c2 = vec3(circle(q, abs(sin(time*2.0)), thick_base, 0.1, 0.005));

  //gl_FragColor = vec4(color-(c1),1.0);
  gl_FragColor = vec4(color-(c1),1.0);
}
