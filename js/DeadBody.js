function DeadBody(x, y, evil) {
	this.x = x;
	this.y = y;
	this.evil = evil;

	this.visible = true;

	deadBodies[deadBodies.length] = this;
	var self = this;
	setTimeout(function() {self.visible = false;}, 5000);
}