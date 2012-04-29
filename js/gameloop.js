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
		if (myself.character && myself.character.enabled) {
			CameraUpdate();
		}
	}

	if (mapTiles.complete && map) {
		map.DrawMap(ctx, cameraX, cameraY);
	}

	if (map) {
		var cell = map.Pick(MouseToWorld());

		if (cell) {
			if (mouseClick) {
				var packet = new Packet();
				packet.type = "mobSpawn";
				packet.x = cell.x;
				packet.y = cell.y;
				client.Send(JSON.stringify(packet));
			}

			cell.x = cell.x * 32;
			cell.y = cell.y * 32;
			cell = WorldToScreen(cell);
			ctx.beginPath();
			ctx.rect(cell.x, cell.y, 32, 32);
			ctx.fillStyle = "rgba(255,96,0,.2)";
			ctx.strokeStyle = "#ff6600"
			ctx.fill();
			ctx.stroke();
		}
	}

	for (var i in userContainer.container) {
		if (userContainer.container[i] != null && userContainer.container[i].character) {
			userContainer.container[i].character.characterSprite.Update();
			if (userContainer.container[i].character.enabled) {


				// Start ghost animation

				var d = new Date();
				var n = d.getTime();

				var offset = Math.round(6 + (Math.sin(n/500 + (i*40)) * 6));

				//console.log(offset);

				userContainer.container[i].character.characterSprite.sprite.oy = -offset;
				// Finish ghost animation

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

	mouseClick = false;
}