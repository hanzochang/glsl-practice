precision mediump float;
uniform vec2 resolution;

void main() {
  // x,y軸の短い辺を1.0として
  // 中心からの位置(x,y)を相対的に表現したパラメータ
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // boxの高さを定義 * [音楽連動係数]
  float box_height = 0.1; // * volume_val;
  // boxのborderの太さを定義 * [音楽連動係数]
  float box_line_border = 0.01;
  // box間のスペース
  float boxes_offset = 0.2;

  float box_outers = 0.0;

  float box_inners = 0.0;
  for(float i = -10.0; i < 10.0; i++){
    float xi =  box_height + (boxes_offset * i);
    for(float j = -10.0; j < 10.0; j++){
      float xj =  box_height + (boxes_offset * j);
      box_outers = box_outers + (1.0 - step(box_height/2., max(abs(p.x + xi), abs(p.y + xj))));
      box_inners = box_inners + (1.0 - step(box_height/2.- box_line_border, max(abs(p.x + xi), abs(p.y + xj))));
    }
  }

  float color = box_outers - box_inners;

  // 自身(pixel)を計算したカラーで着色
  gl_FragColor = vec4(vec3(color*1.0), 1.0);
}
