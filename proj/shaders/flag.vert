#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;
uniform float speedFactor;
uniform sampler2D uSampler2;

attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;


void main() {
	vTextureCoord = aTextureCoord;

	vec3 offset = vec3(0.0, 0.0, sin(timeFactor*(speedFactor * 5.0 + 0.2) + 20.0*(aVertexPosition.x + 0.5)) * 0.05);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset*(aVertexPosition.x + 0.55), 1.0);
}