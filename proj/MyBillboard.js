/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyBillboard extends CGFobject {
	constructor(scene) {
		super(scene);
		this.beam = new MyDoubleSQuad(this.scene);
		this.progress = new MyPlane(this.scene, 40, false);
		this.board = new MyPlane(this.scene, 40, false);
        this.initMaterials(scene);
    }

    initMaterials(scene) {
    	this.text = new CGFappearance(scene);
        this.text.setAmbient(1, 1, 1, 1.0);
        this.text.setDiffuse(1, 1, 1, 1.0);
        this.text.setDiffuse(1, 1, 1, 1.0);
        this.text.setShininess(10);
        this.text.loadTexture('images/billboard.png');
        this.text.setTextureWrap('REPEAT','REPEAT');

        this.grey = new CGFappearance(scene);
        this.grey.setAmbient(1, 1, 1, 1.0);
        this.grey.setDiffuse(1, 1, 1, 1.0);
        this.grey.setDiffuse(1, 1, 1, 1.0);
        this.grey.setShininess(10);
        this.grey.loadTexture('images/grey.jpg');
        this.grey.setTextureWrap('REPEAT','REPEAT');
    }

    update() {

    }

    reset() {
        
    }
    
    display() {
    	this.scene.pushMatrix();
    	this.scene.scale(1, 0.5, 0.1);
    	
    	this.scene.pushMatrix();
    	this.scene.translate(-7.5, 0.5, -1);
    	this.scene.rotate(Math.PI/2, 0, 1, 0);
    	this.beam.display();
    	this.scene.popMatrix();

    	this.scene.pushMatrix();
    	this.scene.translate(-7.5, 0.5, 1);
    	this.scene.rotate(Math.PI/2, 0, 1, 0);
    	this.beam.display();
    	this.scene.popMatrix();
    	
    	this.scene.popMatrix();
    }
}