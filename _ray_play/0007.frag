/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;
uniform sampler2D backbuffer;

const float PI = 3.14;
const float PI_I = 1. / PI;

// 半径差分
vec3 spiral(vec2 p, float a_diff, float r_diff, float g){
  float sn = p.y / distance(p, vec2(0.0)); // 中心点からのsin
  float cs = p.x / distance(p, vec2(0.0)); // 中心点からのcos
  float angle = atan(p.y, p.x); // 角度 arctangentとx,yで角度だす
  float r = sqrt((p.x*p.x)+(p.y*p.y)) - time;// 極座標r

  // r = aθ
  float ri = fract(angle/ PI + a_diff); // -pi < vec2 < pi で縁の描画をするが -1.0 < vec2 < 1.0にレンジ変更
  float ri_a = fract(angle/PI + a_diff); // -pi < vec2 < pi で縁の描画をするが -1.0 < vec2 < 1.0にレンジ変更
  float le = fract(r / PI + r_diff); // 0 < x < 3.14 を 0 < x < 1.0に正規化しfractで繰り返し

  //return vec3( step(ri, le) );

  float start = g * mix(0.0, 1.0, 1.0 - step(0., g));
  float end   = g * mix(1.0, 0.0, 1.0 - step(0., g));
  return vec3( smoothstep(ri-start, ri+end, le) );
}

vec3 spiral_line(vec2 p, float _ta, float _tb){
  vec3 cx1 = spiral(p, _ta, -_tb/2., .009);
  vec3 cx2 = spiral(p, _ta,  _tb/2., .009);
  return 1.0 - (cx1 + (1.0 - cx2));
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  float R = 2.0; // 座標レンジ係数 : 画面内に描画できる最大正方形は通常 1 それが何個作れるか
  p = p * R ;// volume*0.008;
  p = p;

  vec3 color = vec3(0.0);
  for(float i = 1.0 ; i <10.; i++){
    color += spiral_line(p, 0.041*i*3.14, 0.005*i*10.0*abs(sin(time)*volume*0.004));
  }
  color *= spiral_line(p, 0.1*3.14, 10.*10.0*abs(sin(time)*volume*0.001));
  //color = mix(color, vec3(1.0) - color, 1.0 - step(10.0,volume));

  gl_FragColor = vec4(color, 1.0);// + texture2D(backbuffer, uv);
}
