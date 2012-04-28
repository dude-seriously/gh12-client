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
}