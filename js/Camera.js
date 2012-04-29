function CameraUpdate () {
	var canvas = document.getElementById("canv");
	var my_x = myself.character.characterSprite.sprite.x;
	var my_y = myself.character.characterSprite.sprite.y;

	cameraX = my_x + ((myself.character.characterSprite.sprite.dw+32)/2) - Math.round((canvas.width - mouseX)/3.75) - canvas.width/2;
	cameraY = my_y + ((myself.character.characterSprite.sprite.dh+32)/2) - Math.round((canvas.height - mouseY)/3.75) - canvas.height/2;
}