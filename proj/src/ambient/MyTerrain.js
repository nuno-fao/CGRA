/*
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object*/
 
class MyTerrain extends CGFobject {
	constructor(scene) {
        super(scene);
                
        //Initialize MyPlane objects
        this.plane = new MyPlane(this.scene, 20);
        
        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(1, 1, 1, 1);
		this.appearance.setDiffuse(1, 1, 1, 1);
        this.appearance.setSpecular(1, 1, 1, 1);
        this.appearance.setShininess(120);

        //Initialize some Textures

        this.texture = new CGFtexture(this.scene, "images/desertTerrain.jpg");
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.textureMap = new CGFtexture(this.scene, 'images/heightmap.jpg');

        //Initialize shaders
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        // additional texture will have to be bound to texture unit 1 later, when using the shader, with "this.textureMap.bind(1);"
        this.shader.setUniformsValues({ uSampler2: 1});


        // shader code panels references
		this.shadersDiv = document.getElementById("shaders");
		this.vShaderDiv = document.getElementById("vshader");
		this.fShaderDiv = document.getElementById("fshader");
    }
    
    
    display() {
        this.scene.pushMatrix();
        
        this.textureMap.bind(1);
        this.scene.setActiveShader(this.shader);
        this.appearance.apply();
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(50, 50, 8);
        this.plane.display();
		this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
        
    }
}