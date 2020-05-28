/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);

        this.initTextures(this.scene);
    }

    initTextures(scene) {
        this.front = new CGFappearance(scene);
        this.front.setAmbient(1, 1, 1, 1.0);
        this.front.setDiffuse(0, 0, 0, 1.0);
        this.front.setSpecular(0, 0, 0, 1.0);
        this.front.setShininess(10.0);
        this.front.loadTexture('images/split_desert/front.png');
        this.front.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.back = new CGFappearance(scene);
        this.back.setAmbient(1, 1, 1, 1.0);
        this.back.setDiffuse(0, 0, 0, 1.0);
        this.back.setSpecular(0, 0, 0, 1.0);
        this.back.setShininess(10.0);
        this.back.loadTexture('images/split_desert/back.png');
        this.back.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.left = new CGFappearance(scene);
        this.left.setAmbient(1, 1, 1, 1.0);
        this.left.setDiffuse(0, 0, 0, 1.0);
        this.left.setSpecular(0, 0, 0, 1.0);
        this.left.setShininess(10.0);
        this.left.loadTexture('images/split_desert/left.png');
        this.left.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.right = new CGFappearance(scene);
        this.right.setAmbient(1, 1, 1, 1.0);
        this.right.setDiffuse(0, 0, 0, 1.0);
        this.right.setSpecular(0, 0, 0, 1.0);
        this.right.setShininess(10.0);
        this.right.loadTexture('images/split_desert/right.png');
        this.right.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.top = new CGFappearance(scene);
        this.top.setAmbient(1, 1, 1, 1.0);
        this.top.setDiffuse(0, 0, 0, 1.0);
        this.top.setSpecular(0, 0, 0, 1.0);
        this.top.setShininess(10.0);
        this.top.loadTexture('images/split_desert/top.png');
        this.top.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.bottom = new CGFappearance(scene);
        this.bottom.setAmbient(1, 1, 1, 1.0);
        this.bottom.setDiffuse(0, 0, 0, 1.0);
        this.bottom.setSpecular(0, 0, 0, 1.0);
        this.bottom.setShininess(10.0);
        this.bottom.loadTexture('images/split_desert/bottom.png');
        this.bottom.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        this.scene.pushMatrix()
        
        this.scene.translate(0, 7, 0);
        this.scene.scale(50, 50, 50);

        this.top.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.bottom.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.left.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.right.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.back.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.front.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    updateTexture() {
        if (this.scene.selectedTexture == 1) {
            this.right.loadTexture('images/split_cubemap/right.png');
            this.left.loadTexture('images/split_cubemap/left.png');
            this.front.loadTexture('images/split_cubemap/front.png');
            this.back.loadTexture('images/split_cubemap/back.png');
            this.top.loadTexture('images/split_cubemap/top.png');
            this.bottom.loadTexture('images/split_cubemap/bottom.png');
        }

        else if (this.scene.selectedTexture == 0) {
            this.left.loadTexture('images/split_desert/left.png');
            this.right.loadTexture('images/split_desert/right.png');
            this.back.loadTexture('images/split_desert/back.png');
            this.front.loadTexture('images/split_desert/front.png');
            this.top.loadTexture('images/split_desert/top.png');
            this.bottom.loadTexture('images/split_desert/bottom.png');
        }
    }
}
