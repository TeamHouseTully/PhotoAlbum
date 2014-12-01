jQuery(document).ready(function() {	

		var URL = "https://api.parse.com/1/users";
		var PARSE_APP_ID = "w8RpxfKV4dvAI9B5mm3hDX0w1D995KKEcycW3sX8";
	    var PARSE_REST_API_KEY = "pJlAQ67ALlzu4yAGXhsJptlbIl5kMUfHdqNNfVFV";	

		
		$(document).on("click", "input[value='SignUp']", function () {		

			var username = $('input[id="userName"]').val();
			var password = $('input[id="password"]').val();
			var secondPass = $('input[id="repeatPassword"]').val();
			var email = $('input[id="email"]').val();	

			if(password === secondPass){
				
				$.ajax({
					type: "POST",
					url: URL,
					headers: {
						"X-Parse-Application-Id": PARSE_APP_ID,
	                    "X-Parse-REST-API-Key": PARSE_REST_API_KEY
					},
					data: JSON.stringify({
						"username":username,
						"password":password,
						"email":email
					}),
					success: function(data) {		
						var userId = data.objectId;

						$.ajax({
							type: "PUT",
							url: "https://api.parse.com/1/roles/MvYvFEcKJm",
							headers: {
								"X-Parse-Application-Id": PARSE_APP_ID,
	                    		"X-Parse-REST-API-Key": PARSE_REST_API_KEY
							},
							data: JSON.stringify(
								{
							        "users": {
							          "__op": "AddRelation",
							          "objects": [
							            {
							              "__type": "Pointer",
							              "className": "_User",
							              "objectId": userId
							            }
							          ]
							        }
	      						}
							),
							success: function(data) {
								alert(data);
							},
							error: function () {
								alert("ROles Ajax failed");
							}
						});
					},
					error: function() {
						alert("Ajax failed");
					}
				});
			}else{
				alert('passwords doesnt match!');
			}
		});

	


});