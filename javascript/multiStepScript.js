var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
	var x = document.getElementsByClassName("page");
	x[n].style.display = "block";
	
	//Dynamically changes available buttons
	if (n == 0) {
		document.getElementById("prev").style.display = "none";
		document.getElementById("algoNext").style.display = "none";
		document.getElementById("next").style.display = "inline";
	} 
	else if (n == 1) {
		document.getElementById("next").style.display = "none";
		document.getElementById("algoNext").style.display = "inline";
		document.getElementById("prev").style.display = "inline";
	}
	else if (n == 2) {
		document.getElementById("next").style.display = "none";
		document.getElementById("algoNext").style.display = "none";
		document.getElementById("prev").style.display = "inline";
	}
	else if (n == x.length -1) {
		document.getElementsByClassName("button-container")[0].style.display = "none";
	}
	else {
		document.getElementById("prev").style.display = "inline";
		document.getElementById("next").style.display = "inline";
		document.getElementById("reset").style.display = "inline";
	}
	if (n == (x.length - 2)) {
		document.getElementById("next").innerHTML = "Submit";
	}
	else {
		document.getElementById("next").innerHTML = "Next";
	}

	//   ... and run a function that displays the correct step indicator:

  	fixStepIndicator(n);

}

function nextBtn(n) {
	var x = document.getElementsByClassName("page");
	if (n == 1 && !validateForm()) return false;
	x[currentTab].style.display = "none";
	currentTab += n;
	showTab(currentTab);
}

function calculate() {
	total = (document.getElementById("meet-up-hours").value * 20) + (document.getElementById("online-hours").value * 15);
	document.getElementById("result").innerHTML = "Total: $"+ total
}

function resetInfo() {
	var x = document.getElementsByClassName("page");
	var form = document.getElementById("booking-form");
	var inputs = form.getElementsByTagName("input");

	if (window.confirm("Are you sure you want to reset.")) {

		for (i = 0; i < inputs.length; i++) {
			inputs[i].value = inputs[i].defaultValue;
			inputs[i].checked = inputs[i].defaultChecked;
		}

		inputs = form.getElementsByTagName("select");
		for (i = 0; i < inputs.length; i++) {
			inputs[i].selectedIndex = 0;
		}
	}
	x[currentTab].style.display = "none";
	currentTab = 0;
	showTab(currentTab);
}

function validateForm() {
	valid = true;
	var x = document.getElementsByClassName("page");

	//validates email & input
	if (currentTab == 0) {
	 	if (
		!validateEmail(document.getElementById("emailAdd").value) ||
		!x[0].getElementsByTagName("input")[0].value ||
		!x[0].getElementsByTagName("input")[1].value
		) {
		valid = false;
		}
		//email validation highlight
		if (!validateEmail(document.getElementById("emailAdd").value)) {
			document.getElementById("emailAdd").style.backgroundColor = "#FFDDDD";
			document.getElementById("warning").innerHTML = "Please enter a valid email address (example@email.com)"
		}
		else {
			document.getElementById("emailAdd").style.backgroundColor = "#FFFFFF";
			document.getElementById("warning").innerHTML = ""
		}

		//name validation highlight
		if (!x[0].getElementsByTagName("input")[0].value) {
			x[0].getElementsByTagName("input")[0].style.backgroundColor = "#FFDDDD"
		}
		else {
			x[0].getElementsByTagName("input")[0].style.backgroundColor = "#FFFFFF"
		}

		if (!x[0].getElementsByTagName("input")[1].value) {
			x[0].getElementsByTagName("input")[1].style.backgroundColor = "#FFDDDD"
		}
		else {
			x[0].getElementsByTagName("input")[1].style.backgroundColor = "#FFFFFF"
		}
	}

	//	validate radio-sex and interestlist
	if (currentTab == 1) {
		z = document.querySelectorAll('select[name$="interests"]');
		sexChoice = document.querySelectorAll('input[name$="sex"]')
		if (
			(!z[0].value || !z[1].value || !z[2].value) ||
			(!(sexChoice[0].checked || sexChoice[1].checked || sexChoice[2].checked)) ||
			!validateAge(document.getElementById("age").value)
			) {
			valid = false;
			}

		//validates age
		if (!/^-?[\d.]+(?:e-?\d+)?$/.test(document.getElementById("age").value)) {
			document.getElementById("age").style.backgroundColor = "#FFDDDD";
			document.getElementById("warning").innerHTML = "Please enter a number for age";
		}
		else if (!validateAge(document.getElementById("age").value)) {
			document.getElementById("age").style.backgroundColor = "#FFDDDD";
			document.getElementById("warning").innerHTML = "Only ages 11 - 100 are allowed to use Mate. Sorry!";
		}
		else {
			document.getElementById("warning").innerHTML = "";
			document.getElementById("age").style.backgroundColor = "#FFFFFF";
		}
	}
	//validate hours input type
	if (currentTab == 3) {
		if (
			!validateNumHours(document.getElementById("meet-up-hours").value) ||
			!validateNumHours(document.getElementById("online-hours").value) ||
			document.getElementById("activity").value == ""
			) {
			valid = false;
		}

		if (!validateNumHours(document.getElementById("meet-up-hours").value) || !validateNumHours(document.getElementById("online-hours").value)) {
			document.getElementById("warning").innerHTML = "Hours must be numbers and within 1 - 16";
		}

		else {
			document.getElementById("warning").innerHTML = "";
		}
	}

	if (currentTab == 4) {
		if (
			!x[4].getElementsByTagName("input")[0].value ||
			!validateExpiry(document.getElementById("cardExpiry").value) ||
			!validateCardNum(document.getElementById("cardNumber").value) ||
			!validateCVV(document.getElementById("CVV").value) ||
			!document.getElementById("tickBox").checked
			) {
			valid = false;
		}
			//validates name on card
		if (!x[4].getElementsByTagName("input")[0].value) {
			x[4].getElementsByTagName("input")[0].style.backgroundColor = "#FFDDDD";
		}
		else {
			x[4].getElementsByTagName("input")[0].style.backgroundColor = "#FFFFFF";
		}
		//validates card number
		if (!validateCardNum(document.getElementById("cardNumber").value)) {
			document.getElementById("cardNumber").style.backgroundColor = "#FFDDDD";
			document.getElementById("warning").innerHTML = "Please double check card number";
		}
		else {
			document.getElementById("warning").innerHTML = "";
			document.getElementById("cardNumber").style.backgroundColor = "#FFFFFF";
		}

		//validates card expiry
		if (!validateExpiry(document.getElementById("cardExpiry").value)) {
			document.getElementById("cardExpiry").style.backgroundColor = "#FFDDDD";
			document.getElementById("warningA").innerHTML = "Your card is expired";
		}
		else {
			document.getElementById("warningA").innerHTML = "";
			document.getElementById("cardExpiry").style.backgroundColor = "#FFFFFF";
		}
		//validates cvv
		if (!validateCVV(document.getElementById("CVV").value)) {
			document.getElementById("CVV").style.backgroundColor = "#FFDDDD";
			document.getElementById("warningB").innerHTML = "CVV must contain 3 digits";
		}
		else {
			document.getElementById("warningB").innerHTML = "";
			document.getElementById("CVV").style.backgroundColor = "#FFFFFF";
		}
	}

	// If the valid status is true, mark the step as finished and valid:
	if (valid) {
		document.getElementsByClassName("step")[currentTab].className += " finish";
	}
	return valid; // return the valid status
}

//accepts string + @ + string + '.' + string + . + string
function validateEmail(email) {	
	var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}

function validateAge(age) {
	if (age > 10 && age < 101) {
		return true;
	}
	else {
		return false;
	}
}

//validates if input is number and between 0 - 17
function validateNumHours(hours) {
	if (/[0-9]/.test(hours) && hours < 17 && hours > 0) {
		return true;
	}
	else {
		return false;
	}
}
function validateCardNum(cardNumber) {
	if (/[0-9]/.test(cardNumber) && cardNumber.length == 16) {
		return true;
	}
	else {
		return false;
	}
}

function validateExpiry(expiry) {
	var expMonth = parseInt(expiry.split("/")[0]);
    var expYear = parseInt(expiry.split("/")[1]);
    var now = new Date();
    var todayYear = parseInt(now.getFullYear().toString().substr(-2));
    var todayMonth = now.getMonth();
	if (expYear > todayYear || (expYear == todayYear && expMonth > todayMonth)) {
		return true;
	}
	else {
		return false;
	}
}

function validateCVV(cvv) {
	if (/[0-9]/.test(cvv) == true && cvv.length == 3 ) {
		return true;
	}
	else {
		return false;
	}
}


function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

// Booking Algorithm

class Profile {
	
    constructor(name, age, interest, gender, imageFile) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.interest = interest;
        this.score = 0;
        this.imageFile = imageFile;
    }
    getDetails() {
        return [this.name, this.age, this.interest];
    }
    set profScore(score) {
        this.score = score;
    }
    getName() {
        return this.name;
    }

    getAge() {
        return this.age;
    }

    getInterest() {
        return this.interest;
    }

    getImageFile() {
    	return this.imageFile
    }
}

// this gives a score based on customer interest compatibility
function intScore(profile, customer) {
    let counter = 0;
    let score = 0;
    for (x in profile.interest) {
        for (y in customer[2]) {
            if (profile.interest[x] == customer[2][y]) {
                score += 1;
            }
        }
    }
    profile.profScore = score;
}

// scores the list running intScore function individually
function scoreList(list) {
    for (x in list) {
        intScore(list[x], customer)
    }
}


//grabs profiles that are within the ageGap limit of customer
function ageAprox(list, customer, newList) {
    let a = 0
	ageGap = 5
    while (newList.length < 6) {
        if (list[a].age == customer[1]) {
            newList.push(list[a]);
            a += 1;
        }
        else if (list[a].age >= customer[1] - ageGap && list[a].age <= customer[1] + ageGap) {
            newList.push(list[a]);
            a += 1;
		}
		else if (a == list.length - 1) {
			break
		}
        else {
            a += 1;
        }
    }
	//increases age gap if list < 3
	if (newList.length < 3) {
		newList.length = 0;
		ageGap += 5;
		a = 0;
		while (newList.length < 6) {
			if (list[a].age == customer[1]) {
				newList.push(list[a]);
				a += 1;
			}
			else if (list[a].age >= customer[1] - ageGap && list[a].age <= customer[1] + ageGap) {
				newList.push(list[a]);
				a += 1;
			}
			else if (a == list.length - 1) {
				break
			}
			else {
				a += 1;
			}
		}
	}
}	
//increases the age range list is less than 3

//sorts the score from highest to lowest and returns top 3
function match(list) {
    list.sort((a, b) => b.score - a.score);
    return [list[0], list[1], list[2]];
}


function checkValue(elements) {
    for (i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return elements[i].value;
        }
    }
}

//sets the results of the chosen algorithm
function setProfiles(list) {
    x = document.getElementsByClassName("choiceItem");
    for (i = 0; i < 3; i++ ) {
        x[i].getElementsByTagName("h4")[0].innerHTML = list[i].getName();
        x[i].getElementsByTagName("img")[0].src = "images/profile/" + list[i].getImageFile();
        x[i].getElementsByTagName("p")[0].innerHTML = list[i].getAge();
    }
}

//displays the chosen Mate at the end of the form
function displayChoice(id) {
	let y = document.getElementById("chosenMate");
	let x = document.getElementById(id);
	y.getElementsByTagName("h4")[0].innerHTML = x.getElementsByTagName("h4")[0].innerHTML;
	y.getElementsByTagName("img")[0].src = x.getElementsByTagName("img")[0].src;
	y.getElementsByTagName("p")[0].innerHTML = x.getElementsByTagName("p")[0].innerHTML;
	nextBtn(1);
}


function main() {
  //create profiles
  profile1 = new Profile('Pam Beesly', 30, ['Art', 'Painting', 'Gardening'], 'F', "profile1.png");
  profile2 = new Profile('Erin Hannon', 25, ['Television', 'Music', 'Traveling'], 'F', "profile2.png");
  profile3 = new Profile('Ryan Howard', 20, ['Sports', 'Gaming', 'Technology'], 'M', "profile3.png");
  profile4 = new Profile('Kelly Kapoor', 35, ['Television', 'Dancing', 'Shopping'], 'F', "profile4.png");
  profile5 = new Profile('Jim Halpert', 31, ['Fishing', 'Gaming', 'Sports'], 'M', "profile5.png");
  profile6 = new Profile('Dwight Schrute', 33, ['Fishing', 'Gaming', 'Gardening'], 'M', "profile6.png");
  profile7 = new Profile('Creed Batton', 65, ['Traveling', 'Collecting', 'Reading'], 'M', "profile7.png");
  profile8 = new Profile('Michael Scott', 40, ['Movies', 'Television', 'Acting'], 'M', "profile8.png");
  profile9 = new Profile('Andy Bernard', 45, ['Music', 'Singing', 'Sports'], 'M', "profile9.png");
  profile10 = new Profile('Oscar Nunez', 38, ['Dancing', 'Collecting', 'Reading'], 'M', "profile10.png");
  profile11 = new Profile('Meredith Palmer', 18, ['Singing', 'Dancing', 'Technology'], 'F', "profile11.png");
  profile12 = new Profile('Kevin Malone', 60, ['Sleeping', 'Reading', 'Cooking'], 'M', "profile12.png");
  profile13 = new Profile('Stanley Hudson', 58, ['Sleeping', 'Gaming', 'Reading'], 'M', "profile13.png");
  profile14 = new Profile('Toby Flenderson', 19, ['Sleeping', 'Collecting', 'Reading'], 'M', "profile14.png");
  profile15 = new Profile('Nellie Bertram', 22, ['Dancing', 'Gardening', 'Cooking'], 'F', "profile15.png");
  profile16 = new Profile('Darryl Philbin', 28, ['Music', 'Sports', 'Gaming'], 'M', "profile16.png");
  profile17 = new Profile('Holly Flax', 39, ['Movies', 'Television', 'Acting'], 'F', "profile17.png");
  profile18 = new Profile('Jan Levinson', 42, ['Music', 'Shopping', 'Dancing'], 'F', "profile18.png");
  profile19 = new Profile('David Wallace', 53, ['Reading', 'Sports', 'Fitness'], 'M', "profile19.png");
  profile20 = new Profile('Pete Miller', 23, ['Music', 'Sports', 'Fitness'], 'M', "profile20.png");
  profile21 = new Profile('Gabe Lewis', 23, ['Collecting', 'Movies', 'Reading'], 'M', "profile21.png");

  //creating list of the profiles
  const profList = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9, profile10,
                    profile11, profile12, profile13, profile14, profile15, profile16, profile17, profile18, profile19, profile20, profile21]

  profList.sort((a, b) => a.age - b.age);

  // assigning variables
  let custfName = document.getElementById("fName").value;
  let custlName = document.getElementById("lName").value;
  let custAge = parseInt(document.getElementById("age").value);
  let custInterest1 = document.getElementById("interest1").value;
  let custInterest2 = document.getElementById("interest2").value;
  let custInterest3 = document.getElementById("interest3").value;
  let custSex = checkValue(document.querySelectorAll('input[name$="sex"]'))

  customer = [custfName + ' ' + custlName, custAge, [custInterest1, custInterest2, custInterest3], custSex];
  const matchList3 = [];
 

  
  //performing functions
  validateForm();
  ageAprox(profList, customer, matchList3);
  scoreList(matchList3);
  const mateList = match(matchList3);
  setProfiles(mateList);
  nextBtn(1);

}



