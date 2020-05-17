/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    /**
    * @method constructor
    * @param  {CGFscene} scene - MyScene object
    * @param  {integer} slices - number of slices around Y axis
    */
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;

        this.initBuffers();
    }

   /**
   * @method initBuffers
   * Initializes the sphere buffers
   * TODO: DEFINE TEXTURE COORDINATES
   */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alpha = 2*Math.PI/this.slices;
        var map = 0;
        

        for (var i = 0; i <= this.slices; i++) {
            var sides = i/this.slices;
            var xAng = Math.cos(ang);
            var yAng = Math.sin(ang);

            this.vertices.push(xAng, 0, -yAng);
            this.vertices.push(xAng, 1, -yAng);

            this.normals.push(xAng, 0, -yAng, xAng, 0, -yAng); 

            this.texCoords.push(sides, 1);
            this.texCoords.push(sides, 0);

            if (i != 0) {
                this.indices.push((i*2), (i*2 + 1), (i*2 - 1))
                this.indices.push((i*2), (i*2 - 1), (i*2 - 2));
            }

            ang += alpha;
            map += sides;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    display() {
        if (this.scene.selectedObject == 2)
		    this.scene.defaultMaterial.apply();
        super.display();
    }
    
}