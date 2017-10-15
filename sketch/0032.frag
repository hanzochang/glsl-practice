/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;
uniform sampler2D backbuffer;

vec2 tile(vec2 _st, float _zoom, float _offset){
  _st *= _zoom;
  return fract(_st - _offset/2.);
}

vec3 hline(vec2 _p, float _t, float _r){
  vec3 c = vec3(step(_r*_p.x, _p.y)) * vec3((1.0 - step(_r*_p.x+_t, _p.y) ));
  return vec3(c);
}

vec3 smtp(vec2 _p, float _t, float _a){
  return vec3( smoothstep(_p.x - _t, _p.x, _a) - smoothstep(_p.x, _p.x+_t, _a));
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec3 color = vec3(0.0);
  //p = tile(p, .5, 0.) + vec2(-0.5);
  float a = 0.318;

  float sn = p.y / distance(p, vec2(0.0)); // 中心点からのsin
  float cs = p.x / distance(p, vec2(0.0)); // 中心点からのcos
  float kd = atan(p.y, p.x); // 角度 arctangentとx,yで角度だす
  float r = sqrt((p.x*p.x)+(p.y*p.y)); // 極座標r

  // mix(step(1.0, a*kd)); WIPエルミート補完でエイリアス幅設定
  vec3 cx3 = vec3( step(fract(kd/3.14), fract(r/a)) );
  // 線にする前 vec3 cx3 = vec3( step(fract(kd/3.14), fract(r/a)) * (1.0 - step(fract(kd/3.14), fract(r/(a)))) );
  //bvec3 aa = equal(vec3(0.0), vec3(0.0));
  color += cx3;// + cx3;
  //p = rotate(p, 2. *time);
  vec2 uv = (vec2(p.y, p.x) * .10 + .5);
  gl_FragColor = vec4(color*0.3, 1.0);// + texture2D(backbuffer, uv);
}
