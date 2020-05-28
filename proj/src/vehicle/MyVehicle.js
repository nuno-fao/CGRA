/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.angY = 0;
        this.speed = 0;
        this.x = 0;
        this.z = 0;
        this.finAng = 0;

        this.autoPilot = false;
        this.time = 0;
        this.xCenter = 0;
        this.zCenter = 0;this.radius = 5;

        this.sphere = new MySphere(this.scene, this.slices, this.stacks);
        this.cylinder= new MyCylinder(this.scene, this.slices);
        this.fin = new MyFin(this.scene);
        this.propeller = new MyPropeller(this.scene);

        this.flag = new MyPlane(this.scene, 40, true);
        this.flagShader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.flagTexture = new CGFtexture(this.scene, "images/portugal.png");

        this.flagShader.setUniformsValues({uSampler2: 1});
        this.flagShader.setUniformsValues({speed: 0});
        this.flagShader.setUniformsValues({timeFactor: 0});

        this.initBuffers();
        this.initMaterials(scene);
    }

    initMaterials(scene) {
        this.goodYear = new CGFappearance(scene);
        this.goodYear.setAmbient(1, 1, 1, 1.0);
        this.goodYear.setDiffuse(1, 1, 1, 1.0);
        this.goodYear.setDiffuse(1, 1, 1, 1.0);
        this.goodYear.setShininess(10);
        this.goodYear.loadTexture('images/goodYear.png');
        this.goodYear.setTextureWrap('REPEAT','REPEAT');

        this.yellowMaterial = new CGFappearance(scene);
        this.yellowMaterial.setAmbient(1, 1, 1, 1.0);
        this.yellowMaterial.setDiffuse(1, 1, 1, 1.0);
        this.yellowMaterial.setDiffuse(1, 1, 1, 1.0);
        this.yellowMaterial.setShininess(10);
        this.yellowMaterial.loadTexture('images/yellow.png');
        this.yellowMaterial.setTextureWrap('REPEAT','REPEAT');

        this.blueMaterial = new CGFappearance(scene);
        this.blueMaterial.setAmbient(1, 1, 1, 1.0);
        this.blueMaterial.setDiffuse(1, 1, 1, 1.0);
        this.blueMaterial.setDiffuse(1, 1, 1, 1.0);
        this.blueMaterial.setShininess(10);
        this.blueMaterial.loadTexture('images/darkBlue.jpg');
        this.blueMaterial.setTextureWrap('REPEAT','REPEAT');
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,2,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );

            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    turn(val) {
        if(this.speed < 0){
            this.angY -= val;
        }
        else{
            this.angY += val;
        }
    }

    accelerate(val) {
        this.speed += val;
    }


    setAutoPilot() {
        if (this.autoPilot) {
            this.autoPilot = false;
        } else {
            this.time = 0;
            var radius = 5;
            this.autoPilot = true;
            this.xCenter = this.x + this.radius * Math.sin((this.angY+90) * Math.PI/180);
            this.zCenter = this.z + this.radius * Math.cos((this.angY+90) * Math.PI/180);
        }
    }

    update(t) {
        if (this.autoPilot) {
            if (this.time == 0)
                this.time = t;
            var elapsedTime = t - this.time;
            this.time = t;
            this.angY += elapsedTime * 360/5000;
            this.x = -5 * Math.cos(this.angY * Math.PI/180) + this.xCenter;
            this.z = 5 * Math.sin(this.angY * Math.PI/180) + this.zCenter;
        }
        else {
            this.x += this.speed * Math.sin(this.angY * Math.PI/180);
            this.z += this.speed * Math.cos(this.angY * Math.PI/180); 
        }

        this.propeller.setAngle(this.speed);
        this.finAng = 0;

        if(this.autoPilot){
            this.flagShader.setUniformsValues({timeFactor: t / 100 % 1000, speedFactor: 3});
        }
        else {
            this.flagShader.setUniformsValues({timeFactor: t / 100 % 1000, speedFactor: this.speed});
        }
    }

    reset() {
        this.angY = 0;
        this.speed = 0;
        this.x = 0;
        this.z = 0;
        this.propeller.angle = 0;
        this.finAng = 0;
        this.autoPilot = false;
        this.time = 0;
        this.xCenter = 0;
        this.zCenter = 0;
    }
    
    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.x, 8, this.z);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.rotate(this.angY * Math.PI/180, 0, 1, 0);

        //balloon
        this.scene.pushMatrix();
        this.goodYear.apply();
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(0.5, 0.5, 1);
        this.sphere.display();
        this.scene.popMatrix();

        //cockpit cylinder
        this.scene.pushMatrix();
        this.blueMaterial.apply();
        this.scene.translate(0, -0.5, -0.4);
        this.scene.scale(0.1, 0.1, 0.6);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        //cockpit spheres
        this.scene.pushMatrix();
        this.goodYear.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -0.4);
        this.scene.scale(0.1, 0.1, 0.1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0.2);
        this.scene.scale(0.1, 0.1, 0.1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        
        //propellers
        this.scene.pushMatrix();
        this.blueMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0.11, -0.51, -0.5);
        this.scene.scale(0.2, 0.16, 0.2);
        this.propeller.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.11, -0.51, -0.5);
        this.scene.scale(0.2, 0.16, 0.2);
        this.propeller.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.yellowMaterial.apply();
        this.scene.translate(-0.1, -0.51, -0.4);
        this.scene.scale(0.075, 0.05, 0.11);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1, -0.51, -0.4);
        this.scene.scale(0.075, 0.05, 0.11);
        this.sphere.display();
        this.scene.popMatrix();
        
        this.scene.popMatrix();

        //fins
        //vertical fins
        this.scene.pushMatrix();

        this.yellowMaterial.apply();
        if (this.autoPilot)
            this.finAng = -15;
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0.2, -0.45);
        this.scene.scale(0.33, 0.33, 0.33);
        this.scene.rotate(this.finAng * Math.PI/180, 0, 1, 0);
        this.fin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.2, -0.45);
        this.scene.scale(0.33, 0.33, 0.33);
        this.scene.rotate(this.finAng * Math.PI/180, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.fin.display();
        this.scene.popMatrix();

        //horizontal fins
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);

        this.scene.pushMatrix();
        this.scene.translate(0, 0.2, -0.45);
        this.scene.scale(0.33, 0.33, 0.33);
        this.fin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.2, -0.45);
        this.scene.scale(0.33, 0.33, 0.33);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.fin.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.popMatrix();

        //Flag
        this.scene.pushMatrix();
        this.scene.scale(0.01, 0.01, 0.25);
        this.scene.translate(0, 0, -5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.blueMaterial.apply();
        this.cylinder.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.75);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(1, 0.7, 1);
        this.scene.setActiveShader(this.flagShader);
        this.flagTexture.bind(1);
        this.flag.display();
        this.scene.popMatrix();
        
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


