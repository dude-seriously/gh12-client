/**
 * @author eleventigers / http://jokubasdargis.com/
 */
var audio;

Audio.Scene = function (camera) {

    this.context = new webkitAudioContext();
    this.camera = camera;

    this.convolver = this.context.createConvolver();
    this.convolverGain = this.context.createGainNode();
    this.volume = this.context.createGainNode();
    this.mixer = this.context.createGainNode();
    this.flatGain = this.context.createGainNode();
    this.destination = this.mixer;
    this.mixer.connect(this.flatGain);
    this.mixer.connect(this.convolver);
    this.convolver.connect(this.convolverGain);
    this.flatGain.connect(this.volume);
    this.convolverGain.connect(this.volume);
    this.volume.connect(this.context.destination);

    this.environments = { enabled : false };

    var cameraPosition, oldCameraPosition, cameraDelta;
    			
    this.loadBuffer = function(file, callback) {
        var ctx = this.context;
        var request = new XMLHttpRequest();
        request.open("GET", file, true);
        request.responseType = "arraybuffer";
        request.onload = function() {
            var buffer = ctx.createBuffer(request.response, false);
            callback(buffer);
        };
        request.send();
        return request;
    };

    this.loadEnvironment = function(file) {
        var self = this;
        this.loadBuffer(file, function(buffer) {
            self.environments[name] = buffer;
        });
    };

    this.update = function() {

        oldCameraPosition.copy( cameraPosition );
        cameraPosition.copy( this.camera.getPosition());
        cameraDelta.sub( cameraPosition, oldCameraPosition );
        this.context.listener.setPosition( cameraPosition.x, cameraPosition.y, cameraPosition.z );
        this.context.listener.setVelocity( cameraDelta.x, cameraDelta.y, cameraDelta.z );
       
  };

};

