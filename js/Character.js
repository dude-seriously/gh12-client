/*
	The CharacterSprite class (visual)
	Author: Maciej Baron
	
	
	This class was used to create sprites for characters (heroes, monsters)
*/

function CharacterSprite(start_x, start_y, sprite, speed) {
	this.sprite = sprite;
	this.sprite.x = start_x;
	this.sprite.y = start_y;
	this.speed = speed;

	this.facing = 0;

	this.target_x = start_x;
	this.target_y = start_y;

	this.attacking = false;
}

CharacterSprite.prototype.GetX = function () {
	return this.sprite.x;
}

CharacterSprite.prototype.GetY = function () {
	return this.sprite.y;
}

CharacterSprite.prototype.GetSprite = function () {
	return this.sprite;
}

CharacterSprite.prototype.GetSpeed = function () {
	return this.speed;
}

CharacterSprite.prototype.GetFacing = function () {
	return this.facing;
}

CharacterSprite.prototype.SetFacing = function (facing) {
	this.facing = facing;

	/*
		0 = down (front facing)	[row 0]
		1 = left				[row 0]
		2 = right				[row 1]
		3 = up (from behind)	[row 2]
		
		
		Depending on when the character is facing, we need to 
		select the right row in the spritesheet.
		'Down' and 'left' are using the same row.

	*/

	if (this.facing < 2) {
		this.sprite.row = 0;
	} else if (this.facing < 4) {
		this.sprite.row = this.facing - 1;
	}
}

CharacterSprite.prototype.IsMoving = function () {
	return (this.sprite.x != this.target_x || this.sprite.y != this.target_y);
}


CharacterSprite.prototype.Draw = function (context) {
	this.sprite.Draw(context);
}

CharacterSprite.prototype.MoveTo = function (x, y) {
	this.target_x = x;
	this.target_y = y;
	if (!this.attacking) {
		if (this.target_x > this.sprite.x) {
			this.SetFacing(2); // Right
		} else if (this.target_x < this.sprite.x) {
			this.SetFacing(1); // Left
		}

		if (Math.abs(this.target_y - this.sprite.y) > 8) {
			if (this.target_y < this.sprite.y) {
				this.SetFacing(3); // Up
			} else if (this.target_y > this.sprite.y && this.facing == 3) {
				this.SetFacing(0); // Down
			}
		}

		if (this.IsMoving() && this.sprite.IsAnimating() == false) {
			this.sprite.StartAnimation();
		}
	}

}

/*
	This function moves the character towards its destination
*/
CharacterSprite.prototype.Update = function() {
	if (this.IsMoving()) {
		if (Math.abs(this.sprite.x-this.target_x) <= this.speed) {
			this.sprite.x = this.target_x;
		} else {
			if (this.sprite.x > this.target_x) {
				this.sprite.x -= this.speed;
			} else {
				this.sprite.x += this.speed;
			}
		}

		if (Math.abs(this.sprite.y-this.target_y) <= this.speed) {
			this.sprite.y = this.target_y;
		} else {
			if (this.sprite.y > this.target_y) {
				this.sprite.y -= this.speed;
			} else {
				this.sprite.y += this.speed;
			}
		}

		if (!this.IsMoving() && this.sprite.IsAnimating() && !this.attacking) {
			this.sprite.StopAnimation();
			this.sprite.current_frame = 1;
		}
	}
}

CharacterSprite.prototype.StartAttacking = function() {
	this.attacking = true;
	// Choose the right row for attack animation
	switch (this.facing) {
		case 0:
		case 1:
			this.sprite.row = 3;
			break;
		case 2:
			this.sprite.row = 4;
			break;
		case 3:
			this.sprite.row = 5;
		break;
	}

	if (this.sprite.IsAnimating() == false) {
		this.sprite.StartAnimation();
	}
}

CharacterSprite.prototype.StopAttacking = function() {
	this.attacking = false;
	this.sprite.StopAnimation();
	this.sprite.current_frame = 1;
	this.SetFacing(this.facing); // Reset facing and row
}