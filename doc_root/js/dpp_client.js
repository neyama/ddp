DppClient = function(userId,roomID) {
    this.userId = userId;
    this.roomId = roomID;
    this.client = new Faye.Client('/ddp');
    this.appHandlers = {};
    this.members = {};
    var origThis = this;
    this.handlers = {
		join: function(message) {
			console.log('origThis');
			console.log(origThis);
			console.log('message');
			console.log(message);
		    // 自分以外
		    if (message.userId != origThis.userId) {
		    	$('#ring').hide();
    		    //joinしてきた人の位置を表示する
    		    beacon(message.roomid);
			    // origThis.client.publish(DppClient.TOPIC, message);
				// 既知のメンバーではなければ
				if (!(message.userId in origThis.members)) {
				    if (message.type in origThis.appHandlers) {
						appHandler = origThis.appHandlers[message.type];
						appHandler(message.userId);
				    }
					origThis.send("keep_alive", message);
					origThis.members[message.userId] = Date.now();
			    }
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
			console.log(message);
			//既知のメンバーであれば
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
		},
    };
	function beacon(roomid){

	var w = $('#' + roomid).css('top');
	var h = $('#' + roomid).css('left');
	//left - 35
	//top - 25

	$('#ring').css('top',w);
	$('#ring').css('left',h);
	var interval = setInterval(
		function(){
			$('#ring').toggle();
		},1000
	);
	
	var clear = function(){
		clearInterval(interval);
		$('#ring').hide();
	};
	setTimeout(clear,5000);

}

};
DppClient.prototype = {
    start: function() {
		origThis = this;
		//subを設定する
		this.client.subscribe(DppClient.TOPIC, function(message) {
			//登録されていないメソッドの場合
		    if (!message.type in origThis.handlers) {
				console.log("Unknown message type: " + message.type);
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
		message.roomid = this.roomId;
		this.client.publish(DppClient.TOPIC, message);
    },

    on: function(type, handler) {
		this.appHandlers(type) = handler;
    },
};

DppClient.TOPIC = "/home";

