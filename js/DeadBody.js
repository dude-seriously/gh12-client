/* 
	YES THIS IS A DEAD BODY CLASS
	
	DEAL WITH IT
	
*/
function DeadBody(x, y, evil) {
	this.x = x;
	this.y = y;
	this.evil = evil; // A body can not only be dead, but also evil!

	this.visible = true; // Draw me after creation

	deadBodies[deadBodies.length] = this; // Add to the end of the array
	var self = this; // Point at myself
	setTimeout(function() {self.visible = false;}, 5000); // Quick timeout hack to remove body
}