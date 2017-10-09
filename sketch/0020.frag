/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;

vec2 tile(vec2 _st, float _zoom, float _offset){
  _st *= _zoom;
  return fract(_st - _offset/2.);
}

// @param [vec2]  _p ポジション
// @param [float] _q 変化量
// @param [float] _d 直径
// @param [float] _t 太さ
// @param [float] _a アンチエイリアスの太さ
vec3 circle(vec2 _p, float _q, float _d, float _t, float _a){
  float t = _t / 2.;
  vec3 c1 = vec3(_d - smoothstep((_d + t)*_q,    (1.0 + t)*_q+_a, distance(_p, vec2(0.0))));
  vec3 c2 = vec3(     smoothstep((_d - t)*_q-_a,  (1.0 - t)*_q,   distance(_p, vec2(0.0))));
  return vec3(c1*c2);
}


void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  //p = tile(p, 4., 6.) + vec2(-0.5);
  float tb = time+(volume*0.01);

  //vec3 color = vec3(1.0 - step(1.0, length(p)));
  float ts1 = sin(tb);
  vec3 c1_1 = vec3(1.0 - step(1.0*ts1, distance(p, vec2(0.0))));
  vec3 c1_2 = vec3(step(0.98*ts1, distance(p, vec2(0.0))));

  // 生成タイム
  float ts2 = abs(sin(0.02*volume)+0.55);
  // 太さ
  float b2 = 0.4;
  // アンチエイリアス領域
  float a2 = 0.005;

  vec3 c2_1 = vec3(1.0 - smoothstep((1.0 + b2/2.)*ts2,      (1.0 + b2/2.)*ts2+a2, distance(p, vec2(0.0))));
  vec3 c2_2 = vec3(      smoothstep((1.0 - b2/2.)*ts2-a2,   (1.0-b2/2.)*ts2,      distance(p, vec2(0.0))));

  vec3 test = circle(p,abs(sin(time*0.1)),1.0,0.4,0.005);

  vec3 color = (c1_1 * c1_2) + (c2_1 * c2_2) + test;

  gl_FragColor = vec4(color*1.2,1.0);
}
