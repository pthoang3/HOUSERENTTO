/*Navigation Bar */
const menu = document.querySelector('#mobile-menu');
const menuLinks=document.querySelector('.navbar_menu');
menu.addEventListener('click', function() {
menu.classList.toggle('is-active');
menuLinks.classList.toggle('active');
});

/* Promotion Section */
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
  /*setTimeout(showSlides, 200); */
} 

//get login_table
var login = document.getElementById('login_table');
 
// get login_popup_btn close login_table
var loginbtn = document.getElementById("login_popup_btn");

// get span close login_table
var span = document.getElementsByClassName("login_close")[0];
var span1= document.getElementsByClassName("navbar_links")
// button -click -> open login_table
loginbtn.onclick = function() {
    login.style.display = "block";
}

//when click outside login_table ->close span
span.onclick = function() {
    login.style.display = "none";
}

// when click outside login_table->close
window.onclick = function(event1) {
    if (event1.target == login) {
        login.style.display = "none";
    }
}
//get signup_table
    var signup = document.getElementById('signup_table');
 
    // get signup_popup_btn close signup_table
    var signupbtn = document.getElementById("signup_popup_btn");
 
    // get span close signup_table
    var span2 = document.getElementsByClassName("signup_close")[0];
 
    // button -click -> open signup_table
    signupbtn.onclick = function() {
        signup.style.display = "block";
    }
 
   //when click outside signup_table ->close span
    span2.onclick = function() {
        signup.style.display = "none";
    }
 
    // when click outside signup_table->close
    window.onclick = function(event2) {
        if (event2.target == signup) {
            signup.style.display = "none";
        }
    }
//Form validation
function validateForm(form) {
    var valid= false;
    password1 = form.psw.value; 
    password2 = form.psw2.value; 
    firstname = form.fname.value;
    lastname = form.lname.value;
    nameReg=/^([a-zA-Z])/;
    passReg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/;
    /*The string must contain at least 1 lowercase alphabetical character
(?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
(?=.*[0-9])	The string must contain at least 1 numeric character
(?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
(?=.{8,})	The string must be eight characters or longer */
    // If password not entered 
    if(firstname == '' || !nameReg.test(firstname)){
        alert ("\nPlease enter your name with only alphabetical characters"); 
        valid= false; 
    }
    else if(lastname == '' || !nameReg.test(firstname)){
            alert ("\nPlease enter your name with only alphabetical characters"); 
            valid= false; 
    }
    
    // If confirm password not entered 
    else if (password2 == ''||  !passReg.test(password2)) {
        alert ("\nPlease enter your password"); 
        valid= false;
    }  
    else if (password1 == '' || !passReg.test(password1)) {
        alert ("\nPlease enter your password with at least 8 character containing at least 1 uppercase, 1 lowercase, 1 special character and 1 number digit"); 
        valid= false; 
    }  
    // If Not same return False.     
    else if (password1 != password2) { 
        alert ("\nPassword did not match! Please try again") 
        valid= false;
    } 
  
    // If same return True. 
    else{ 
        alert("Welcome to PTH's Airbnb!") 
        valid=true; 
    } 
    return valid;
}

