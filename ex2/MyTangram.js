/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

        this.triangle = new MyTriangle(this);
        this.triangleSmall = new MyTriangleSmall(this);
        this.triangleBig = new MyTriangleBig(this);
        this.diamond = new MyDiamond(this);
        this.parallelogram = new MyParallelogram(this);

        this.displayBlue = true;
        this.displayOrange = true;
        this.displayPink = true;
        this.displayRed = true;
        this.displayYellow = true;
        this.displayGreen = true;
        this.displayPurple = true;
    }
    display(){
        this.scene.pushMatrix();
        var tran = [1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    -Math.sqrt(2)/2, -Math.sqrt(2) - Math.sqrt(2)/2, 0, 1];
        this.scene.multMatrix(tran);
        var rot = [Math.cos(-Math.PI/4), Math.sin(-Math.PI/4), 0.0, 0.0,
                   -Math.sin(-Math.PI/4), Math.cos(-Math.PI/4), 0.0, 0.0,
                   0.0, 0.0, 1.0, 0.0,
                   0.0, 0.0, 0.0, 1.0];   
        this.scene.multMatrix(rot); 
        if(this.displayGreen){                             
            this.diamond.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2)/2, -Math.sqrt(2)/2, 0.0);
        this.scene.rotate(5*Math.PI/4, 0.0, 0.0, 1);
        if(this.displayRed){                             
            this.triangleSmall.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)/2, -Math.sqrt(2)*3/2, 0.0);
        this.scene.rotate(-5*Math.PI/4, 0, 0, 1);
        if(this.displayPurple){                             
            this.triangleSmall.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.scene.scale(1, -1, 0)
        if(this.displayYellow){                             
            this.parallelogram.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), 0, 0);
        this.scene.rotate(-5*Math.PI/4, 0, 0, 1)
        if(this.displayPink){
            this.triangle.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        if(this.displayOrange){
            this.triangleBig.display();
        }
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2), 0)
        if(this.displayBlue){
            this.triangleBig.display();
        }
        this.scene.popMatrix();
    }
}