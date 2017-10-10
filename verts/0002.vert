/*{ "vertexCount": 100 }*/
precision mediump float;
attribute float vertexId;
uniform float vertexCount;
uniform float time;
uniform vec2 resolution;
varying vec4 v_color;

void main() {
  float i = vertexId + time *2.;

  vec3 pos = vec3(
    cos(i * 1.0),
    sin(i * 1.01),
    sin(i * 1.01)
  );

  gl_Position = vec4(pos.x, pos.y, pos.z, 0.6);

  v_color = vec4(fract(vertexId / 4.), 1, 1, 1);
}
