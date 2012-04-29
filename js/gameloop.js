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

	for (var i in deadBodies) {
		if (deadBodies[i].visible) {
			if (deadBodies[i].evil) {
				ctx.drawImage(imgDeadZombie, 0, 0, 32, 20, deadBodies[i].x - cameraX, deadBodies[i].y - cameraY, 32, 20);
			} else {
				ctx.drawImage(imgDeadHuman, 0, 0, 32, 20, deadBodies[i].x - cameraX, deadBodies[i].y - cameraY, 32, 20);
			}
		}
	}

	for (var i in soulContainer.container) {
		if (soulContainer.container[i] && soulContainer.container[i] != null) {
			//soulContainer.container[i].Update();
			soulContainer.container[i].Draw();
		}
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

			var cl = { x:cell.x * 32, y:cell.y * 32 }
			cl = WorldToScreen(cl);
			ctx.beginPath();
			ctx.rect(cl.x, cl.y, 32, 32);
			ctx.fillStyle = "rgba(255,96,0,.2)";
			ctx.strokeStyle = "#ff6600"
			ctx.fill();
			ctx.stroke();
		}
	}


	if (imgShadow.complete) {
		ctx.globalAlpha = 0.4;

		for (var i in userContainer.container) {
			if (userContainer.container[i] != null && userContainer.container[i].character) {
				if (userContainer.container[i].character.enabled) {
					ctx.drawImage(imgShadow, 0, 0, 10, 10, userContainer.container[i].character.characterSprite.sprite.x - cameraX, userContainer.container[i].character.characterSprite.sprite.y - cameraY + 40, 32, 24);
				}
			}
		}

		for (var i in heroContainer.container) {
			if (heroContainer.container[i] != null) {
				ctx.drawImage(imgShadow, 0, 0, 10, 10, heroContainer.container[i].characterSprite.sprite.x - cameraX, heroContainer.container[i].characterSprite.sprite.y - cameraY + 10, 32, 24);
			}
		}

		ctx.globalAlpha = 1;
	}

	for (var i in userContainer.container) {
		if (userContainer.container[i] != null && userContainer.container[i].character) {
			userContainer.container[i].character.characterSprite.Update();
			if (userContainer.container[i].character.enabled) {


				// Start ghost animation

				var d = new Date();
				var n = d.getTime();

				var offset = Math.round(6 + (Math.sin(n/500 + (i*40)) * 6));

				userContainer.container[i].character.characterSprite.sprite.oy = -offset;
				// Finish ghost animation

				//userContainer.container[i].character.characterSprite.sprite.Draw(ctx);

				
			}
		}
	}

	for (var i in heroContainer.container) {
		if (heroContainer.container[i] != null) {
			heroContainer.container[i].characterSprite.Update();
			//heroContainer.container[i].characterSprite.sprite.Draw(ctx);
		}
	}

	var sortedCharacters = new Array();

	for (var i in userContainer.container) {
		if (userContainer.container[i] != null && userContainer.container[i].character) {
			if (userContainer.container[i].character.enabled) {
				sortedCharacters.push(userContainer.container[i].character.characterSprite);
			}
		}
	}

	for (var i in heroContainer.container) {
		if (heroContainer.container[i] != null) {
			sortedCharacters.push(heroContainer.container[i].characterSprite);
		}
	}

	sortedCharacters.sort(function(a, b) {
		return (a.sprite.y + a.sprite.oy - b.sprite.y + b.sprite.oy);
	});

	for(var i in sortedCharacters) {
		sortedCharacters[i].Draw(ctx);
	}

	if (cell) {
		ctx.beginPath()
		for (var i in heroContainer.container) {
			if (heroContainer.container[i] != null &&
				heroContainer.container[i].x > (cell.x - 2) &&
				heroContainer.container[i].x < (cell.x + 2) &&
				heroContainer.container[i].y > (cell.y - 2) &&
				heroContainer.container[i].y < (cell.y + 2)) {

				for(var h = 0; h < heroContainer.container[i].health; ++h) {
					ctx.rect(heroContainer.container[i].characterSprite.sprite.x + heroContainer.container[i].characterSprite.sprite.dw / 2 + (h * 6 - 15) - cameraX, heroContainer.container[i].characterSprite.sprite.y - cameraY - 24, 4, 4);
				}
			}
		}
		ctx.fillStyle = "#f00";
		ctx.fill();
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