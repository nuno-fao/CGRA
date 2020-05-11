#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;
uniform float speed;
uniform sampler2D uSampler2;

attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;


void main() {
	vTextureCoord = aTextureCoord;

	vec3 offset = vec3(0.0, 0.0, sin(timeFactor));

	//vec4 colorMap = texture2D(uSampler2, mod((vec2(0.0, 0.1) + vTextureCoord) * sin(timeFactor), 1.0));


    //offset = aVertexNormal *  (colorMap.r + colorMap.b + colorMap.g)/3.0;

	offset = aVertexNormal * vec3(0.0,0.0,sin(timeFactor));


	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset*0.2, 1.0);
}