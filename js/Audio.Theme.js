/**
 * @author eleventigers / http://jokubasdargis.com/
 */

 Audio.Theme = function(parameters) {

 	var self = this;
 	this.scene = parameters.scene;
 	this.volume = this.scene.context.createGainNode();
 	this.volume.gain.value = parameters.volume;
 	this.volume.connect(this.scene.context.destination);
 
 	this.source = this.scene.context.createBufferSource(mixToMono = false);
 	this.source.connect(this.volume);

	this.source.loop = true;
	this.scene.loadBuffer(parameters.stream, function(buffer){
		self.source.buffer = buffer;		     
	});

	return this;

 };

 Audio.Theme.prototype.constructor = Audio.Theme;

 Audio.Theme.prototype.play = function () {

	this.source.noteOn(0);

};

Audio.Theme.prototype.stop = function () {

	this.source.noteOff(0);

};





