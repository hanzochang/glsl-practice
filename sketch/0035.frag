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
  float R = 10.0; // 座標レンジ係数 : 画面内に描画できる最大正方形は通常 1 それが何個作れるか
  p = p * R;
  vec3 color = vec3(0.0);
  float PI = 3.14;
  float PI_I = 1. / PI;

  float sn = p.y / distance(p, vec2(0.0)); // 中心点からのsin
  float cs = p.x / distance(p, vec2(0.0)); // 中心点からのcos
  float angle = atan(p.y, p.x); // 角度 arctangentとx,yで角度だす
  float r = sqrt((p.x*p.x)+(p.y*p.y));// 極座標r

  // r = aθ
  float ri = fract(angle / PI); // -pi < vec2 < pi で縁の描画をするが -1.0 < vec2 < 1.0にレンジ変更
  float le = fract(r / PI); // 0 < x < 3.14 を 0 < x < 1.0に正規化しfractで繰り返し
  float aaa = mix(0.0, 1.0, p.y);
  vec3 cx1 = vec3( step(ri, le) );
  //vec3 cx1 = mix( vec3(1.0 -  step(ri, le) ), vec3( step(ri, le) ), step(0., p.y));

  float ri2 = fract(angle / PI);
  float le2 = fract(r / PI + 0.04);
  vec3 cx2 = vec3( step(ri2, le2) );
  //vec3 cx2 = mix(vec3( 1.0 - step(ri2, le2) ),vec3( step(ri2, le2) ), step(0.0, p.y)) ;

  //vec3 cx2 = mix(vec3( step(ri, le) ),vec3( step(ri, le) ), step(0.0, p.y)) ;

  //color += 1.0 - (cx1 + (1.0 - cx2));
  //color += cx1;
  color += cx1;
  vec2 uv = (vec2(p.y, p.x) * .10 + .5);
  gl_FragColor = vec4(color*0.3, 1.0);// + texture2D(backbuffer, uv);
}
