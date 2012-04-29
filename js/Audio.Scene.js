/**
 * @author eleventigers / http://jokubasdargis.com/
 */


Audio.Scene = function () {

    var self = this;

    this.context = new webkitAudioContext();
    this.camera = {x:0, y:0, z:0};

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
    // this.compressor = this.context.createDynamicsCompressor();
    // this.compressor.threshold.value = -1;
    // this.compressor.ratio.value = 2;
    // this.volume.connect(this.compressor);
    this.volume.connect(this.context.destination);

    var environments = new Object();
    var sounds = new Object();

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

    this.loadSound = function(name){

        this.loadBuffer('snd/'+name+'.wav', function(buffer) {
            sounds[name] = buffer;
            console.log(sounds[name]);
            
        });

    };

    this.loadEnvironment = function(name) {
        
        this.loadBuffer('snd/'+name+'.wav', function(buffer) {
            environments[name] = buffer;
            
        });

    };

    this.setEnvironment = function(name) {
        if (environments[name]) {
          var cg = 0.7, fg = 0.3;
          console.log("hi");
          if (name.match(/^filter-/)) {
            cg = 1, fg = 0;
          }

          this.convolverGain.gain.value = cg;
          this.flatGain.gain.value = fg;
          this.convolver.buffer = environments[name];
        } else {
          this.flatGain.gain.value = 1;
          this.convolverGain.gain.value = 0;
        }
    };

    this.update = function() {

        oldCameraPosition = cameraPosition;
        var newPos =  {x:this.camera.x, y:this.camera.y, z:0};
        cameraPosition = newPos;
        var deltaX = cameraPosition.x - oldCameraPosition.x, deltaY = cameraPosition.y - oldCameraPosition.y;
        cameraDelta = {x:deltaX, y:deltaY, z:0};
        this.context.listener.setPosition( cameraPosition.x, cameraPosition.y, cameraPosition.z );
        this.context.listener.setVelocity( cameraDelta.x, cameraDelta.y, cameraDelta.z);
        
    };

    // this.loadSound('footstep1');
    // this.loadSound('footstep2');


    


};

