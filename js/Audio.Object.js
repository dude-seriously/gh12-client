/**
 * @author eleventigers / http://jokubasdargis.com/
 */

Audio.Object = function (parameters, obj) {

	
	this.obj = obj;
	this.scene = audio;	

	this.panner = this.scene.context.createPanner();
	this.panner.refDistance = 10.0;
	this.panner.panningModel = 1;
	this.panner.rolloffFactor = 1;
	this.volume = this.scene.context.createGainNode();

	this.volume.connect(this.panner);
	this.volume.gain.value = 0.8;
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
	var deltaX = this.soundPosition.x - this.oldSoundPosition.x, deltaY = this.soundPosition.y - this.oldSoundPosition.y;
	this.soundDelta = {x:deltaX, y:deltaY, z:0};
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


	this.scene.loadBuffer('snd/heroMove1.wav', function(buffer){
		self.step1.buffer = buffer;	
		self.step1.playbackRate.value = Math.random()*1+2;	     
	});

	this.scene.loadBuffer('snd/heroMove2.wav', function(buffer){
		self.step2.buffer = buffer;	
		self.step1.playbackRate.value = Math.random()*3+1;	     
	});

	var rand = Math.round(Math.random());

	

	if (rand === 0){
		this.step1.noteOn(0);	
	} else {
		this.step2.noteOn(0);
	}


};





