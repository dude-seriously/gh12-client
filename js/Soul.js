function Soul (id, x, y) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.start_y = y;

	this.sprite = new Sprite(imgSoul, x, y, 16, 36, 0, 120, 3, true, 0);
	this.collected = false;
}

Soul.prototype.Update() = function() {
	if (collected) {
		var d = new Date();
		var n = d.getTime();
		var offset = Math.round(6 + (Math.sin(n/500 + (i*40)) * 6));
		if (this.sprite.y > 0) {
			this.sprite.x -= 5;
			shit.start_y++;
			this.sprite.y = this.start_y + offset;
		} else {
			this.AfterCollection();
		}
	}
}

Soul.prototype.Collect() = function () {
	this.collected = true;
}

Soul.prototype.Draw() = function() {
	this.sprite.draw(ctx);
}

Soul.prototype.AfterCollection() = function() {
	soulContainer[this.id] = null;
}

soulContainer.AddSoul =  function(id, x, y) {
	var soul = new Soul(id, x, y);
	this[id] = soul;
}