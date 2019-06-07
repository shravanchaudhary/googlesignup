var reg_container, phone_container;

function iniVar(){
	reg_container = document.getElementById("reg_container");
	phone_container = document.getElementById("phone_container");
}

function first_page() {
	toggledisplay(reg_container,"block",phone_container,"none");
	document.getElementById("password").value = "";
	document.getElementById("confirm").value = "";
}
	
function second_page() {
	document.getElementById("phone_form").style.display = "block";
	document.getElementById("verification_form").style.display = "none";
}

function toggledisplay(elem1,val1,elem2,val2){
	elem1.style.display = val1;
	elem2.style.display = val2;
}

function setdisplay(elem,val){
	elem.style.display = val;
}

function validate_form(){
	var first_name_tag = document.getElementById("first_name");               
    var last_name_tag = document.getElementById("last_name");
    var password_tag = document.getElementById("password");
    var confirm_tag =  document.getElementById("confirm");
    var email_tag = document.getElementById("email");

    var fname = first_name_tag.value;
    var lname = last_name.value;
    var password = password_tag.value;
    var confirm = confirm_tag.value;
    var email = email_tag.value;

    var fn_warning_div = document.getElementById("fn_warning");
    var ln_warning_div = document.getElementById("ln_warning");
    var email_warning_div = document.getElementById("email_warning");
    var password_warning_div = document.getElementById("password_warning");
    var confirm_warning_div = document.getElementById("confirm_warning");
    var email_info_div = document.getElementById("emailinfo");
    var password_info_div = document.getElementById("passwordinfo");
    function reset_confirm(){
    	confirm_tag.style.borderColor = "grey";
		confirm_warning_div.innerHTML = "";
		confirm_tag.value = "";
    }

    function check_fn(){
    	var warning = "";
    	if(fname==""){
    		warning = "Enter first name";
	    }
	    if(warning){
	    	first_name_tag.style.borderColor = "red";
	    	setdisplay(fn_warning_div,"block");
	    	fn_warning_div.innerHTML = warning;
	    }else{
	    	first_name_tag.style.borderColor = "grey";
	    	setdisplay(fn_warning_div,"none");
	    }
	    return warning == "";
    }

    function check_ln(){
    	var warning = "";
    	if(lname==""){
    		warning = "Enter last name";
	    }
	    if(warning){
	    	last_name_tag.style.borderColor = "red";
	    	setdisplay(ln_warning_div,"block");
	    	ln_warning_div.innerHTML = warning;
	    }else{
	    	last_name_tag.style.borderColor = "grey";
	    	setdisplay(ln_warning_div,"none");
	    }
	    return warning == "";
    }

    function check_email(){
    	if(email.endsWith("@gmail.com")){
    		email = email.replace("@gmail.com","");
    	}
    	var email_regex = /^[\w.]+$/;
 		
    	var warning = "";
	    if(email==""){
	    	warning = "Choose a Gmail address";
	    }else if(!email_regex.test(email)){
	    	warning = "Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed."
	    }
	    if(warning){
				toggledisplay(email_info_div,"none",email_warning_div,"block");
	    	email_tag.style.borderColor = "red";
		    email_warning_div.innerHTML = warning;
	    }else{
	    	email_tag.style.borderColor = "grey";
		    email += "@gmail.com";
				toggledisplay(email_info_div,"table-row",email_warning_div,"none");
	    }
	    return warning == "";
    }

    function check_password(){
    	var warning = "";
	    if(password==""){
	    	warning = "Enter password";
	    }else if(password.length < 8 && password.length > 0){
	    	warning = "Use 8 characters or more";
	    }
	    if(warning){
	    	toggledisplay(password_info_div,"none",password_warning_div,"block");
	    	password_tag.style.borderColor = "red";
	    	reset_confirm();
	    	password_warning_div.innerHTML = warning;
	    }else{
	    	password_tag.style.borderColor = "grey";
	    	setdisplay(password_warning_div,"none");
	    }
	    return warning == "";
    }

    function check_confirm(){
    	var warning = "";
    	if(confirm==""){
	    	warning = "Confirm your password";
	    }else if(password!=confirm){
	    	warning = "Passwords do not match!";
	    }
	    if(warning){
	    	toggledisplay(password_info_div,"none",confirm_warning_div,"block");
	    	confirm_tag.style.borderColor = "red";
	    	confirm_tag.value = "";
	    	confirm_warning_div.innerHTML = warning;
	    }else{
	    	confirm_tag.style.borderColor = "grey";
	    	setdisplay(confirm_warning_div,"none");
	    }
	    return warning == "";
    }


    function check_password_strength(){
    	var strong_password_regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    	if(!strong_password_regex.test(password)){
    		toggledisplay(password_info_div,"none",password_warning_div,"block");
    		password_warning_div.innerHTML = "Please choose a stronger password. Try a mix of letters, numbers, and symbols.";
    		reset_confirm();
    		password_tag.style.borderColor = "red";
    	}else{
    		return true;
    		setdisplay(password_info_div,"block");
    	}
    }


    var valid_count = 0;
		if(check_fn()){
			valid_count++;
		}
		if(check_ln()){
			valid_count++;
		}
		if(check_email()){
			valid_count++;
		}
		if(check_password()){
			valid_count++;
			if(check_confirm()){
				valid_count++;
				if(check_password_strength()){
					valid_count++;
				}
			}
		}
		var reg_container = document.getElementById("reg_container");
		var phone_container = document.getElementById("phone_container");
		if(valid_count == 6){
			localStorage.setItem("first_name", fname);
			localStorage.setItem("last_name", lname);
			localStorage.setItem("email", email);
			localStorage.setItem("password", password);
			toggledisplay(reg_container,"none",phone_container,"block");
			return false;
		}
    return false;
}
function validate_number(){
	var phone_tag = document.getElementById("phone");
	var phone = phone_tag.value;
	var phone_warning_div = document.getElementById("phone_warning");
	var verification_form = document.getElementById("verification_form");
	var phone_form = document.getElementById("phone_form");
	var phone_number_div = document.getElementById("phone_number");
	var phone_regex = /^\d{10}$/;
	function check_phone(){
    	var warning = "";
	    if(phone==""){
	    	warning = "Please enter a phone number";
	    }else if(!phone_regex.test(phone)){
	    	warning = "This phone number format is not recognized. Please enter a valid phone number.";
	    }
	    if(warning){
	    	phone_tag.style.borderColor = "red";
	    	setdisplay(phone_warning_div,"block");
	    	phone_warning_div.innerHTML = warning;
	    }else{
	    	localStorage.setItem("phone", phone);
	    	setdisplay(phone_warning_div,"none");
			number_verifier();
	    }
	    return warning == "";
    }
    check_phone();
    return false;
}
function number_verifier(){
	var phone_form = document.getElementById("phone_form");
	var verification_form = document.getElementById("verification_form");
	var phone_number_div = document.getElementById("phone_number");
	toggledisplay(phone_form,"none", verification_form,"block");
	phone_number_div.innerHTML = localStorage.getItem("phone");
}

function validate_verification() {
	alert("Retrieve all data from localStorage and post it to the server");
	return true;
}
	    
function hide() {
  	document.getElementById("password").type = "password";
  	document.getElementById("confirm").type = "password";
  	document.getElementById("show").style.display="none";
  	document.getElementById("hide").style.display="block";
}
function show() {
    document.getElementById("password").type = "text";
  	document.getElementById("confirm").type = "text";
  	document.getElementById("show").style.display="block";
  	document.getElementById("hide").style.display="none";
}
