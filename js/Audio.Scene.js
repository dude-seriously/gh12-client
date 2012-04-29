/**
 * @author eleventigers / http://jokubasdargis.com/
 */


Audio.Scene = function (camera) {

    var self = this;

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
    this.compressor = this.context.createDynamicsCompressor();
    this.compressor.threshold.value = -1;
    this.compressor.ratio.value = 2;
    this.volume.connect(this.compressor);
    this.compressor.connect(this.context.destination);

    this.environments = { };

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

    this.loadEnvironment = function(name) {
        
        this.loadBuffer('snd/'+name+'.wav', function(buffer) {
            self.environments[name] = buffer;
            
        });

    };

    this.setEnvironment = function(name) {
        if (this.environments[name]) {
          var cg = 0.7, fg = 0.3;
          if (name.match(/^filter-/)) {
            cg = 1, fg = 0;
          }

          this.convolverGain.gain.value = cg;
          this.flatGain.gain.value = fg;
          this.convolver.buffer = this.environments[name];
        } else {
          this.flatGain.gain.value = 1;
          this.convolverGain.gain.value = 0;
        }
    };

    this.update = function() {

        oldCameraPosition.copy( cameraPosition );
        cameraPosition.copy( this.camera.getPosition());
        cameraDelta.sub( cameraPosition, oldCameraPosition );
        this.context.listener.setPosition( cameraPosition.x, cameraPosition.y, cameraPosition.z );
        this.context.listener.setVelocity( cameraDelta.x, cameraDelta.y, cameraDelta.z );
       
    };

    
      this.loadEnvironment('coldwind');
      this.loadEnvironment('torch');
      this.loadEnvironment('pipeinhale');
      this.loadEnvironment('strumharp');
    
      console.log(self.environments[name]);
    console.log(this.environments[name]);


};

