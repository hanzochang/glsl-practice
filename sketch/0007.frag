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
  float unit = 100.0;
  float unit1_1 = resolution.x/2. + unit/2.;
  float unit1_2 = resolution.y/2. + unit/2.;
  float unit2_1 = resolution.x/2. - unit/2.;
  float unit2_2 = resolution.y/2. - unit/2.;
  vec2 st = gl_FragCoord.xy / resolution;
  vec2 px = gl_FragCoord.xy;

  vec3 color1 = vec3(step(unit1_1, px.x));
  vec3 color2 = vec3(step(unit1_2, px.y));
  vec3 color3 = vec3(1.0-step(unit2_1, px.x)); // レの部分を塗りつぶす
  vec3 color4 = vec3(1.0-step(unit2_2, px.y)); // レの部分を塗りつぶす
  vec3 color  = ((color1 + color2) + (color3 + color4)) * 0.3;

  gl_FragColor = vec4(color, 0);
}
