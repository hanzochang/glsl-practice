/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;


void main(void){
  vec2 p = gl_FragCoord.xy/ resolution / 0.25;
  //vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  p = vec2(p.x, p.y);

  //float c1 = atan(p.y, p.x);
  float c1 = acos(p.x);
  float c2 = cos(p.x);
  //c1 = sin(c1 * 150.0);

  float y1 = 1.0 - step(1.00, distance(p, vec2(0.0)));

  gl_FragColor = vec4(vec3(c1,0,0)+vec3(0,c2,0), 1.0);
}
