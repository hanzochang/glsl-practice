/*{ "audio": true }*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float volume;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-1.02, pct, st.y) -
          smoothstep( pct, pct+1.02, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / resolution;
  float y = cos(st.x*volume/20.0);

  vec3 color = vec3(y);

  // Plot a line
  float pct = plot(st,y);
  color = (1.0-pct)*color+pct*vec3(1.2,2.0,0.4);

  gl_FragColor = vec4(color,0.2);

}
