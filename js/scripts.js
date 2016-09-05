var table = document.getElementById('participants'),
	users = [];

document.getElementById('save-info').onclick = function() {
	var user = {},
		firstNameField = document.getElementById('name'),
		lastNameField = document.getElementById('surname'),
		emailField = document.getElementById('email'),
		phoneField = document.getElementById('phone'),
		form = document.getElementById('registration-form');


	user.fName = firstNameField.value;
	user.lName = lastNameField.value;
	user.email = emailField.value;
	user.phone = phoneField.value;
	reEmail = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
	rePhone = new RegExp("[0-9]{10}$");

	//validation
	if(!user.fName){
		alert("Please enter your name!");
		firstNameField.focus();
		return false;
	}
	if(!user.lName){
		alert("Please enter your surname!");
		lastNameField.focus();
		return false;
	}

	//verify email if value is present
	if(user.email && (reEmail.test(user.email) == false)){
		alert("Email isn't necessary, but if you've decided to enter it, please enter it correctly!");
		emailField.focus();
		return false;
	}
	//verify phone if value is present
	if(user.phone && (rePhone.test(user.phone) == false)){
		alert("Phone isn't necessary, but if you've decided to enter it, please enter it correctly!");
		phoneField.focus();
		return false;
	}

	//if validation passed add current user to global array and render it
	users.push(user);
	renderUsers(users);


	form.reset();
};

document.getElementById('new-winner').onclick = function() {
	if(users.length > 0){
		var winner = users[random(0, users.length-1)];
		newWinner = document.getElementById('winners');
		newWinner.innerText = newWinner.innerText + ' ' +winner.fName + ' ' + winner.lName + ',' + ' ';
		/*console.log(winner);*/
	}
};

function renderUsers(users) {
	var list = '';
	for(var i = 0, maxL = users.length; i<maxL; i++){
		list+='<tr>' +
			'<td>'+users[i].fName+'</td>' +
			'<td>'+users[i].lName+'</td>' +
			'<td>'+users[i].email+'</td>' +
			'<td>'+users[i].phone+'</td>' +
			'<td class="control" onclick="editUser('+i+');">Edit</td>' +
			'<td class="control" onclick="deleteUser('+i+');">Delete</td>' +
			'</tr>'
	}
	table.innerHTML = list;
}


function random(min, max) {
	return Math.round(max - max*Math.random()+min);
}

function editUser(id){
	var editedUser = users[id],
	name = document.getElementById('name'),
	surname = document.getElementById('surname'),
	email = document.getElementById('email'),
	phone = document.getElementById('phone');

	//set data to form
	name.value = editedUser.fName;
	surname.value = editedUser.lName;
	email.value = editedUser.email;
	phone.value = editedUser.phone;
	/*console.log(editedUser);*/
	users.splice(editedUser, 1);

	
}

function deleteUser(id){
	users.splice(id, 1);
	renderUsers(users);
}
