/*{ "audio": true }*/
precision mediump float;
uniform float time;
uniform float volume;
uniform vec2 resolution;
uniform vec2 mouse;
uniform sampler2D samples;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
  vec2  p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  float x_1 = step(0.1, p.x);
  float y_1 = step(0.1, p.y);
  vec2 st = step(vec2(0.2), p);
  vec4 color = vec4(x_1*0.2) + vec4(y_1*0.2);
  //vec3 color = vec3(y_1*0.4); // - vec3(y_1*0.4);

  gl_FragColor = vec4(color);
}
