// Author @patriciogv - 2015
// Title: Ikeda Test patterns

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform float volume;

float random (in float x) {
    return fract(sin(x)*2e4);
}

float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float randomSerie(float x, float freq, float t) {
    return step(.8,random( floor(x*freq)-floor(t) ));
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;

    vec3 color = vec3(0.0);

    float cols = mouse.x*mouse.x*20.*random(1000.*volume);
    float freq = random(floor(time))+abs(atan(time)*0.3);
    float t = 100.+time*(1.0-freq)*1000.*volume;

    if (fract(st.y*cols* 0.8) < 0.5){
        t *= -1.0;
    }

    freq += random(floor(st.y)*volume);

    float offset = 0.055 * 10.0 * volume;
    color = vec3(randomSerie(st.x, freq*200., t+offset),
                 randomSerie(st.x, freq*200., t),
                 randomSerie(st.x, freq*200., t-offset));

    gl_FragColor = vec4(color,1.0);
}
