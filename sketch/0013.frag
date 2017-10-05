/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float volume;
uniform vec2 mouse;

void main() {
  // x,y軸の短い辺を1.0として
  // 中心からの位置(x,y)を相対的に表現したパラメータ
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // boxの高さを定義 * [音楽連動係数]
  float box_height = 0.7; // * volume_val;
  // boxのborderの太さを定義 * [音楽連動係数]
  float box_line_border = 0.004 * volume * 0.5 * mouse.x;
  // box間のスペース
  float boxes_offset = 0.6;

  float box_outers = 0.0;
  float box_inners = 0.0;
  for(float i = -5.0; i < 5.0; i++){
    float xi =  box_height + (boxes_offset * i);
    for(float j = -5.0; j < 5.0; j++){
      // **音楽連動のための係数**
      float volume_val = volume * 0.011; // + abs(j*(0.2));
      float xj =  box_height + (boxes_offset * j);
      box_outers = box_outers + (1.0 - step(box_height/2. * volume_val, max(abs(p.x + xi), abs(p.y + xj))));
      box_inners = box_inners + (1.0 - step(box_height/2. * volume_val - box_line_border, max(abs(p.x + xi), abs(p.y + xj))));
    }
  }

  float color = abs(step(0.5, mouse.y) - (box_outers - box_inners));// - box_inner;

  vec3 reverse = vec3(step(0.5, mouse.y));

  // 自身(pixel)を計算したカラーで着色
  gl_FragColor = vec4(vec3(color*1.0), 1.0);
}
