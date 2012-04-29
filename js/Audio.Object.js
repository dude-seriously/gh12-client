/**
 * @author eleventigers / http://jokubasdargis.com/
 */

Audio.Object = function (parameters, obj) {

	
	this.obj = obj;
	this.scene = audio;	

	this.panner = this.scene.context.createPanner();
	this.panner.refDistance = 10.0;
	this.panner.panningModel = 1;
	this.panner.rolloffFactor = 2;
	this.volume = this.scene.context.createGainNode();

	this.volume.connect(this.panner);
	this.panner.connect(this.scene.context.destination);

	this.soundPosition = {x:parameters.x, y:parameters.y, z:0};
	this.oldSoundPosition;
	this.soundDelta;

	return this;

};


Audio.Object.prototype.constructor = Audio.Object; 



Audio.Object.prototype.update = function() {

	this.oldSoundPosition = this.soundPosition;
	var newPos = {x:this.obj.x, y:this.obj.y, z:0};
	this.soundPosition = newPos;
	this.soundDelta = {x:this.soundPosition.x - this.oldSoundPosition.x, y:this.soundPosition.y - this.oldSoundPosition.y, z:this.soundPosition.z - this.oldSoundPosition.z };
	this.panner.setPosition( this.soundPosition.x, this.soundPosition.y, 0 );
	this.panner.setVelocity( this.soundDelta.x, this.soundDelta.y, 0 );

};



Audio.Object.prototype.walk = function () {

	var self = this;

	this.step1 = this.scene.context.createBufferSource(mixToMono = true);
	this.step1.connect(this.volume);
	this.step1.loop = false;

	this.step2 = this.scene.context.createBufferSource(mixToMono = true);
	this.step2.connect(this.volume);
	this.step2.loop = false;


	this.scene.loadBuffer('snd/footstep1.wav', function(buffer){
		self.step1.buffer = buffer;		     
	});

	this.scene.loadBuffer('snd/footstep2.wav', function(buffer){
		self.step2.buffer = buffer;		     
	});

	this.step1.noteOn(this.scene.context.currentTime + 0.020);

};





