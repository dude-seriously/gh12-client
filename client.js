function Client(address) {
	Log('client', 'creating');
	
	this.socket = null;
	this.connected = false;
	
	try {
		this.socket = new WebSocket(address);
	} catch(error) {
		this.socket = null;
	}
	
	if (!this.socket) {
		try {
			this.socket = new MozWebSocket(address);
		} catch(error) {
			this.socket = null;
		}
	}
	
	if (this.socket) {
		this.socket.link = this;
		
		Log('client', 'created');
		
		this.OnConnect = null;
		this.OnTimeout = null;
		this.OnDisconnect = null;
		
		this.callbacks = new Object();
		
		this.Trigger = function(packet) {
			if (this.callbacks[packet.type]) {
				if (packet.type !== 'userUpdate' &&
					packet.type !== 'mapData') {
					
					Log('packet', 'received: ' + JSON.stringify(packet));
				}
				for(var i in this.callbacks[packet.type]) {
					this.callbacks[packet.type][i](packet);
				}
			} else {
				LogW('packet', 'unatached event for packet: ' + JSON.stringify(packet));
			}
		}
		
		this.socket.onopen = function() {
			LogW('client event', 'onopen');
			this.link.connected = true;
			if (this.link.OnConnect) {
				this.link.OnConnect();
			}
		}
		
		this.socket.onclose = function(data) {
			LogW('client event', 'onclose');
			if (this.link.connected) {
				if (this.link.OnDisconnect) {
					this.link.OnDisconnect();
				}
			} else {
				if (this.link.OnTimeout) {
					this.link.OnTimeout();
				}
			}
			this.link.connected = false;
		}
		
		this.socket.onerror = function(data) {
			LogE('client event', 'onerror');
			if (this.link.connected) {
				if (this.link.OnDisconnect) {
					this.link.OnDisconnect();
				}
			} else {
				if (this.link.OnTimeout) {
					this.link.OnTimeout();
				}
			}
		}
		
		this.socket.onmessage = function(event) {
			var packet = null;
			try {
				packet = new Packet(JSON.parse(event.data));
			} catch(error) {
				LogE('packet', 'error parsing JSON: ' + event.data);
			}
			if (packet != null) {
				if (packet.type) {
					this.link.Trigger(packet);
				} else {
					LogW('packet', 'type is not defined: ' + event.data);
				}
			}
		}
	} else {
		LogE('client', 'websockets not supported');
	}
}

Client.prototype.Send = function(data) {
	if (this.socket) {
		this.socket.send(data);
	}
}

Client.prototype.AddCallBack = function(name, func) {
	if (this.socket) {
		if (!this.callbacks[name]) {
			this.callbacks[name] = new Array();
		}
		this.callbacks[name].push(func);
	}
}