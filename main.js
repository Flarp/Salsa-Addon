/*
Copyright (C) 2017 Nathan Nichols

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL NATHAN NICHOLS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// runs when button is clicked
free_salsa_submit = function( e ){
	console.log("\nFORM SUBMITTED\n");
	var orig_url = document.location.href;
	var possible_matches = document.getElementById("mainForm").children[0].children[0];
	var url = possible_matches.action;
	var required_fields = document.getElementsByName("required")[0].value.split(",");
	var field;
	var form_good = true;
	var form_data = {};
	for(var i = 0; i < required_fields.length; i++){
		if(document.getElementsByName(required_fields[i])[0] !== undefined){
			field = document.getElementsByName(required_fields[i])[0];
			form_data[field.name] = field.value;		
			if(field != ""){
				//console.log(field.value);
			}	else{
				form_good = false;
				//console.log("[blank]");
			}
		}
	}
	if(!form_good){
		window.alert("please fill out required fields.");
		return false; // will cause the form not to submit
	}else{
		var redirect;
		var http1 = new XMLHttpRequest();
		http1.open('POST', url, true);
		http1.onload = function (){
			redirect = document.body.innerHTML.substr(document.body.innerHTML.indexOf("URL")+4,document.body.innerHTML.length);
			redirect = document.location.href.substr(0,document.location.href.indexOf(".com")+4) + redirect;
      location.assign(redirect)
		};
		http1.send(form_data);
	}
	return true;
}
// set the onsubmit function of the form to add-on's own free javascript
if(typeof(document.getElementsByClassName("salsa actions")[0]) != "undefined" ){
	var possible_matches = document.getElementById("mainForm").children[0];
	possible_matches.onsubmit = free_salsa_submit;
}
