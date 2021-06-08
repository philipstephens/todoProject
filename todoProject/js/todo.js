var bcrypt = dcodeIO.bcrypt;

console.log("Hello there!");

const saltRounds = 12;
const signupButton = document.getElementById("btn-signup");
const loginError   = document.getElementById("d_login-error");
const clearButton  = document.getElementById("btn-clear");
const enterSignupButton = document.getElementById("btn-enter");
const agreeCheckMark = document.getElementById("cb-agree");
const password1 = document.getElementById("i_password");
const password2 = document.getElementById("ir_password");
const emailAddress = document.getElementById("i_email");
const firstname = document.getElementById("i_firstname");
const lastname = document.getElementById("i_lastname");
const signupDetails = document.getElementById("signup-details")

signupButton.addEventListener("click", submitSignup );
clearButton.addEventListener("click", signupClear );
enterSignupButton.addEventListener("click", submitEnterSignup);

function submitSignup() {
  const email = emailAddress.value;

  if(getItem(email) == "true") {
    loginError.innerText = "Account already exists !";
    return;
  }

  hashed_password = makeHash(saltRounds, password1.value);

  const id_firstname = email + "_firstname";
  const id_lastname = email  + "_lasttname";
  const id_password = email + "_password";
  const id_done = "_done";
  const id_tasks = email + "_tasks";

  done = [];
  tasks = [];

  localStorage.setitem(id_firstname, firstname.value);
  localStorage.setitem(id_lastname,  lastname.value);
  localStorage.setitem(id_password,  hashed_password);
  localStorage.setitem(id_done,      JSON.stringify(done));
  localStorage.setitem(id_tasks,     JSON.stringify(tasks));

  signupDetails.display = "none";
}

function signupClear() {
  alert("hello!");
  loginError.innerText = "";
  firstname.value = "";
  lastname.value = "";
  emailAddress.value = "";
  password1.value = "";
  password2.value = "";
  password1.style.backgroundColor = "#FFFFFF";
  password2.style.backgroundColor = "#FFFFFF";
  firstname.focus();
}

function submitEnterSignup() {
  alert();
  if(validateName(firstname) == false) {
    loginError.innerText = "First name must only contain 3-15 letters.";
    return;
  }

  if(validateName(lastname) == false) {
    loginError.innerText = "Last name must only contain 3-15 letters.";
    return;
  }

  if(validateEmail(emailAddress) == false) {
    loginError.innerText = "You have entered an invalid email address!";
    emailAddress.focus();
    return;
  }

  if(validatePassword(password1) == false) {
    loginError.innerText = "Password must have 7 to 16 characters containing only characters, numeric digits," +
        "underscore, and begin with a character."
    return;
  }

  if(password1.value != password2.value) {
    password1.style.backgroundColor = "#FF0000";
    password2.style.backgroundColor = "#FF0000";
    loginError.innerText = "The passwords do not match.";
    return;
  } else {
    if(password1.value.trim() != "") {
      password1.style.backgroundColor = "#008800";
      password2.style.backgroundColor = "#008800";
    } else {
      password1.style.backgroundColor = "#FFFFFF";
      password2.style.backgroundColor = "#FFFFFF";
    }
  }

  if(agreeCheckMark.checked == false ) {
    loginError.innerText = "You must accept the terms of use to continue.";
  } else {
    loginError.innerText = "";
  }

  submitSignup();
}

function validateEmail(emailText)
{
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(emailText.value.match(mailformat)) {
    return true;
  }

  return false;
}

function validatePassword(inputtxt)
{
  var passw=  /^[A-Za-z]\w{7,14}$/;
  if(inputtxt.value.match(passw))
  {
    return true;
  }
  else
  {
    return false;
  }
}

function validateName(inputtxt) {
  var name= /[a-zA-Z]{3,15}/g
  if(inputtxt.value.match(name))
  {
    return true;
  }
  else
  {
    return false;
  }
}

function makeHash(saltRounds, password) {
  var hashed_password = "";
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      hashed_password = hash;
      // Store hash in database here
    });
  });
  return hashed_password;
}

function verifyPassword(password2, hash) {
  var password_matches = false;
  bcrypt.compare(password2, hash, function(err, result) {
    password_matches = result;
  });
  return password_matches;
}
