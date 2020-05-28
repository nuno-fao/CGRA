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

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Applied Materials
        this.earthMaterial = new CGFappearance(this);
        this.earthMaterial.setAmbient(1, 1, 1, 1.0);
        this.earthMaterial.setDiffuse(1, 1, 1, 1.0);
        this.earthMaterial.setDiffuse(1, 1, 1, 1.0);
        this.earthMaterial.setShininess(10);
        this.earthMaterial.loadTexture('images/earth.jpg');
        this.earthMaterial.setTextureWrap('REPEAT','REPEAT');

        this.defaultMaterial = new CGFappearance(this);
        this.defaultMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setShininess(10.0);
        
        //TextureIDs
        this.textureIDs = {
            'Desert': 0,
            'Cube Map': 1
        }
        //-----

        this.slices = 16;
        this.stacks = 8;
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, this.slices, this.stacks);
        this.cylinder = new MyCylinder(this, this.slices);
        this.vehicle = new MyVehicle(this, this.slices, this.stacks);
        this.cubeMap = new MyCubeMap(this);
        this.terrain = new MyTerrain(this);
        this.objects = [this.vehicle, this.incompleteSphere, this.cylinder];
        this.objectIDs = {
            'Vehicle': 0,
            'Sphere': 1, 
            'Cylinder': 2
        };

        this.supplies = [
            new MySupply(this),
            new MySupply(this),
            new MySupply(this),
            new MySupply(this),
            new MySupply(this),
        ];
        this.currentSupply = 0;
        this.billboard = new MyBillboard(this);
        
        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displayObject = true;
        this.displayCubeMap = true;
        this.displayTerrain = true;
        this.displayNormals = false;
        this.displayBillboard = true;
        this.LKeyUp = true;
        this.PKeyUp = true;
        this.selectedObject = 0;
        this.selectedTexture = 0;
        this.scaleFactor = 1.0;
        this.speedFactor = 1.0;
    }

    initLights() {
        this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);

        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.5, 0.1, 500, vec3.fromValues(35, 20, 35), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys(t) {
        var text = "Keys pressed: ";
        var keysPressed = false;
        var APressed = false;
        var DPressed = false;
        // Check for key codes e.g. in https://keycode.info/

        if (!this.vehicle.autoPilot) {
            if(this.gui.isKeyPressed("KeyW")){
                text += " W ";
                this.objects[0].accelerate(0.1 * this.speedFactor);
                keysPressed = true;
            }
            if(this.gui.isKeyPressed("KeyS")){
                text += " S ";
                this.objects[0].accelerate(-0.1 * this.speedFactor);
                keysPressed = true;
            }
            if(this.gui.isKeyPressed("KeyA")){
                text += " A ";
                this.objects[0].turn(10);
                keysPressed = true;
                APressed = true;
            }
            if(this.gui.isKeyPressed("KeyD")){
                text += " D ";
                this.objects[0].turn(-10);
                keysPressed = true;
                DPressed = true;
            }

            if (this.gui.isKeyPressed("KeyL") && this.LKeyUp) {
                text += " L ";
                if (this.currentSupply < 5){
                    this.supplies[this.currentSupply].drop(this.vehicle.x, this.vehicle.z);
                    this.supplies[this.currentSupply].display();
                    this.currentSupply++;
                    this.billboard.update();
                }
                this.LKeyUp = false;
                keysPressed = true;
            }

            if(!this.gui.isKeyPressed("KeyL")){
                this.LKeyUp = true;
            }
        }

        if (this.gui.isKeyPressed("KeyP") && this.PKeyUp) {
            text += " P ";
            this.objects[0].setAutoPilot();
            this.PKeyUp = false;
            keysPressed = true;
        }

        if(!this.gui.isKeyPressed("KeyP")){
            this.PKeyUp = true;
        }

        if (this.gui.isKeyPressed("KeyR")) {
            text += " R "
            this.objects[0].reset();
            this.currentSupply = 0;
            for (var i = 0 ; i < 5; i++){
                this.supplies[i].reset();
            }
            keysPressed = true;
            this.billboard.reset();
        }
        
        this.vehicle.update(t);
        for (var i = 0 ; i < 5; i++){
                this.supplies[i].update(t);
        }

        if(keysPressed){
            if (DPressed) this.vehicle.finAng = 15;
            else if (APressed) this.vehicle.finAng = -15;
            console.log(text);
        }
    }
   
    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        if (this.selectedObject == 0)
            this.checkKeys(t);
    }

    updateObject() {
        this.objects[this.selectedObject];
    }

    updateTexture() {
        this.cubeMap.updateTexture();
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

        // ---- BEGIN Primitive drawing section
        this.pushMatrix();

        if (this.displayCubeMap) {
            this.cubeMap.display();
        }

        if (this.displayTerrain) {
            this.terrain.display();
        }

        if (this.displayBillboard) {
            this.billboard.display();
        }

        if (this.displayNormals)
            this.objects[this.selectedObject].enableNormalViz();
        else
            this.objects[this.selectedObject].disableNormalViz();

        if (this.displayObject) {
            this.pushMatrix();
            this.translate(0, 2, 0);
            this.objects[this.selectedObject].display();
            this.popMatrix();
        }

        for (var i = 0; i < 5; i++){
            this.supplies[i].display();
        }
        
        this.popMatrix();
        // ---- END Primitive drawing section
    }
}