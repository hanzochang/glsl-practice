/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;


void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  p = vec2(p.x+cos(time/10.), p.y);

  float c1 = atan(p.y, p.x);
  c1 = sin(c1 * 50.0);

  float c2 = atan(p.y, p.x+0.3);
  c2 = sin(c2 * 150.0);

  float y1 = 1.0 - step(0.25, distance(p, vec2(0.0)));
  float y2 = step(0.25, distance(vec2(p.x, p.y), vec2(0.0)));

  //gl_FragColor = vec4(vec3(c1-y2+y3)*0.3, 1.0);
  gl_FragColor = vec4(vec3(c1*y1+c2*y2)*0.3, 1.0);
}
