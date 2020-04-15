/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.top = new MyQuad(scene);
        this.bottom = new MyQuad(scene);
        this.left = new MyQuad(scene);
        this.right = new MyQuad(scene);
        this.back = new MyQuad(scene);
        this.front = new MyQuad(scene);

        this.initMaterials();
    }
    
    initMaterials(){

        this.top.texCoords = [
            0.25,1/3,
            0.5,1/3,
            0.25,0.01,
            0.49,0.01
        ];
        this.top.updateTexCoordsGLBuffers();

        this.bottom.texCoords = [
            0.27,1,
            0.5,1,
            0.27,2/3,
            0.5,2/3
        ];
        this.bottom.updateTexCoordsGLBuffers();

        this.left.texCoords = [
            0.0,2/3,
            0.25,2/3,
            0.0,0.334,
            0.25,0.334
        ];
        this.left.updateTexCoordsGLBuffers();

        this.right.texCoords = [
            0.5,2/3,
            0.75,2/3,
            0.5,0.334,
            0.75,0.334
        ];
        this.right.updateTexCoordsGLBuffers();

        this.back.texCoords = [
            0.25,2/3,
            0.5,2/3,
            0.25,1/3,
            0.5,1/3
        ];
        this.back.updateTexCoordsGLBuffers();

        this.front.texCoords = [
            0.75,2/3,
            0.98,2/3,
            0.75,0.335,
            0.98,0.335
        ];
        this.front.updateTexCoordsGLBuffers();
    }
    
    enableNormalViz(){
        this.top.enableNormalViz();
        this.bottom.enableNormalViz();
        this.left.enableNormalViz();
        this.right.enableNormalViz();
        this.bottom.enableNormalViz();
        this.front.enableNormalViz();
    }

    disableNormalViz(){
        this.top.disableNormalViz();
        this.bottom.disableNormalViz();
        this.left.disableNormalViz();
        this.right.disableNormalViz();
        this.bottom.disableNormalViz();
        this.front.disableNormalViz();
    }

    display(){

        this.scene.scale(50*this.scene.scaleFactor,50*this.scene.scaleFactor,50*this.scene.scaleFactor);
        this.scene.cubeMaps[this.scene.selectedCubeMap].apply();

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.top.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.bottom.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.left.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.right.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.back.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.front.display();
        this.scene.popMatrix();
    }
}
