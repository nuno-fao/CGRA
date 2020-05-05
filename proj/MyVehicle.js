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
        this.autoPilotAng = 0;
        this.time = 0;
        this.elapsedTime = 0;
        this.xCenter = 0;
        this.zCenter = 0;
        this.radius = 5;

        this.sphere = new MySphere(this.scene, this.slices, this.stacks);
        this.cylinder= new MyCylinder(this.scene, this.slices);
        this.fin = new MyFin(this.scene);
        this.propeller = new MyPropeller(this.scene);

        this.initBuffers();
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
        this.autoPilot = true;
        this.autoPilotAng = 0;
        this.xCenter = this.x - this.radius * Math.cos(-this.angY * Math.PI/180);
        this.zCenter = this.z - this.radius * Math.sin(-this.angY * Math.PI/180);
    }

    update(t) {
        if (this.autoPilot) {
            if (this.time == 0)
                this.time = t;

            this.elapsedTime = t - this.time;
            this.autoPilotAng -= 2*Math.PI * this.elapsedTime / 5000;
            this.time = t;
        }

        else {
            this.x += this.speed * Math.sin(this.angY * Math.PI/180);
            this.z += this.speed * Math.cos(this.angY * Math.PI/180); 
        }

        this.propeller.setAngle(this.speed);
        this.finAng = 0;

        if (Math.round(this.autoPilotAng * 10) / 10 == -Math.round(2*Math.PI * 10) / 10){
            this.autoPilot = false;
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
        this.elapsedTime = 0;
    }
    
    display() {

        this.scene.pushMatrix();

        if (this.autoPilot){
            this.scene.translate(this.xCenter, 0, this.zCenter);
            this.scene.rotate(this.autoPilotAng, 0, 1, 0);
            this.scene.translate(-this.xCenter, 0, -this.zCenter);
        }

        this.scene.translate(this.x, 10, this.z);
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
        this.scene.rotate(this.angY * Math.PI/180, 0, 1, 0);

        //balloon
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 1);
        this.sphere.display();
        this.scene.popMatrix();

        //cockpit cylinder
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -0.4);
        this.scene.scale(0.1, 0.1, 0.6);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        //cockipit spheres
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

        //propellers
        this.scene.pushMatrix();
        this.scene.translate(0.1, -0.51, -0.4);
        this.scene.scale(0.075, 0.05, 0.11);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.11, -0.51, -0.5);
        this.scene.scale(0.2, 0.16, 0.2);
        this.propeller.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.1, -0.51, -0.4);
        this.scene.scale(0.075, 0.05, 0.11);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.11, -0.51, -0.5);
        this.scene.scale(0.2, 0.16, 0.2);
        this.propeller.display();
        this.scene.popMatrix();

        //fins

        //vertical fins
        if (this.autoPilot)
            this.finAng = 10;
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0.2, -0.4);
        this.scene.scale(0.4, 0.4, 0.4);
        this.scene.rotate(this.finAng * Math.PI/180, 0, 1, 0);
        this.fin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.2, -0.4);
        this.scene.scale(0.4, 0.4, 0.4);
        this.scene.rotate(this.finAng * Math.PI/180, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.fin.display();
        this.scene.popMatrix();

        //horizontal fins
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);

        this.scene.pushMatrix();
        this.scene.translate(0, 0.2, -0.4);
        this.scene.scale(0.4, 0.4, 0.4);
        this.fin.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.2, -0.4);
        this.scene.scale(0.4, 0.4, 0.4);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.fin.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

