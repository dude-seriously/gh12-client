var charContainer = null;

function CharContainer() {
	this.container = new Object();
	
	this.OnAdd = new Array();
	this.OnUpdate = new Array();
	this.OnRemove = new Array();
}

CharContainer.prototype.Add = function(data) {
	if (!this.container[data.id]) {
		this.container[data.id] = new Character({ id:data.id, enabled:data.e, x:data.x, y:data.y, speed:data.s });
		
		for(var i in this.OnAdd) {
			this.OnAdd[i](this.container[data.id]);
		}
		
		return this.container[data.id];
	} else {
		return null;
	}
}

CharContainer.prototype.Get = function(id) {
	if (this.container[id]) {
		return this.container[id];
	} else {
		return null;
	}
}

CharContainer.prototype.Update = function(data) {
	if (this.container[data.id]) {
		var enableChanged = false;
		var enabled = this.container[data.id].enabled;
		if (data.e) {
			this.container[data.id].enabled = data.e;
			if (!enabled && this.container[data.id].enabled) {
				enableChanged = true;
			}
		}
		var posChanged = false;
		if (data.x) {
			posChanged = true;
			this.container[data.id].x = data.x;
		}
		if (data.y) {
			posChanged = true;
			this.container[data.id].y = data.y;
		}
		if (!enableChanged && posChanged) {
			this.container[data.id].Move();
		}

		if (data.s) {
			this.container[data.id].speed = 32.0 / data.s;
			this.container[data.id].characterSprite.speed = this.container[data.id].speed;
		}

		if (enableChanged) {
			this.container[data.id].Position();
		}
		
		for(var i in this.OnUpdate) {
			this.OnUpdate[i](this.container[data.id]);
		}
		
		return true;
	} else {
		return false;
	}
}

CharContainer.prototype.Remove = function(id) {
	if (this.container[id]) {
		for(var i in this.OnRemove) {
			this.OnRemove[i](this.container[id]);
		}
		
		this.container[id] = null;
	}
}

CharContainer.prototype.AddOrUpdate = function(data) {
	if (!this.Update(data)) {
		this.Add(data);
	}
}

CharContainer.prototype.AddOrGet = function(data) {
	var result = this.Add(data);
	if (result) {
		return result;
	} else {
		return this.container[data.id];
	}
}

CharContainer.prototype.AddEventOnAdd = function(func) {
	this.OnAdd.push(func);
}
CharContainer.prototype.AddEventOnUpdate = function(func) {
	this.OnUpdate.push(func);
}
CharContainer.prototype.AddEventOnRemove = function(func) {
	this.OnRemove.push(func);
}

function Character() {
	this.id = 0;

	this.x = 0;
	this.y = 0;
	this.speed = 0;
	this.enabled = false;
	
	for (var n in arguments[0]) {
		if (arguments[0][n]) {
			this[n] = arguments[0][n];
		}
	}

	this.user = userContainer.Get(this.id);
	this.user.character = this;

	this.characterSprite = new CharacterSprite(this.x * 32, this.y * 32, new Sprite(imgPlayer, 0, -24, 32, 52, 0, 140, 3, true, 0), 32.0 / this.speed);
}

Character.prototype.Position = function() {
	this.characterSprite.target_x = this.x * 32;
	this.characterSprite.target_y = this.y * 32;
	this.characterSprite.sprite.x = this.x * 32;
	this.characterSprite.sprite.y = this.y * 32;
}

Character.prototype.Move = function() {
	this.characterSprite.MoveTo(this.x * 32, this.y * 32);
}

function InitCharacters() {
	charContainer = new CharContainer();
	
	client.AddCallBack('charUpdate', function(data) {
		charContainer.AddOrUpdate(data);
	});

	client.AddCallBack('userRemove', function(data) {
		charContainer.Remove(data.id);
	});
}