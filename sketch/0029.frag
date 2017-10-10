/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;


void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  p = vec2(p.x, p.y);

  float c = atan(p.x, p.y);
  float c1 = sin(c * 200.0 + 100.0 * fract(p.y*1.0));
  //float c2 = sin(c * 000.0*volume + 100.0 * fract(p.y*.03*volume));
  float c2 = 0.0;

  float y2 = step(0.25, distance(vec2(p.x, p.y), vec2(0.0)));

  //gl_FragColor = vec4(vec3(c1-y2+y3)*0.3, 1.0);
  gl_FragColor = vec4(vec3((c2+c1)*y2)*0.3, 1.0);
}
