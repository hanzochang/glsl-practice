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
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  float t = step(1., abs(0. + length(p)));

  gl_FragColor = vec4(vec3(t*0.4), 0.5);
}
