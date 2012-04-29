function CameraUpdate () {
	var canvas = document.getElementById("canv");
	var my_x = myself.character.characterSprite.sprite.x;
	var my_y = myself.character.characterSprite.sprite.y;

	cameraX = my_x + ((myself.character.characterSprite.sprite.dw)/2) + Math.round((mouseX - canvas.width/2) / 3.75) - canvas.width/2;
	cameraY = my_y + ((myself.character.characterSprite.sprite.dh)/2) + Math.round((mouseY - canvas.height/2) / 3.75) - canvas.height/2;
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