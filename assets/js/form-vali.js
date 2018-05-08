function validateCForm() {
    var x = document.forms["contact"]["name"].value;
    if (x == "") {
        alert("Please fill out your name/full name.");
        return false;
    }
    var y = document.forms["contact"]["email"].value;
    if (y == "") {
        alert("Please fill out your e-mail address!");
        return false;
    }
    var z = document.forms["contact"]["info"].value;
    if (z == "") {
        alert("Please fill out your information");
        return false;
    }
}
