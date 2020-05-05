/**
 * MyDoubleSQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyDoubleSQuad extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0,	//0
			0.5, -0.5, 0,	//1
			-0.5, 0.5, 0,	//2
			0.5, 0.5, 0,    //3

			-0.5, -0.5, 0,	//4 0
			0.5, -0.5, 0,	//5 1
			-0.5, 0.5, 0,	//6 2
			0.5, 0.5, 0		//7 3
		];

		this.indices = [
			0, 1, 2,
			1, 3, 2,

            4, 6, 5,
            5, 6, 7
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
		];
		

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

