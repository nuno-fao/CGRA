/**
* MyPropeller
* @constructor
*/
class MyPropeller extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(this.scene, this.scene.slices, this.scene.stacks);
        this.angle = 0;
        this.sphere.initBuffers();
    }

    setAngle(val){
        this.angle += val;
    }
    
    display() {
        this.scene.pushMatrix();
        this.scene.rotate(this.angle, 0, 0, 1);
        this.scene.translate(0, 0.2, 0);
        this.scene.scale(0.075, 0.2, 0.04);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(this.angle, 0, 0, 1);
        this.scene.translate(0, -0.2, 0);
        this.scene.scale(0.075, 0.2, 0.04);
        this.sphere.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.05);
        this.scene.scale(0.08, 0.08, 0.05);
        this.sphere.display();
        this.scene.popMatrix();
    }

}