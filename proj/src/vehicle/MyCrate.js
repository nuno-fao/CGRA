/**
 * MyCrate
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCrate extends CGFobject {
	constructor(scene) {
		super(scene);
        this.quad = new MyDoubleSQuad(this.scene);
        
        this.initTextures(scene);
    }

    initTextures(scene){
    	this.mineTop = new CGFappearance(scene);
        this.mineTop.setAmbient(0.9, 0.9, 0.9, 1);
        this.mineTop.setDiffuse(0.1, 0.1, 0.1, 1);
        this.mineTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineTop.setShininess(10.0);
        this.mineTop.loadTexture('images/mineTop.png');
        this.mineTop.setTextureWrap('REPEAT', 'REPEAT');

        this.mineBottom = new CGFappearance(scene);
        this.mineBottom.setAmbient(0.9, 0.9, 0.9, 1);
        this.mineBottom.setDiffuse(0.1, 0.1, 0.1, 1);
        this.mineBottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineBottom.setShininess(10.0);
        this.mineBottom.loadTexture('images/mineBottom.png');
        this.mineBottom.setTextureWrap('REPEAT', 'REPEAT');

        this.mineSide = new CGFappearance(scene);
        this.mineSide.setAmbient(0.9, 0.9, 0.9, 1);
        this.mineSide.setDiffuse(0.1, 0.1, 0.1, 1);
        this.mineSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineSide.setShininess(10.0);
        this.mineSide.loadTexture('images/mineSide.png');
        this.mineSide.setTextureWrap('REPEAT', 'REPEAT');

        this.dirt = new CGFappearance(scene);
        this.dirt.setAmbient(0.9, 0.9, 0.9, 1);
        this.dirt.setDiffuse(0.1, 0.1, 0.1, 1);
        this.dirt.setSpecular(0.1, 0.1, 0.1, 1);
        this.dirt.setShininess(10.0);
        this.dirt.loadTexture('images/dirt.jpg');
        this.dirt.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(falling) {
        if (falling) {
            this.scene.scale(0.6, 0.6, 0.6);
            this.mineSide.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

            this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.5);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, 0, -0.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0.5, 0, 0);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.5, 0, 0);
            this.scene.rotate(-Math.PI/2, 0, 1, 0);
            this.quad.display();
            this.scene.popMatrix();

            this.mineTop.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            
            this.scene.pushMatrix();
            this.scene.translate(0, 0.5, 0);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.quad.display();
            this.scene.popMatrix();

            this.mineBottom.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            
            this.scene.pushMatrix();
            this.scene.translate(0, -0.5, 0);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.quad.display();
            this.scene.popMatrix();
        }
        else {
        	this.scene.scale(1.2, 1.2, 1.2);
            this.dirt.apply();
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

			this.scene.pushMatrix();
			this.scene.translate(0, 0.1, 0);
			this.scene.rotate(-Math.PI/2,1,0,0);
			this.quad.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0.5, 0.1, 0);
			this.scene.rotate(-Math.PI/2,1,0,0);
			this.quad.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(-0.5, 0.1, 0);
			this.scene.rotate(-Math.PI/2,1,0,0);
			this.quad.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(-0.5, 0.1, -0.5);
			this.scene.rotate(-Math.PI/2,1,0,0);
			this.quad.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0, 0.1, 0.5);
			this.scene.rotate(-Math.PI/2,1,0,0);
			this.quad.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(0, 0.1, -0.5);
			this.scene.rotate(-Math.PI/2,1,0,0);
			this.quad.display();
			this.scene.popMatrix();
        }
    }

    enableNormalViz(){
        this.quad.enableNormalViz()
    }
    
    disableNormalViz(){
        this.quad.disableNormalViz();
    }
}