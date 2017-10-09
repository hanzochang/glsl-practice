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
  float tb = time+(volume*0.01);

  //vec3 color = vec3(1.0 - step(1.0, length(p)));
  float ts1 = sin(tb);
  vec3 c1_1 = vec3(1.0 - step(1.0*ts1, distance(p, vec2(0.0))));
  vec3 c1_2 = vec3(step(0.98*ts1, distance(p, vec2(0.0))));

  // 生成タイム
  float ts2 = sin(2.*time);
  // 太さ
  float b2 = 0.1*volume;
  // アンチエイリアス領域
  float a2 = 0.005;
  vec3 c2_1 = vec3(1.0 - smoothstep((1.0 + b2)*ts2, (1.0 + b2)*ts2+a2, distance(p, vec2(0.0))));
  vec3 c2_2 = vec3(      smoothstep((1.0)*ts2-a2,   (1.0)*ts2,         distance(p, vec2(0.0))));

  vec3 color = (c2_1 * c2_2);

  gl_FragColor = vec4(color*1.0,1.0);
}
