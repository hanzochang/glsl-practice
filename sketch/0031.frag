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

vec3 smtp(vec2 _p, float _t, float _a){
  return vec3( smoothstep(_p.x - _t, _p.x, _a) - smoothstep(_p.x, _p.x+_t, _a));
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  //vec2 p = gl_FragCoord.xy;
  //p = p * 4.25;

  vec3 color = vec3(0.0);
  //gl_FragColor = vec4(vec3(c1-y2+y3)*0.3, 1.0);

  //for(float i = -10.; i <= 10. ; i ++){
  //  vec3 c1 = hline(p, 0.004, i);
    //vec3 c1 = smtp(p, 0.02, sqrt((atan(p.y, p.x) - p.y*p.y)*i));
    //color += c1;
  //}

  float a = 0.4;
  float sn = a * p.y / distance(p, vec2(0.0)); // 中心点からのsin
  float cs = a * p.x / distance(p, vec2(0.0)); // 中心点からのcos
  float kd = atan(p.y, p.x); // 角度
  //float kd = atan(p.y/p.x); // 角度
  //float kd = asin(sn); // 角度
  //float kd = acos(cs); // 角度
  //vec3 cx1 = vec3( step(kd*cs, p.y) - step(kd*cs+0.07, p.y) );
  //vec3 cx2 = vec3(step(kd*cs, kd*sn));
  vec3 cx2 = vec3(step(a*kd, sqrt((p.x*p.x)+(p.y*p.y))));
  //bvec3 aa = equal(vec3(0.0), vec3(0.0));
  color += cx2;
  //cx = cos(cx * 1.2);
  //vec3 a1 = vec3(p.x*cos(10.));
  gl_FragColor = vec4(color*0.3, 1.0);
}
