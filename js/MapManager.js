/*
	The Map Manager class for map generation based on mapsheets
	Author: Maciej Baron
*/

function MapManager (canvas_width, canvas_height, spritesheet, map_array) {
	this.canvas_width = canvas_width;
	this.canvas_height = canvas_height;

	this.spritesheet = spritesheet; // Expecting an Image object with the map spritesheet

	this.map_array = map_array; // An array with numbers pointing at the right sprite

	this.mapWidth = map_array.length;
	this.mapHeight = map_array[0].length;

	this.cell_width = 32;
	this.cell_height = 32;

	this.sprite_height = 32;
}

/*
	This function will essentially draw the map based on the array
	It will load the mapsheet (spritesheet) and "cut out" the elements 
	it needs and stitch a map together
*/
MapManager.prototype.DrawMap = function (context, camera_x, camera_y) {
	for (var x = 0; x < this.mapWidth; x++) {
		for (var y = 0; y < this.mapHeight; y++) {
			var sprite = this.map_array[x][y];
			var draw_x = -camera_x + (x*this.cell_width); // The x destination coordinate
			var draw_y = -camera_y + (y*this.cell_height) - (this.sprite_height - this.cell_height); // The y destination coordinate
			if (draw_x < this.canvas_width && draw_y < this.canvas_height && draw_x > -this.cell_width && draw_y > -this.sprite_height) { // Check if we need to draw it
				// The line below draws the appropriate cell of the map using the provided context
				context.drawImage(this.spritesheet, 0, this.cell_height * sprite /* <- This selects the right sprite from the map spritesheet */, this.cell_width, this.sprite_height, draw_x, draw_y, this.cell_width, this.sprite_height);
			}
		}
	}
}

MapManager.prototype.Pick = function(vec) {
	if (vec.x > 0 &&
		vec.y > 0 &&
		vec.x < this.mapWidth * this.cell_width &&
		vec.y < this.mapHeight * this.cell_height) {

		return { x:Math.floor(vec.x / 32), y:Math.floor(vec.y / 32) };
	} else {
		return null;
	}
}