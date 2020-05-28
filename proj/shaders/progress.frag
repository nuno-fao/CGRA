#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

varying vec4 coords;
uniform float total;

void main() {
    if(abs(coords.x) > total){
        gl_FragColor.r = 0.5;
        gl_FragColor.g = 0.5;
        gl_FragColor.b = 0.5;
        gl_FragColor.a = 1.0;
    }
    else {
        gl_FragColor.r = 1.0 - (coords.x );
        gl_FragColor.g = (coords.x);
        gl_FragColor.b = 0.0;
        gl_FragColor.a = 1.0;
    }
}