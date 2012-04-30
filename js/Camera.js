/*
	This function below calculates the camera coordinates based on
	the position of your character, the position of you mouse cursor 
	and the distance from the edge of the map
*/
function CameraUpdate () {
	var canvas = document.getElementById("canv");
	var my_x = myself.character.characterSprite.sprite.x;
	var my_y = myself.character.characterSprite.sprite.y;

	cameraX = my_x + ((myself.character.characterSprite.sprite.dw)/2) + Math.round((mouseX - canvas.width/2) / 3.75) - canvas.width/2;
	cameraY = my_y + ((myself.character.characterSprite.sprite.dh)/2) + Math.round((mouseY - canvas.height/2) / 3.75) - canvas.height/2;

	audio.camera.x = mouseX - canvas.width/2
	audio.camera.y = mouseY - canvas.height/2
	audio.update();


	if (map) {
		if (cameraX < 0) {
			cameraX = 0;
		} else if(cameraX > map.mapWidth * 32 - width) {
			cameraX = map.mapWidth * 32 - width;
		}

		if (cameraY < 0) {
			cameraY = 0;
		} else if(cameraY > map.mapHeight * 32 - height) {
			cameraY = map.mapHeight * 32 - height;
		}
	}
}

function ScreenToWorld(x, y) {
	return { x:x + cameraX, y:y + cameraY };
}

function MouseToWorld() {
	return { x:mouseX + cameraX, y:mouseY + cameraY };
}

function WorldToScreen(vec) {
	return { x:vec.x - cameraX, y:vec.y - cameraY };
}