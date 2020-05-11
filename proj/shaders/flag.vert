#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float time;
uniform float speed;

attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;


void main() {
	vTextureCoord = aTextureCoord;
	vec3 offset = vec3(0.0, 0.0, 0.0);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}