#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;

varying vec4 coords;
varying vec4 normal;

void main() {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	coords=vec4(aVertexPosition, 1.0);
	coords.x+=0.5;
}