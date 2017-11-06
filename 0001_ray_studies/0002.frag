/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;

vec3 trans(vec3 p){
    return mod(p, 2.0) - 1.0;
}

float distanceFunc(vec3 p){
    vec3 q = abs(p);
    //return length(max(q - vec3(0.2 * random(vec2(p.x,p.y)), 0.5*random2(p.x), 0.5), 0.0));
    return length(max(q - vec3(0.2, 0.2, 0.2), 0.0)) -0.01;
}

vec3 getNormal(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        distanceFunc(p + vec3(  d, 0.0, 0.0)) - distanceFunc(p + vec3( -d, 0.0, 0.0)),
        distanceFunc(p + vec3(0.0,   d, 0.0)) - distanceFunc(p + vec3(0.0,  -d, 0.0)),
        distanceFunc(p + vec3(0.0, 0.0,   d)) - distanceFunc(p + vec3(0.0, 0.0,  -d))
    ));
}


void main(void){
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // set Camera Positions
  vec3 cPos = vec3(0.,  0.,  1.0);
  vec3 cDir = vec3(.0,  0.0, -1.0);
  vec3 cUp  = vec3(0.,  1.0,  .0);
  vec3 lightDir = vec3(.0, .6, .5);

  vec3 cSide = cross(cDir, cUp);
  float targetDepth = 1.;

  // ray
  vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);

  // marching loop
  float distance = 0.0; // レイとオブジェクト間の最短距離
  float rLen = 0.0;     // レイに継ぎ足す長さ
  vec3  rPos = cPos;    // レイの先端位置
  for(int i = 0; i < 40; i++){
      distance = distanceFunc(rPos);
      rLen += distance;
      rPos = cPos + ray * rLen;
  }

  // hit check
  if(abs(distance) < 0.001){
      vec3 normal = getNormal(rPos);
      float diff = clamp(dot(lightDir, normal), 1.0, 0.2);
      gl_FragColor = vec4(vec3(diff*0.3*sin(time) +0.6), 1.0);
  }else{
      gl_FragColor = vec4(vec3(0.0), 1.0);
  }
}
