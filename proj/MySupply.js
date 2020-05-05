/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
	constructor(scene) {
        super(scene);
        this.falling = false;
        this.landed = false;
        this.frames=0;
        this.speed=0;
        this.xoffset=0;
        this.yoffset=0;
        this.zoffset=0;
        this.quad = new MyQuad(scene);
        this.initMaterials();
        this.state=SupplyStates.INACTIVE;
        this.initTextures(scene);
    }

    initTextures(scene) {
    	this.mineTop = new CGFappearance(scene);
        this.mineTop.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineTop.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineTop.setShininess(10.0);
        this.mineTop.loadTexture('images/mineTop.png');
        this.mineTop.setTextureWrap('REPEAT', 'REPEAT');

        this.mineBottom = new CGFappearance(scene);
        this.mineBottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineBottom.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineBottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineBottom.setShininess(10.0);
        this.mineBottom.loadTexture('images/mineBottom.png');
        this.mineBottom.setTextureWrap('REPEAT', 'REPEAT');

        this.mineSide = new CGFappearance(scene);
        this.mineSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.mineSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mineSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.mineSide.setShininess(10.0);
        this.mineSide.loadTexture('images/mineSide.png');
        this.mineSide.setTextureWrap('REPEAT', 'REPEAT');
    }


    initMaterials(){
        const SupplyStates =  {      INACTIVE: 0,      FALLING: 1,      LANDED: 2  };
    }
    
    update(){
        if(state==SupplyStates.FALLING){
            frames++;
            if(frames==speed){
                frames=0;
            }
            if(frames==0){
                this.yoffset--;
            }
        }
        
        if(this.yoffset==0){    //may have a problem here depending how we handle the supplies on the scene
            this.landed();
        }
    }

    land(){
        this.state=SupplyStates.LANDED;
    }

    drop(x,y,z,dropRate){
        this.xoffset=x;
        this.yoffset=y;
        this.zoffset=z;
        this.speed=dropRate;
        this.state=SupplyStates.FALLING;
    }

    display() {
        if(state==SupplyStates.FALLING){
            this.mineSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(this.xoffset, this.yoffset, this.zoffset);

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
        else if(state==SupplyStates.LANDED){
            this.displayLanded();
        }
        
    }

    displayLanded(){    //need to change this one later
        this.mineSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.translate(this.xoffset, this.yoffset, this.zoffset);

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
    
}