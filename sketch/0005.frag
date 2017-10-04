
/*{ "audio": true }*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform float volume;
uniform float mouse;


void main() {
	//vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
	vec2 p = (gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
	//vec2 p = gl_FragCoord.xy * 2.;

  float base = 0.0011;

  gl_FragColor = vec4(
    base*volume / length(p+vec2(0, 0)), //length(p + vec2(sin(time * 0.23) * 0.4, 0.1)),
    base*volume / length(p+vec2(0, 0)), //length(p + vec2(sin(time * 0.33) * 0.4, -0.1)),
    base*volume / length(p+vec2(0, 0)),//length(p + vec2(sin(time * 0.43) * 0.4, -0.2)),
    0.1
  );
	//gl_FragColor = vec4(
  //  0.001*volume / length(p + vec2(sin(time * 1.23) * 0.4, 0)),
  //  0.001*volume / length(p + vec2(cos(time * 2.23) * 0.4, 0)),
  //  0.001*volume / length(p + vec2(sin(time * 3.23) * 0.4, 0)),
  //  1.
  //);
}
