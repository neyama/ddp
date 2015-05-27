DppClient = function(userId,roomID) {
    this.userId = userId;
    this.roomId = roomID;
    this.client = new Faye.Client('/ddp');
    this.appHandlers = {};
    this.members = {};
    var origThis = this;
    this.handlers = {
		join: function(message) {
		    // 自分以外
		    if (message.userId != origThis.userId) {
		    	$('#ring').hide();

		  //   	//音を出す
	   //  		var isConnect = k.findWithName("konashi#4-1903");

			 //  	if (isKonashiJS()) {
				//  //    k.on(k.KONASHI_EVENT_READY, function() {
			 //  //   	  sound1 = new Audio("http://jsrun.it/assets/f/s/a/J/fsaJx.mp3");
				//  //      sound1.load();
				//  //      sound1.play();
				// 	// });
				// 	// k.ready(function(){
				// 	// 	sound1 = new Audio("http://jsrun.it/assets/f/s/a/J/fsaJx.mp3");
				// 	// 	sound1.load();
				// 	// 	sound1.play();
				// 	// });
				// }



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

		var top = $('#' + roomid).css('top');
		var left = $('#' + roomid).css('left');
		//Todo 表示位置を修正する
		// top,left には "100px"　のように値が入る。
		//正規表現で合致した部分を置換して、型変換、して計算、さらに文字列型に変更して戻す。

		top = Number(top.replace(/px/,"")) - 35;
		left = Number(left.replace(/px/,"")) - 25;

		top  = String(top) + 'px';
		left = String(left) +'px';


		$('#ring').css('top',top);
		$('#ring').css('left',left);

		var interval = setInterval(
			function(){
				$('#ring').toggle();
			},1000
		);
		
		var clear = function(){
			clearInterval(interval);
			$('#ring').hide();
		};

		setTimeout(clear,3000);

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

