/*
	The Sprite class for animated sprites using spritesheets
	Author: Maciej Baron
*/
function Sprite (spritesheet, dx, dy, dw, dh, row, interval, frames, pingpong) {
	this.spritesheet = spritesheet;
	this.x = dx;	// Destination x
	this.y = dy;	// Destination y
	this.dw = dw;	// Width of the frame
	this.dh = dh;	// Height of the frame
	this.row = row;	// Row in spritesheet
	this.interval = interval; // Interval between frames
	this.total_frames = frames;
	this.pingpong = pingpong;

	this.current_frame = 0;
	this.animating = false;
	this.pingpong_direction = 1;
}

Sprite.prototype.SetLocation = function (x, y) {
	this.x = x;
	this.y = y;
}

Sprite.prototype.Draw = function (context) {
	context.drawImage(this.spritesheet, this.current_frame*this.dw, this.row*this.dh, this.dw, this.dh, this.x, this.y, this.dw, this.dh);
}

Sprite.prototype.StartAnimation = function () {
	if (!this.animating) {
        this.animating = true;
        this.Animate();
    }
}

Sprite.prototype.StopAnimation = function () {
	this.animating = false;
}

Sprite.prototype.Animate = function () {
	if (this.animating == true) {
        var self = this;
        setTimeout(function() { self.Animate() }, this.interval);
        if (this.pingpong) {
            if (this.pingpong_direction == 1) {
                this.current_frame++;
                if (this.current_frame == this.total_frames) {
                    this.current_frame -= 2;
                    this.pingpong_direction = 0;
                }
            } else {
                this.current_frame--;
                if (this.current_frame == -1) {
                    this.current_frame = 1;
                    this.pingpong_direction = 1;
                }
            }
        } else {
            this.current_frame++;
            if (this.current_frame == this.total_frames) {
                this.current_frame = 0;
            }
        }
    } else {
        this.current_frame = 0;
    }
}