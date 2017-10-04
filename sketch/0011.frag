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
  // x,y軸の短い辺を1.0として
  // 中心からの位置(x,y)を相対的に表現したパラメータ
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // st.xとst.yが同値かどうかを判定
  // st.x - st.yの差の絶対値が0以上である
  //float is_xy_same = step(-.1, abs(p.x - p.y));
  float is_xy_same = 1.0 - step(0.01, abs((abs(p.x) - abs(p.y))));

  // stepの色
  float edge = mix(1.0, sqrt(2.0), is_xy_same);

  float color = step(edge*0.3, length(p));

  gl_FragColor = vec4(vec3(color*0.3), 0.4);
  //gl_FragColor = vec4(vec3(edge*0.3), 0.4);
}
