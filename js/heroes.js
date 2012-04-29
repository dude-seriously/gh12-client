var heroContainer = null;

function HeroContainer() {
	this.container = new Object();
	
	this.OnAdd = new Array();
	this.OnUpdate = new Array();
	this.OnRemove = new Array();
}

HeroContainer.prototype.Add = function(data) {
	if (!this.container[data.id]) {
		this.container[data.id] = new Hero({ id:data.id, x:data.x, y:data.y, speed:data.s });
		
		for(var i in this.OnAdd) {
			this.OnAdd[i](this.container[data.id]);
		}
		
		return this.container[data.id];
	} else {
		return null;
	}
}

HeroContainer.prototype.Get = function(id) {
	if (this.container[id]) {
		return this.container[id];
	} else {
		return null;
	}
}

HeroContainer.prototype.Update = function(data) {
	if (this.container[data.id]) {

		var posChanged = false;
		if (data.x) {
			posChanged = true;
			this.container[data.id].x = data.x;
		}
		if (data.y) {
			posChanged = true;
			this.container[data.id].y = data.y;
		}

		if (posChanged) {
			this.container[data.id].Move();
		}

		if (data.s) {
			this.container[data.id].speed = (32.0 / data.s) * spF;
			this.container[data.id].characterSprite.speed = this.container[data.id].speed;
		}

		for(var i in this.OnUpdate) {
			this.OnUpdate[i](this.container[data.id]);
		}
		
		return true;
	} else {
		return false;
	}
}

HeroContainer.prototype.Remove = function(id) {
	if (this.container[id]) {
		for(var i in this.OnRemove) {
			this.OnRemove[i](this.container[id]);
		}
		
		this.container[id] = null;
	}
}

HeroContainer.prototype.AddOrUpdate = function(data) {
	if (!this.Update(data)) {
		this.Add(data);
	}
}

HeroContainer.prototype.AddOrGet = function(data) {
	var result = this.Add(data);
	if (result) {
		return result;
	} else {
		return this.container[data.id];
	}
}

HeroContainer.prototype.AddEventOnAdd = function(func) {
	this.OnAdd.push(func);
}
HeroContainer.prototype.AddEventOnUpdate = function(func) {
	this.OnUpdate.push(func);
}
HeroContainer.prototype.AddEventOnRemove = function(func) {
	this.OnRemove.push(func);
}

function Hero() {
	this.id = 0;

	this.x = 0;
	this.y = 0;
	this.speed = 0;
	
	for (var n in arguments[0]) {
		if (arguments[0][n]) {
			this[n] = arguments[0][n];
		}
	}

	this.characterSprite = new CharacterSprite(this.x * 32, this.y * 32, new Sprite(imgHero, 0, -16, 32, 40, 0, 140, 3, true, 0), (32.0 / this.speed) * spF);
}

Hero.prototype.Move = function() {
	this.characterSprite.MoveTo(this.x * 32, this.y * 32);
}

function InitHeroes() {
	heroContainer = new HeroContainer();
	
	client.AddCallBack('heroAdd', function(data) {
		heroContainer.AddOrUpdate(data);
	});

	client.AddCallBack('heroUpdate', function(data) {
		heroContainer.AddOrUpdate(data);
	});

	client.AddCallBack('heroRemove', function(data) {
		heroContainer.Remove(data.id);
	});
}