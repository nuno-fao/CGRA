/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.tangram = new MyTangram(this);
        this.cube = new MyUnitCube(this);
        this.quadCube = new MyQuad(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayTangram = true;
        this.displayCube = true;
        this.displayQuad = false;
        this.scaleFactor = 1;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    setColor(r, g, b, alpha) {
        this.setAmbient(r, g, b, alpha);
        this.setDiffuse(r, g, b, alpha);
        this.setSpecular(r, g, b, alpha);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
                    0.0, this.scaleFactor, 0.0, 0.0,
                    0.0, 0.0, this.scaleFactor, 0.0,
                    0.0, 0.0, 0.0, 1.0];

        this.multMatrix(sca);

        // ---- BEGIN Primitive drawing section
        this.pushMatrix();
        this.translate(0,1,0);
        if(this.displayQuad){
            this.quadCube.display();
        }
        this.popMatrix();

        this.pushMatrix();
        if(this.displayQuad){
            this.quadCube.display();
        }
        this.popMatrix();

        this.pushMatrix();
        this.translate(0,0.5,-0.5);
        this.rotate(-Math.PI/2,1,0,0);
        if(this.displayQuad){
            this.quadCube.display();
        }
        this.popMatrix();

        this.pushMatrix();
        this.translate(0,0.5,0.5);
        this.rotate(-Math.PI/2,1,0,0);
        if(this.displayQuad){
            this.quadCube.display();
        }
        this.popMatrix();

        this.pushMatrix();
        this.translate(-0.5,0.5,0);
        this.rotate(-Math.PI/2,0,0,1);
        if(this.displayQuad){
            this.quadCube.display();
        }
        this.popMatrix();

        this.pushMatrix();
        this.translate(0.5,0.5,0);
        this.rotate(-Math.PI/2,0,0,1);
        if(this.displayQuad){
            this.quadCube.display();
        }
        this.popMatrix();
        
        this.translate(2, 0, 3*Math.sqrt(2)+2);
        this.rotate(-Math.PI / 2, 1, 0, 0);

        this.pushMatrix();
        this.scale(4,3*Math.sqrt(2)+2,1);
        this.translate(0,0.5,-0.501);
        this.setColor(1.0, 1.0, 1.0, 1.0);
        if (this.displayCube)
            this.cube.display();
        
        this.popMatrix();

        this.pushMatrix();
        this.translate(0,2*Math.sqrt(2),0);
        if(this.displayTangram){
            this.tangram.display();
        }
        this.popMatrix();



        

        // ---- END Primitive drawing section
    }
}