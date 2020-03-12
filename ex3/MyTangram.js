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
    }
    display(){
        this.scene.pushMatrix();
        var tran = [1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    -1.5, -1.0, 0, 1];
        this.scene.multMatrix(tran);
        //this.scene.setColor(0.0, 1.0, 0.0, 1.0);                   
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0.0);
        this.scene.rotate(-Math.PI/2, 0.0, 0.0, 1);
        //this.scene.setColor(1.0, 0.0, 0.0, 1.0);        
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(2, -1, 0.0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        //this.scene.setColor(0.6, 0.0, 1.0, 1.0);        
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 0);
        //this.scene.setColor(0.8, 0.8, 0.2, 1.0);           
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2, 2, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        //this.scene.setColor(1.0, 0.6, 1.0, 1.0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-3+Math.sqrt(2), Math.sqrt(2) +1, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        //this.scene.setColor(0.7, 0.4, 0.2, 1.0);
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), Math.sqrt(2), 0);
        this.scene.rotate(-Math.PI/4*3,0,0,1);
        //this.scene.setColor(0.0, 0.0, 1.0, 1.0);
        this.triangleBig.display();
        this.scene.popMatrix();
    }
}