/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayCube').name('Display Cube');
        this.gui.add(this.scene, 'displayTangram').name('Display Tangram');
        this.gui.add(this.scene.tangram, 'displayBlue').name('Display Blue');
		this.gui.add(this.scene.tangram, 'displayOrange').name('Display Orange');
		this.gui.add(this.scene.tangram, 'displayPink').name('Display Pink');
		this.gui.add(this.scene.tangram, 'displayRed').name('Display Red');
		this.gui.add(this.scene.tangram, 'displayYellow').name('Display Yellow');
		this.gui.add(this.scene.tangram, 'displayGreen').name('Display Green');
		this.gui.add(this.scene.tangram, 'displayPurple').name('Display Purple');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}