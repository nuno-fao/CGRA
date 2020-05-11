/**
* MyFin
* @constructor
*/
class MyFin extends CGFobject {
    constructor(scene) {
        super(scene);

        this.quad = new MyDoubleSQuad(this.scene);
        this.triangle = new MyTriangle(this.scene);

        this.quad.initBuffers();
        this.triangle.initBuffers();
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, -1);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.translate(0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}