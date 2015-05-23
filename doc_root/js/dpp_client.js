DppClient = function(userId) {
    this.userId = userId;
    this.client = new Faye.Client('/ddp');
    this.handlers = {
	join: function(message) {
	    // 自分でなければ
	    if (message.userId != this.userId) {
		// 既知のメンバーではなければ
		if (!message.userId in this.members) {
		    if (message.type in this.appHandlers) {
			appHandler = this.appHandlers(message.type);
			appHandler(message.userId);
		    }
		    this.send("keep_alive", {});
		}
		members(message.userId) = Date.now();
	    }
	},
	leave: function(message) {
	    // 既知のメンバーであれば
	    if (message.userId in this.members) {
		delete members(message.userId);
		if (message.type in this.appHandlers) {
		    appHandler = this.appHandlers(message.type);
		    appHandler(message.userId);
		}
	    }
	},
	trash: function(message) {
	    // 既知のメンバーであれば
	    if (message.userId in this.members) {
		members(message.userId) = Date.now();
		if (message.type in this.appHandlers) {
		    appHandler = this.appHandlers(message.type);
		    appHandler(message.userId, message.roomId);
		}
	    }
	},
	keep_alive: function(message) {
	    if (message.userId in this.members) {
		members(message.userId) = Date.now();
	    } else {
		members(message.userId) = Date.now();
		if (message.type in this.appHandlers) {
		    appHandler = this.appHandlers(message.type);
		    appHandler(message.userId, message.roomId);
		}
	    }
	},
	move: function(message) {
	    if (message.userId in this.members) {
		members(message.userId) = Date.now();
		if (message.type in this.appHandlers) {
		    appHandler = this.appHandlers(message.type);
		    appHandler(message.userId, message.roomId);
		}
	    }
	}
    };
    this.appHandlers = {};
    this.members = {};
};
DppClient.prototype = {
    start: function() {
	this.client.subscribe(DppClient.TOPIC, function(message) {
	    if (!message.type in this.handlers) {
		console.warn("Unknown message type: " + message.type);
		return;
	    }
	    handler = this.handlers(message.type);
	    handler(message);
	});
	this.send("join", {});
    },

    send: function(type, message) {
	message("type") = type;
	message("userId") = this.userId;
	this.client.publish(DppClient.TOPIC, message);
    },

    on: function(type, handler) {
	this.appHandlers(type) = handler;
    },
};

DppClient.TOPIC = "/home";


