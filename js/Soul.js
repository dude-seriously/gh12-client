function Soul (id, x, y) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.start_y = 0;

	//this.sprite = new Sprite(imgSoul, x * 32, y * 32, 16, 36, 0, 120, 3, true, 0);
	//this.sprite.Draw(ctx);
	//console.log(this.sprite);
	this.collected = false;
}

/*Soul.prototype.Update = function() {
	if (this.collected) {
		var d = new Date();
		var n = d.getTime();
		var offset = Math.round(6 + (Math.sin(n/500)));
		if (this.sprite.y > 0) {
			this.sprite.y -= 5;
			//this.sprite.x += 5;
			//this.start_y++;
			//this.sprite.y = this.start_y + offset;
		} else {
			this.AfterCollection();
		}
	}
}*/

Soul.prototype.Collect = function () {
	this.collected = true;
}

Soul.prototype.Draw = function() {
	if (!this.collected) {
		ctx.drawImage(imgSoul, 0, 0, 16, 36, this.x * 32 - cameraX + 8, this.y * 32 - cameraY, 16, 36);
	} else {
		soulContainer.container[this.id] = null;
	}
//	this.sprite.Draw(ctx);
}

/*Soul.prototype.AfterCollection = function() {
	soulContainer.container[this.id] = null;
}
*/
function SoulContainer() {
	this.container = new Object();
}

SoulContainer.prototype.AddSoul =  function(id, x, y) {
	this.container[id] = new Soul(id, x, y);
}