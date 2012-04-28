var userContainer = null;

function UserContainer() {
	this.container = new Object();
	
	this.OnAdd = new Array();
	this.OnUpdate = new Array();
	this.OnRemove = new Array();
}

UserContainer.prototype.Add = function(data) {
	if (!this.container[data.id]) {
		this.container[data.id] = new User({ id:data.id, name:data.n, latency:data.l });
		
		for(var i in this.OnAdd) {
			this.OnAdd[i](this.container[data.id]);
		}
		
		return this.container[data.id];
	} else {
		return null;
	}
}

UserContainer.prototype.Get = function(id) {
	if (this.container[id]) {
		return this.container[id];
	} else {
		return null;
	}
}

UserContainer.prototype.Update = function(data) {
	if (this.container[data.id]) {
		if (data.n) {
			this.container[data.id].name = data.n;
		}
		if (data.l) {
			this.container[data.id].latency = data.l;
		}
		
		for(var i in this.OnUpdate) {
			this.OnUpdate[i](this.container[data.id]);
		}
		
		return this.container[data.id];
	} else {
		return null;
	}
}

UserContainer.prototype.Remove = function(id) {
	if (this.container[id]) {
		for(var i in this.OnRemove) {
			this.OnRemove[i](this.container[id]);
		}
		
		this.container[id] = null;
	}
}

UserContainer.prototype.AddOrUpdate = function(data) {
	var user = this.Update(data);
	if (!user) {
		user = this.Add(data);
	}
	return user;
}

UserContainer.prototype.AddOrGet = function(data) {
	var result = this.Get(data.id);
	if (result) {
		return result;
	} else {
		return this.Add(data);
	}
}

UserContainer.prototype.AddEventOnAdd = function(func) {
	this.OnAdd.push(func);
}
UserContainer.prototype.AddEventOnUpdate = function(func) {
	this.OnUpdate.push(func);
}
UserContainer.prototype.AddEventOnRemove = function(func) {
	this.OnRemove.push(func);
}

var myself = null;
var MyselfSet = null;

function User() {
	this.id = -1;
	this.name = '';
	this.latency = 0;

	this.character = null;
	
	for (var n in arguments[0]) {
		if (arguments[0][n]) {
			this[n] = arguments[0][n];
		}
	}
}

function InitUsers() {
	userContainer = new UserContainer();
	
	client.AddCallBack('userAdd', function(data) {
		userContainer.AddOrUpdate(data);
	});
	
	client.AddCallBack('userOwn', function(data) {
		if (data.id != 0) {
			myself = userContainer.AddOrGet(data);
		} else {
			myself = null;
		}
		if (MyselfSet) {
			MyselfSet();
		}
	});
	
	client.AddCallBack('userRemove', function(data) {
		userContainer.Remove(data.id);
	});
	
	client.AddCallBack('userUpdate', function(data) {
		userContainer.Update(data);
	});
}