/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */

 SupplyStates = {INACTIVE: 0, FALLING: 1, LANDED: 2};

class MySupply extends CGFobject {
	constructor(scene) {
        super(scene);
        this.crate = new MyCrate(scene);
        this.state = SupplyStates.INACTIVE;
        this.time = 0;
        this.x = 0;
        this.y = 10;
        this.z = 0;
    }
    
    update(t) {
    	if(this.state == SupplyStates.FALLING){
			if (this.time == 0){
				this.time = t;
			}
			var elapsedTime = t - this.time;
			this.time = t;
			
			this.y -= 9.5 * elapsedTime/3000;
			if (this.y <= 0.5) this.land();
    	}
    }

    land() {
        this.state = SupplyStates.LANDED;
    	this.time = 0;
    }

    drop(x, z){
    	this.state = SupplyStates.FALLING;
        this.x = x;
        this.z = z;
    }

    reset() {
    	this.y = 10;
    	this.x = 0;
    	this.z = 0;
    	this.state = SupplyStates.INACTIVE;
    	this.time = 0;
    }

    display() {
        if (this.state != SupplyStates.INACTIVE) {
            this.scene.pushMatrix();
            
            this.scene.translate(this.x, this.y, this.z);
            if (this.state == SupplyStates.FALLING)
                this.crate.display(true);
            if (this.state == SupplyStates.LANDED)
                this.crate.display(false);

            this.scene.popMatrix();
        }
    }
}