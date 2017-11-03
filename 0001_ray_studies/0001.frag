/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;

float distanceFunc(vec3 p){
    return length(p) - 1.0;
}

void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // set Camera Positions
  vec3 cPos = vec3(0.0,  0.0,  3.);
  vec3 cDir = vec3(0.0,  0.0, -1.0);
  vec3 cUp  = vec3(0.0,  1.0,  0.0);

  vec3 cSide = cross(cDir, cUp);
  float targetDepth = 1.0;

  // ray
  vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);

  // marching loop
  float distance = 0.0; // レイとオブジェクト間の最短距離
  float rLen = 0.0;     // レイに継ぎ足す長さ
  vec3  rPos = cPos;    // レイの先端位置
  for(int i = 0; i < 16; i++){
      distance = distanceFunc(rPos);
      rLen += distance;
      rPos = cPos + ray * rLen;
  }

  // hit check
  if(abs(distance) < 0.001){
      gl_FragColor = vec4(vec3(0.2), 1.0);
  }else{
      gl_FragColor = vec4(vec3(0.0), 1.0);
  }
}
