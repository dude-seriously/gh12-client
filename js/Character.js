/*
	The Character class (visual)
	Author: Maciej Baron
*/

function Character(start_x, start_y, sprite, speed) {
	this.sprite.x = start_x;
	this.sprite.y = start_y;
	this.sprite = sprite;
	this.speed = speed;

	this.facing = 0;

	this.target_x = 0;
	this.target_y = 0;

	this.timeout = 0;
}

Character.prototype.GetX = function () {
	return this.sprite.x;
}

Character.prototype.GetY = function () {
	return this.sprite.y;
}

Character.prototype.GetSprite = function () {
	return this.sprite;
}

Character.prototype.GetSpeed = function () {
	return this.speed;
}

Character.prototype.GetFacing = function () {
	return this.facing;
}

Character.prototype.SetFacing = function (facing) {
	this.facing = facing;

	/*
		0 = down (front facing)	[row 0]
		1 = left				[row 0]
		2 = right				[row 1]
		3 = up (from behind)	[row 2]

	*/

	if (this.facing < 2) {
		this.sprite.row = 0;
	} else if (this.facing < 4) {
		this.sprite.row = this.facing - 1;
	}
}

Character.prototype.IsMoving = function () {
	return (this.x != this.target_x || this.y != this.target_y);
}


Character.prototype.Draw = function (context) {
	this.sprite.Draw(context);
}

Character.prototype.MoveTo = function (x, y) {
	this.target_x = x;
	this.target_y = y;

	if (this.target_x > this.x) {
		this.SetFacing(2); // Right
	} else if (this.target_x < this.x) {
		this.SetFacing(1); // Left
	}

	if (this.target_y < this.y) {
		this.SetFacing(3); // Up
	} else if (this.target_y > this.y) {
		this.SetFacing(0); // Down
	}

	if (this.IsMoving() && this.sprite.IsAnimating() == false) {
		this.sprite.StartAnimation();
	}
}

Character.prototype.Update = function() {
	if (this.IsMoving()) {
		if (Math.abs(this.x-this.target_x) <= this.speed) {
			this.x = this.target_x;
		} else {
			if (this.x > this.target_x) {
				this.x -= this.speed;
			} else {
				this.x += this.speed;
			}
		}

		if (Math.abs(this.y-this.target_y) <= this.speed) {
			this.y = this.target_y;
		} else {
			if (this.y > this.target_y) {
				this.y -= this.speed;
			} else {
				this.y += this.speed;
			}
		}

		if (!this.IsMoving() && this.sprite.IsAnimating()) {
			this.sprite.StopAnimation();
		}
	}
}