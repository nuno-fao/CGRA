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
        this.gui.add(this.scene, 'displayObject').name('Display Object');
        this.gui.add(this.scene, 'displayNormals').name("Display Normals");
        this.gui.add(this.scene, 'displayCubeMap').name("Display Map");
        this.gui.add(this.scene, 'selectedObject', this.scene.objectIDs).name('Selected Object').onChange(this.scene.updateObject.bind(this.scene));
        this.gui.add(this.scene, 'selectedTexture', this.scene.textureIDs).name('Selected Texture').onChange(this.scene.updateTexture.bind(this.scene));
        
        this.gui.add(this.scene, 'scaleFactor', 0.1, 10.0).name('Scale');
        return true;
    }
}