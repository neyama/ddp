Zepto(function($){
	var client = new Faye.Client('/ddp');
	//$("#message1").append($("<p />", { text:"ready" }));
	client.publish('/foo', {text: 'Hi there'});
	//$("#message1").append($("<p />", { text:"sent" }));
	$('#home').hide();
	$('.tiled').on('click',
		function(){
			$('#buttons').hide();
			$('#home').show();
		}
	);
});

