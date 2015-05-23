DppClient = function(userId,roomID) {
    this.userId = userId;
    this.roomId = roomID;
    this.client = new Faye.Client('/ddp');
    origThis = this;
    this.handlers = {
	join: function(message) {
	    // 自分でなければ
	    if (message.userId != origThis.userId) {
	    	$('#ring').hide();
			// 既知のメンバーではなければ
			if (!message.userId in origThis.members) {
			    if (message.type in origThis.appHandlers) {
				appHandler = origThis.appHandlers[message.type];
				appHandler(message.userId);
			    }
			    origThis.send("keep_alive", {});
			}
			origThis.members[message.userId] = Date.now();
	    }
	},
	leave: function(message) {
	    // 既知のメンバーであれば
	    if (message.userId in origThis.members) {
		delete members[message.userId];
		if (message.type in origThis.appHandlers) {
		    appHandler = origThis.appHandlers[message.type];
		    appHandler(message.userId);
		}
	    }
	},
	trash: function(message) {
	    // 既知のメンバーであれば
	    if (message.userId in origThis.members) {
		origThis.members[message.userId] = Date.now();
		if (message.type in origThis.appHandlers) {
		    appHandler = origThis.appHandlers[message.type];
		    appHandler(message.userId, message.roomId);
		}
	    }
	},
	keep_alive: function(message) {
	    if (message.userId in origThis.members) {
		origThis.members[message.userId] = Date.now();
	    } else {
		origThis.members[message.userId] = Date.now();
		if (message.type in origThis.appHandlers) {
		    appHandler = origThis.appHandlers[message.type];
		    appHandler(message.userId, message.roomId);
		}
	    }
	},
	move: function(message) {
	    if (message.userId in origThis.members) {
		origThis.members[message.userId] = Date.now();
		if (message.type in origThis.appHandlers) {
		    appHandler = origThis.appHandlers[message.type];
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
	origThis = this;
	this.client.subscribe(DppClient.TOPIC, function(message) {
	    if (!message.type in origThis.handlers) {
		console.warn("Unknown message type: " + message.type);
		return;
	    }
	    handler = origThis.handlers[message.type];
	    handler(message);
	});
	this.send("join", {});
    },

    send: function(type, message) {
	message.type = type;
	message.userId = this.userId;
	this.client.publish(DppClient.TOPIC, message);
    },

    on: function(type, handler) {
	this.appHandlers(type) = handler;
    },
};

DppClient.TOPIC = "/home";

