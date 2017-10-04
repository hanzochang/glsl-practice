/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float volume;

void main() {
  // **音楽連動のための係数**
  float volume_val = volume * 0.05;

  // x,y軸の短い辺を1.0として
  // 中心からの位置(x,y)を相対的に表現したパラメータ
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // boxの高さを定義 * [音楽連動係数]
  float box_height = 1.0; // * volume_val;
  // boxのborderの太さを定義 * [音楽連動係数]
  float box_line_border = 0.02;

  // 自身(pixel)のxまたはyがbox_outerの領域を超えていなければ 1.0 そうでなければ 0.0
  float box_outer = 1.0 - step(box_height/2., max(abs(p.x), abs(p.y)));

  // 自身(pixel)のxまたはyがbox_innerの領域を超えていなければ 1.0 そうでなければ 0.0
  float box_inner = 1.0 - step(box_height/2. - box_line_border, max(abs(p.x), abs(p.y)));

  // box_outer - box_inner を行い 太さの部分だけを着色するようにする
  float color = box_outer - box_inner;

  // 自身(pixel)を計算したカラーで着色
  gl_FragColor = vec4(vec3(color), 1.0);
}
