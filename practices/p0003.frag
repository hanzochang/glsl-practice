/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;


void main(void){
    vec2 st = gl_FragCoord.xy/resolution.xy;
    float n = 6.0; //分割基数
    st *= n;
    st = fract(st);

    vec3 color = vec3(step(0.5, st.x - st.y/2.));
    gl_FragColor = vec4(color,1.0);
}
