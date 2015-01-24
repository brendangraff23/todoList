$().ready(function(){

$(document).on("submit","#add-form",function(e){
	e.preventDefault();

	if($.trim($("#addItemValue").val()).length===0){ //If the value added is blank
		//alert("Please fill in a value!");
      	$("#addItemValue").val(''); //resets field to blank
		return false;
	}

	var form = $(e.target);

    $.ajax({
            type: "POST",
            url: form.attr("action"), 
            data: form.serialize(), // serializes the form's elements.
            success: function(response) {
                console.log(response); // show response from the php script. 

			var text = $("#addItemValue").val();
			text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); //html char replace
			var newItem = "<li>\n" +
							"<span class='item-li'>" + text + "</span>\n" +
							"<a href='mark.php?as=delete&item=" + response + "' class='delete'>Delete Item</a>\n" +
							"<a href='mark.php?as=done&item=" + response + "' class='mark-complete'>Mark as complete</a>\n" +
						 "</li>";

   	//	    $("#notDone").append(newItem); // newItem append without FadeIn

   		    $(newItem).hide().appendTo("#notDone").fadeIn(700);

           	$("#addItemValue").val('');

            }
        });
});

$(document).on( "click", ".delete", function(e){
		e.preventDefault();
		listElement = $(this).closest("li"); // this selects the entire element
		listElement.detach(); //Deletes entire selected element

		 var deleteInfo = $(e.target);

		 $.ajax({
		            type: "POST",
		            url: deleteInfo.attr("href"), 
		            data: deleteInfo.serialize(), // serializes the form's elements.
		            success: function(data) {
		                console.log(data); // show response from the php script. 
		            }
		        });

		 	if(!$(document).find('.mark-incomplete').length){ //Delete "Done" Header if there are no items
 			$("#header-done").detach();
 		}

});

$(document).on( "click", ".mark-complete", function(e){
		e.preventDefault();

 		if(!$(document).find('.mark-incomplete').length){

			$("#notDone").after("<ul class='item-ul' id='donePile'></ul>"); //Adds "Done:" Header if doesn't exist yet
			var doneHeader = $("#notDone").after("<h1 id='header-done'> Done: </h1>");
			doneHeader;
		}

		var listElement = $(this).closest("li"); // this selects the entire element
		var listText = $(this).parent().find(".item-li").text(); //Text of lisat item
		
		listElement.detach(); //Removes list item

		 var markCompleteSelector = $(this);

		 $.ajax({
		            type: "POST",
		            url: markCompleteSelector.attr("href"), 
		            data: markCompleteSelector.serialize(), // serializes the form's elements.
		            success: function(response) {
		                console.log(response); // show response from the php script. 
		                
		                var text = listText
		                text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

						var newItem = "<li>\n" +
							"<span class='item-li' id='doneElement'>" + text + "</span>\n" +
							"<a href='mark.php?as=delete&item=" + response + "' class='delete'>Delete Item</a>\n" +
							"<a href='mark.php?as=incomplete&item=" + response + "' class='mark-incomplete'>Mark INCOMPLETE</a>\n" +
						"</li>";

		             //$("#donePile").append(newItem); //New Item append (without fadeIn)
		             $(newItem).hide().appendTo("#donePile").fadeIn(700);
		            }
		        });
});

$(document).on( "click", ".mark-incomplete", function(e){
		e.preventDefault();

 		var listElement = $(this).closest("li"); // this selects the entire element
		var listText = $(this).parent().find(".item-li").text(); // selects text element of list
		
		listElement.detach(); // removes list element

		 var markIncompleteSelector = $(this);

		 $.ajax({
		            type: "POST",
		            url: markIncompleteSelector.attr("href"), 
		            data: markIncompleteSelector.serialize(), // serializes the form's elements.
		            success: function(response) {
		                console.log(response); // show response from the php script. 
		                
		                var text = listText;			
		                text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
						var newItem = "<li>\n" +
							"<span class='item-li'>" + text + "</span>\n" +
							"<a href='mark.php?as=delete&item=" + response + "' class='delete'>Delete Item</a>\n" +
							"<a href='mark.php?as=done&item=" + response + "' class='mark-complete'>Mark as complete</a>\n" +
						"</li>";

		             //$("#notDone").append(newItem); // Append newItem without fadeIn();
  		             $(newItem).hide().appendTo("#notDone").fadeIn(700);
		            }
		        });

		if(!$(document).find('.mark-incomplete').length){ //Deletes "Done:" Header if no items in done pile
 			$("#header-done").detach();
 		}
});



}); 

