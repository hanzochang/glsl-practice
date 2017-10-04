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
  vec2 st = gl_FragCoord.xy / resolution;
  float y = st.x;

  float mo = 10000.;
  float da = abs(sin(time/2.));
  float aaa = smoothstep(st.y-.002-.5, st.y-.5, st.x) - smoothstep(st.y-.5, st.y+.002-.5, st.x);
  float bbb = step(.5-.001, st.y) - step(.5+.001, st.y);
  vec3 color1 = vec3(aaa);
  vec3 color2 = vec3(bbb);

  gl_FragColor = vec4(color1+color2,1.0);

}
