/**
 * MyUnitQuadCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitQuadCube extends CGFobject {
	constructor(scene) {
        super(scene);
        this.myQuad = new MyQuad(scene);
	}
    
    display(){
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.myQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.myQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.myQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.myQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.myQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.myQuad.display();
        this.scene.popMatrix();
    }
}
