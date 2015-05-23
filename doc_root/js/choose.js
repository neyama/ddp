var sound1;
var k;
Zepto(function($){
	//var client = new Faye.Client('/ddp');
	//$("#message1").append($("<p />", { text:"ready" }));
	//client.publish('/foo', {text: 'Hi there'});
	//$("#message1").append($("<p />", { text:"sent" }));
	$('#home').hide();
	$('.tiled').on('click',
		function(){
			$('#buttons').hide();
			$('#home').show();
			switch(this.id){
				case "papa":
					this.room = 'room1';
				break;
				case "mama":
					this.room = 'room2';
				break;
				case "musuko":
					this.room = 'room3';
				break;
				case "musume":
					this.room = 'room4';
				break;
			}
			client = new DppClient(this.id,this.room);
			client.start();
		}
	);


  	if (isKonashiJS()) {
	    // $("#message1").append($("<p />", { text:"registering konashi handlers" }));
	    k.on(k.KONASHI_EVENT_READY, function() {
    	  sound1 = new Audio("http://jsrun.it/assets/f/s/a/J/fsaJx.mp3");
	      // $("#message1").append($("<p />", { text:"event ready" }));
	      sound1.load();
	      // $("#message1").append($("<p />", { text:"loaded sound" }));
	    });
/*
    k.ready(function() {
      $("#message1").append($("<p />", { text:"event ready" }));
      //sound1.load();
      $("#message1").append($("<p />", { text:"loaded sound" }));
    });
    $("#message1").append($("<p />", { text:"looking for konashi" }));
*/
    	var isConnect = k.findWithName("konashi#4-1903");
    	// alert(isConnect);
    	// if(isConnect === 0){
    	// 	alert('OK');
    	// }else{
    	// 	alert('fail');
    	// }
	}

});

function isKonashiJS() {
  return /iP(hone|od|ad)/.test(navigator.platform);
}