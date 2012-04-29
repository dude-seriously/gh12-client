var loop;

function GameLoop() {
	this.timer = null;
}

GameLoop.prototype.Run = function() {
	this.timer = setTimeout(loop.Update, 50);
}

GameLoop.prototype.Update = function() {
	this.timer = setTimeout(loop.Update, 50);

	ctx.clearRect(0, 0, width, height);

	CameraUpdate();

	if (myself) {
		if (myself.character) {
			//cameraX = myself.character.x * 32;
			//cameraY = myself.character.y * 32;
		}
	}

	if (mapTiles.complete) {
		if (map) {
			map.DrawMap(ctx, cameraX, cameraY);
		}
	}

	for (var i in userContainer.container) {
		if (userContainer.container[i] != null && userContainer.container[i].character) {
			userContainer.container[i].character.characterSprite.Update();
			if (userContainer.container[i].character.enabled) {
				userContainer.container[i].character.characterSprite.sprite.Draw(ctx);
			}
		}
	}

	for (var i in heroContainer.container) {
		if (heroContainer.container[i] != null) {
			heroContainer.container[i].characterSprite.Update();
			heroContainer.container[i].characterSprite.sprite.Draw(ctx);
		}
	}

	var lastDir = dir;

	dir = 0;

	if (keyW) {
		dir = 1;
	}
	if (keyD) {
		dir = 2;
	}
	if (keyS) {
		dir = 3;
	}
	if (keyA) {
		dir = 4;
	}

	if (lastDir != dir) {
		var packet = new Packet();
		packet.type = "charMove";
		packet.d = dir;
		client.Send(JSON.stringify(packet));
	}
}