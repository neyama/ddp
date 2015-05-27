
var sound1;
var k;
Zepto(function($){
	$('#ring').hide()
	var myObj = this;
	myObj.client = {};
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
			hoge = Math.floor(Math.random()*10000);
			
    		var isConnect = k.findWithName("konashi#4-1903");

			myObj.client[hoge] = new DppClient(this.id,this.room);

			myObj.client[hoge].start();


	    	//konashiを認識したらクライアント側がスタートする　TODO

		 //  	if (isKonashiJS()) {
			//     k.on(k.KONASHI_EVENT_READY, function(myObj,hoge) {
			// 		myObj.client[hoge] = new DppClient(this.id,this.room);

			// 		myObj.client[hoge].start();

			// 		sound1 = new Audio("http://jsrun.it/assets/f/s/a/J/fsaJx.mp3");
			// 		sound1.load();
			// 		sound1.play();
			// 	});
			// }


	});
/*
    k.ready(function() {
      $("#message1").append($("<p />", { text:"event ready" }));
      //sound1.load();
      $("#message1").append($("<p />", { text:"loaded sound" }));
    });
    $("#message1").append($("<p />", { text:"looking for konashi" }));
*/

    	// alert(isConnect);
    	// if(isConnect === 0){
    	// 	alert('OK');
    	// }else{
    	// 	alert('fail');
    	// }
	// }

});

function isKonashiJS() {
  return /iP(hone|od|ad)/.test(navigator.platform);
}