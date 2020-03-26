/**
 * MyUnitQuadCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitQuadCube extends CGFobject {
	constructor(scene) {
        super(scene);
        this.myQuad = new MyQuad(scene);

        this.initMaterials();
    }
    
    initMaterials(){
        this.mineSide = new CGFappearance(this.scene);
        this.mineSide.setAmbient(0.5, 0.5, 0.5, 1);
        this.mineSide.setDiffuse(0.7, 0.7, 0.7, 1);
        this.mineSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineSide.setShininess(10.0);
        this.mineSide.loadTexture('images/mineSide.png');

        this.mineBottom = new CGFappearance(this.scene);
        this.mineBottom.setAmbient(0.5, 0.5, 0.5, 1);
        this.mineBottom.setDiffuse(0.7, 0.7, 0.7, 1);
        this.mineBottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineBottom.setShininess(10.0);
        this.mineBottom.loadTexture('images/mineBottom.png');

        this.mineTop = new CGFappearance(this.scene);
        this.mineTop.setAmbient(0.5, 0.5, 0.5, 1);
        this.mineTop.setDiffuse(0.7, 0.7, 0.7, 1);
        this.mineTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineTop.setShininess(10.0);
        this.mineTop.loadTexture('images/mineTop.png');
    }
    
    display(){
        this.scene.pushMatrix();
        this.mineSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0,0,0.5);
        this.myQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.mineSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.myQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.mineSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.myQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.mineSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.myQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.mineTop.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.myQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.mineBottom.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.myQuad.display();
        this.scene.popMatrix();
    }
}
