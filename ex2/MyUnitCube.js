/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [       //AJEITAR A ORDEM DESTA MERDA
			-0.5, -0.5, 0.5,    //0 top back left
			-0.5, 0.5, 0.5,     //1 top front left
			0.5, 0.5, 0.5,      //2 top front right
			0.5, -0.5, 0.5,     //3 top back right
			-0.5, -0.5, -0.5,   //4 bottom back left
			-0.5, 0.5, -0.5,    //5 bottom front left
			0.5, 0.5, -0.5,     //6 bottom front right
			0.5, -0.5, -0.5     //7 bottom back right
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			3, 1, 0,    //face de cima
            2, 1, 3,
            
			6, 5, 4,    //face de baixo
            6, 4, 7,
            
			5, 1, 2,    //face no eixo dos z positivos
            6, 5, 2,
            
			4, 0, 3,    //face no eixo dos z negativos
            7, 4, 3,
            
			6, 2, 3,    //face no eixo dos x positivos
            7, 6, 3,
            
			0, 1, 5,    //face no eixo dos x negativos
			0, 5, 4
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}