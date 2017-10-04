precision mediump float;
uniform vec2 resolution;

void main() {
  // x,y軸の短い辺を1.0として
  // 中心からの位置(x,y)を相対的に表現したパラメータ
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // boxの高さを定義
  float box_height = 1.0;
  // boxのborderの太さを定義
  float box_line_border = 0.002;

  // 自身(pixel)のxまたはyがbox_outerの領域を超えていなければ 1.0 そうでなければ 0.0
  float box_outer = 1.0 - step(box_height/2., max(abs(p.x), abs(p.y)));

  // 自身(pixel)のxまたはyがbox_innerの領域を超えていなければ 1.0 そうでなければ 0.0
  float box_inner = 1.0 - step(box_height/2. - box_line_border, max(abs(p.x), abs(p.y)));

  // box_outer - box_inner を行い 太さの部分だけを着色するようにする
  float color = box_outer - box_inner;

  // 自身(pixel)を計算したカラーで着色
  gl_FragColor = vec4(vec3(color), 1.0);
}
