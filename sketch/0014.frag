/*{ "audio": true }*/
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float volume;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    // stがv3(0.4, 0.5) で _zoomが2だとすると
    // stがv2(0.9, 1.0) で _zoomが2だとすると
    _st *= _zoom;
    // _stが v2(0.8, 1.0)
    // _stが v2(1.8, 2.0)
    return fract(_st);
    // _stが v2(0.8, 1.0)
    // _stが v2(0.8, 2.0)
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    // むこれはなんだ
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    // v2(0.4, 0.5)がこうすることで
    // v2(0.8, 1.0) - smoothの間で色変化
    // それ以降で染まるというわけだ
    // 0.1  - 0.11
    vec2 uv = smoothstep(_size,_size+aa,_st);
    //vec2 uv = smoothstep(_size,_size+aa,vec2(1.0)-_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/resolution.xy;
    vec3 color = vec3(0.0);

    // Divide the space in 4
    st = tile(st,2.0);

    // Use a matrix to rotate the space 45 degrees
    st = rotate2D(st,PI*0.25);

    // Draw a square
    color = vec3(box(st,vec2(0.7),0.01*volume));
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color*0.3,1.0);
}
