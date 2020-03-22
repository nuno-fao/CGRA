/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

        this.triangle = new MyTriangle(scene);
        this.triangleSmall1 = new MyTriangleSmall(scene);
        this.triangleSmall2 = new MyTriangleSmall(scene);
        this.triangleBig1 = new MyTriangleBig(scene);
        this.triangleBig2 = new MyTriangleBig(scene);
        this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);

        this.initMaterials();
    }

    enableNormalViz(){
        this.triangle.enableNormalViz();
        this.triangleSmall1.enableNormalViz();
        this.triangleSmall2.enableNormalViz();
        this.triangleBig1.enableNormalViz();
        this.triangleBig2.enableNormalViz();
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
    }

    disableNormalViz(){
        this.triangle.disableNormalViz();
        this.triangleSmall1.disableNormalViz();
        this.triangleSmall2.disableNormalViz();
        this.triangleBig1.disableNormalViz();
        this.triangleBig2.disableNormalViz();
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
    }

    initMaterials(){

        //------ Tangram Material
        this.tangramMaterial = new CGFappearance(this.scene);
        this.tangramMaterial.setAmbient(0.5, 0.5, 0.5, 1);
        this.tangramMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');

        //-------

        this.diamond.texCoords = [
            0,0.5,
            0.25,0.75,
            0.25,0.25,
            0.5,0.5
        ];
        this.diamond.updateTexCoordsGLBuffers();
        
        this.parallelogram.texCoords = [
            1,1,
            0.75,0.75,
            0.25,0.75,
            0.5,1
        ];
        this.parallelogram.updateTexCoordsGLBuffers();

        this.triangle.texCoords = [
            0,1,
            0.5,1,
            0,0.5
        ];
        this.triangle.updateTexCoordsGLBuffers();

        this.triangleSmall1.texCoords = [
            0.25,0.75,
            0.5,0.5,
            0.75,0.75
        ];
        this.triangleSmall1.updateTexCoordsGLBuffers();

        this.triangleSmall2.texCoords = [
            0,0,
            0.25,0.25,
            0,0.5
        ];
        this.triangleSmall2.updateTexCoordsGLBuffers();

        this.triangleBig1.texCoords = [
            1,1,
            0.5,0.5,
            1,0
        ];
        this.triangleBig1.updateTexCoordsGLBuffers();

        this.triangleBig2.texCoords = [
            1,0,
            0.5,0.5,
            0,0
        ];
        this.triangleBig2.updateTexCoordsGLBuffers();

    }

    display(){
        
        this.tangramMaterial.apply();

        this.scene.pushMatrix();
        var tran = [1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    -1.5, -1.0, 0, 1];
        this.scene.multMatrix(tran);          
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0.0);
        this.scene.rotate(-Math.PI/2, 0.0, 0.0, 1);
        this.triangleSmall1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0.0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.triangleSmall2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 0);         
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 2, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3+Math.sqrt(2), Math.sqrt(2) +1, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.triangleBig1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), Math.sqrt(2), 0);
        this.scene.rotate(-Math.PI/4*3,0,0,1);
        this.triangleBig2.display();
        this.scene.popMatrix();
    }
    
}