/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

        this.triangle = new MyTriangle(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);
        this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);

        this.initMaterials();
    }

    enableNormalViz(){
        this.triangle.enableNormalViz();
        this.triangleSmall.enableNormalViz();
        this.triangleBig.enableNormalViz();
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
    }

    disableNormalViz(){
        this.triangle.disableNormalViz();
        this.triangleSmall.disableNormalViz();
        this.triangleBig.disableNormalViz();
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
    }

    initMaterials(){
        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setAmbient(0.0, 1.0*0.5, 0.0, 1.0);
        this.greenMaterial.setDiffuse(0.0, 1.0*0.7, 0.0, 1.0);
        this.greenMaterial.setSpecular(0.0, 1.0, 0.0, 1.0);
        this.greenMaterial.setShininess(10.0);

        this.redMaterial = new CGFappearance(this.scene);
        this.redMaterial.setAmbient(1.0*0.5, 0.0, 0.0, 1.0);
        this.redMaterial.setDiffuse(1.0*0.7, 0.0, 0.0, 1.0);
        this.redMaterial.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.redMaterial.setShininess(10.0);

        this.purpleMaterial = new CGFappearance(this.scene);
        this.purpleMaterial.setAmbient(0.6*0.5, 0.0, 1.0*0.5, 1.0);
        this.purpleMaterial.setDiffuse(0.6*0.7, 0.0, 1.0*0.7, 1.0);
        this.purpleMaterial.setSpecular(0.6, 0.0, 1.0, 1.0);
        this.purpleMaterial.setShininess(10.0);

        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(0.8*0.5, 0.8*0.5, 0.2*0.5, 1.0);
        this.yellowMaterial.setDiffuse(0.8*0.7, 0.8*0.7, 0.2*0.7, 1.0);
        this.yellowMaterial.setSpecular(0.8, 0.8, 0.2, 1.0);
        this.yellowMaterial.setShininess(10.0);

        this.pinkMaterial = new CGFappearance(this.scene);
        this.pinkMaterial.setAmbient(1.0*0.5, 0.6*0.5, 1.0*0.5, 1.0);
        this.pinkMaterial.setDiffuse(1.0*0.7, 0.6*0.7, 1.0*0.7, 1.0);
        this.pinkMaterial.setSpecular(1.0, 0.6, 1.0, 1.0);
        this.pinkMaterial.setShininess(10.0);

        this.orangeMaterial = new CGFappearance(this.scene);
        this.orangeMaterial.setAmbient(0.7*0.5, 0.4*0.5, 0.2*0.5, 1.0);
        this.orangeMaterial.setDiffuse(0.7*0.7, 0.4*0.7, 0.2*0.7, 1.0);
        this.orangeMaterial.setSpecular(0.7, 0.4, 0.2, 1.0);
        this.orangeMaterial.setShininess(10.0);

        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(0.0, 0.0, 1.0*0.5, 1.0);
        this.blueMaterial.setDiffuse(0.0, 0.0, 1.0*0.7, 1.0);
        this.blueMaterial.setSpecular(0.0, 0.0, 1.0, 1.0);
        this.blueMaterial.setShininess(10.0);
    }

    display(){
        this.scene.pushMatrix();
        var tran = [1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    -1.5, -1.0, 0, 1];
        this.scene.multMatrix(tran);
        this.scene.customMaterial.apply();            
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0.0);
        this.scene.rotate(-Math.PI/2, 0.0, 0.0, 1);
        this.redMaterial.apply();       
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0.0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.purpleMaterial.apply();        
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 0);
        this.yellowMaterial.apply();           
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 2, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.pinkMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3+Math.sqrt(2), Math.sqrt(2) +1, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.orangeMaterial.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), Math.sqrt(2), 0);
        this.scene.rotate(-Math.PI/4*3,0,0,1);
        this.blueMaterial.apply();
        this.triangleBig.display();
        this.scene.popMatrix();
    }
    updateBuffers(complexity){
	}
}