function showPage(pageId) {
	document.querySelectorAll('.landing, .booking').forEach(page => {
		page.classList.remove('active');
	});
	
	document.getElementById(pageId).classList.add('active');
}

function showElement(elementId) {
	document.getElementById(elementId).classList.add('active');
}

function hideElement(elementId) {
	document.getElementById(elementId).classList.remove('active');
}

function showTab(currentTab, newTab) {
	document.getElementById(currentTab).classList.remove('active');
	document.getElementById(newTab).classList.add('active');
	
	// Special handling for passenger tab
	if (newTab === 'passenger') {
		displayPassengerForms();
	}
}

function showEmpty() {
	const flightCard = document.createElement('div');
	flightCard.className = 'flight-card';
	flightCard.innerHTML = `
		<div class="empty-section">
			<p>Sorry but there are no available schedules</p>
		</div>
	`;

	flightList.appendChild(flightCard);
}

function validateEmail(email) {
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
	let cleanPhone = phone.replace(/[^\d+]/g, '');
	
	if (cleanPhone.startsWith('63')) {
		cleanPhone = cleanPhone.substring(2);
	} else if (cleanPhone.startsWith('+63')) {
		cleanPhone = cleanPhone.substring(3);
	} else if (cleanPhone.startsWith('09')) {
		cleanPhone = cleanPhone.substring(1);
	}
	
	if (cleanPhone.length !== 10) {
		return {
			isValid: false,
		};
	}
	
	if (!cleanPhone.startsWith('9')) {
		return {
			isValid: false,
		};
	}

	const invalidChars = /[^\d\s\+]/;
	if (invalidChars.test(phone)) {
		return {
			isValid: false,
		};
	}
	return { isValid: true };
}

 