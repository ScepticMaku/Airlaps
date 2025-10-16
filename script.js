const roundTripFlights = [
	{
		id: 1,
		flightNo: "5J 560",
		from: "Manila",
		to: "Cebu",
		departDate: "2023-11-15",
		departTime: "08:00 AM",
		returnDate: "2023-11-20",
		returnTime: "04:30 PM",
		price: 3500,
		seats: 45,
		duration: "1h 15m",
		fareType: "Promo Fare",
		terminal: "Terminal 3"
	},
	{
		id: 2,
		flightNo: "PR 1825",
		from: "Manila",
		to: "Cebu",
		departDate: "2023-11-15",
		departTime: "11:30 AM",
		returnDate: "2023-11-20",
		returnTime: "07:15 PM",
		price: 4200,
		seats: 32,
		duration: "1h 20m",
		fareType: "Regular Fare",
		terminal: "Terminal 2"
	},
	{
		id: 3,
		flightNo: "5J 782",
		from: "Manila",
		to: "Cebu",
		departDate: "2023-11-15",
		departTime: "03:45 PM",
		returnDate: "2023-11-20",
		returnTime: "10:20 PM",
		price: 3100,
		seats: 18,
		duration: "1h 10m",
		fareType: "Promo Fare",
		terminal: "Terminal 3"
	}
];

const oneWayFlights = [
	{
		id: 4,
		flightNo: "5J 564",
		from: "Manila",
		to: "Cebu",
		departDate: "2023-11-15",
		departTime: "09:15 AM",
		price: 2800,
		seats: 52,
		duration: "1h 15m",
		fareType: "Promo Fare",
		terminal: "Terminal 3"
	},
	{
		id: 5,
		flightNo: "PR 1830",
		from: "Manila",
		to: "Cebu",
		departDate: "2023-11-15",
		departTime: "01:20 PM",
		price: 3500,
		seats: 28,
		duration: "1h 20m",
		fareType: "Regular Fare",
		terminal: "Terminal 2"
	},
	{
		id: 6,
		flightNo: "5J 788",
		from: "Manila",
		to: "Cebu",
		departDate: "2023-11-15",
		departTime: "06:40 PM",
		price: 2600,
		seats: 12,
		duration: "1h 10m",
		fareType: "Promo Fare",
		terminal: "Terminal 3"
	}
];

let bookingData = {
	flightType: "",
	from: "",
	to: "",
	departDate: "",
	returnDate: "",
	passengers: 1,
	selectedFlight: null,
	passengerInfo: []
};

const flightOptions = document.getElementsByName('flight-type');
const returnDate = document.getElementById('return');
const searchFlightsBtn = document.getElementById('search-flights');
const flightList = document.getElementById('flight-list');
const passengerForms = document.getElementById('passenger-forms');
const submitPassengersBtn = document.getElementById('submit-passengers');
const passengerSummary = document.getElementById('passenger-summary');
const flightSummary = document.getElementById('flight-summary');
const bookNowBtn = document.getElementById('book-now');
const successMessage = document.getElementById('success-message');
const finishBookingBtn = document.getElementById('finish-booking');

document.getElementById('depart-date').value = '2023-11-15';
document.getElementById('return-date').value = '2023-11-20';

flightOptions.forEach(option => {
	option.addEventListener('click', () => {
		const flightType = option.getAttribute('data-type');
		bookingData.flightType = flightType;
		
		if (flightType === 'oneway') {
			returnDate.style.display = 'none';
		} else {
			returnDate.style.display = 'block';
		}
	});
});

searchFlightsBtn.addEventListener('click', () => {
	bookingData.from = document.getElementById('from').value;
	bookingData.to = document.getElementById('to').value;
	bookingData.departDate = document.getElementById('depart-date').value;
	bookingData.returnDate = document.getElementById('return-date').value;
	bookingData.passengers = parseInt(document.getElementById('passengers').value);

	displayFlights();
	showTab('booking-details','flights');
});

function displayFlights() {
	flightList.innerHTML = '';
	
	const flights = bookingData.flightType === 'roundtrip' ? roundTripFlights : oneWayFlights;
	
	if(bookingData.from === '' && bookingData.to === '' || !(bookingData.from === 'Manila' && bookingData.to === 'Cebu')) {
		showEmpty();
		return;
	}
	
	if(!(bookingData.DepartDate === '2023-11-15' || bookingData.returnDate === '2023-11-20')) {
		showEmpty();
		return;
	}
	
	flights.forEach(flight => {
		const flightCard = document.createElement('div');
		flightCard.className = 'flight-card';
		
		const isRoundTrip = bookingData.flightType === 'roundtrip';
		
		flightCard.innerHTML = `
			<div class="flight-header">
				<div>
					<h3>${flight.from} to ${flight.to}</h3>
					<p>Flight: ${flight.flightNo} | ${flight.fareType}</p>
				</div>
				<div class="price">₱${flight.price.toLocaleString()}</div>
			</div>
			<div class="flight-info">
				<div>
					<div class="flight-details">
						<div class="detail">
							<span class="detail-label">Departure</span>
							<span class="detail-value">${flight.departDate} | ${flight.departTime}</span>
						</div>
						${isRoundTrip ? `
						<div class="detail">
							<span class="detail-label">Return</span>
							<span class="detail-value">${flight.returnDate} | ${flight.returnTime}</span>
						</div>
						` : ''}
						<div class="detail">
							<span class="detail-label">Duration</span>
							<span class="detail-value">${flight.duration}</span>
						</div>
						<div class="detail">
							<span class="detail-label">Seats Available</span>
							<span class="detail-value">${flight.seats}</span>
						</div>
						<div class="detail">
							<span class="detail-label">Terminal</span>
							<span class="detail-value">${flight.terminal}</span>
						</div>
					</div>
				</div>
				<button class="btn select-flight" data-id="${flight.id}">Select</button>
			</div>
		`;
		
		flightList.appendChild(flightCard);
	});
	document.querySelectorAll('.select-flight').forEach(button => {
		button.addEventListener('click', (e) => {
			const flightId = parseInt(e.target.getAttribute('data-id'));
			const flights = bookingData.flightType === 'roundtrip' ? roundTripFlights : oneWayFlights;
			bookingData.selectedFlight = flights.find(flight => flight.id === flightId);
			showTab('flights', 'passenger');
		});
	});
}

function displayPassengerForms() {
	passengerForms.innerHTML = '';
	
	for (let i = 1; i <= bookingData.passengers; i++) {
		const form = document.createElement('div');
		form.className = 'passenger-form';
		form.innerHTML = `
			<h3>Passenger ${i}</h3>
			<div class="form-group">
				<label for="passenger${i}-firstname">First Name</label>
				<input type="text" id="passenger${i}-firstname" required />
			</div>
			<div class="form-group">
				<label for="passenger${i}-lastname">Last Name</label>
				<input type="text" id="passenger${i}-lastname" required />
			</div>
			<div class="form-group">
				<label for="passenger${i}-email">Email</label>
				<input type="email" id="passenger${i}-email" r1quired />
			</div>
			<div class="form-group">
				<label for="passenger${i}-phone">Phone</label>
				<input type="tel" id="passenger${i}-phone" required />
			</div>
			<div class="form-group">
				<label for="passenger${i}-dob">Date of Birth</label>
				<input type="date" id="passenger${i}-dob" required />
			</div>
			<div class="form-group">
				<label for="passenger${i}-gender">Gender</label>
				<select id="passenger${i}-gender" required>
					<option value="">Select Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="other">Other</option>
				</select>
			</div>
		`;
		
		passengerForms.appendChild(form);
	}
}

function validatePassengerForms() {
	for (let i = 1; i <= bookingData.passengers; i++) {
		const firstName = document.getElementById(`passenger${i}-firstname`).value;
		const lastName = document.getElementById(`passenger${i}-lastname`).value;
		const email = document.getElementById(`passenger${i}-email`).value;
		const phone = document.getElementById(`passenger${i}-phone`).value;
		const dob = document.getElementById(`passenger${i}-dob`).value;
		const gender = document.getElementById(`passenger${i}-gender`).value;
		const dobInput = document.getElementById(`passenger${i}-dob`)
		
		const today = new Date();
		const maxDate = today.toISOString().split('T')[0];
		dobInput.setAttribute('max', maxDate);
		
		const birthdate = new Date(dob);
		const today1 = new Date();
		
		let age = today1.getFullYear() - birthdate.getFullYear();
		const monthDiff = today1.getMonth() - birthdate.getMonth();
		
		const validation = validatePhoneNumber(phone);
		
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
			age--;
		}
		
		if (!firstName || !lastName || !email || !phone || !dob || !gender) {
			alert('Please fill in all required passenger information');
			return false;
		}
		
		if (!(validateEmail(email))) {
			alert(`"${email}" is not a valid email address. Please check the format.`, 'error');
			return false;
		}
		
		if(!validation.isValid) {
			alert("Phone number is not valid");
			return false;
		}
		
		if(age <= 16) {
			alert("Please enter a valid date of birth");
			return false;
		}
	}
	
	return true;
}

function collectPassengerData() {
	bookingData.passengerInfo = [];
	
	for (let i = 1; i <= bookingData.passengers; i++) {
		const passenger = {
			firstName: document.getElementById(`passenger${i}-firstname`).value,
			lastName: document.getElementById(`passenger${i}-lastname`).value,
			email: document.getElementById(`passenger${i}-email`).value,
			phone: document.getElementById(`passenger${i}-phone`).value,
			dob: document.getElementById(`passenger${i}-dob`).value,
			gender: document.getElementById(`passenger${i}-gender`).value
		};
		
		bookingData.passengerInfo.push(passenger);
	}
}

function displaySummary() {
	passengerSummary.innerHTML = '';
	bookingData.passengerInfo.forEach((passenger, index) => {
		const passengerItem = document.createElement('div');
		passengerItem.className = 'passenger-item';
		passengerItem.innerHTML = `
			<strong>Passenger ${index + 1}:</strong> ${passenger.firstName} ${passenger.lastName}<br>
			<strong>Email:</strong> ${passenger.email} | <strong>Phone:</strong> ${passenger.phone}<br>
			<strong>Date of Birth:</strong> ${passenger.dob} | <strong>Gender:</strong> ${passenger.gender}
		`;
		passengerSummary.appendChild(passengerItem);
	});
	
	flightSummary.innerHTML = '';
	if (bookingData.selectedFlight) {
		const flight = bookingData.selectedFlight;
		const isRoundTrip = bookingData.flightType === 'roundtrip';
		
		flightSummary.innerHTML = `
			<div>
				<div class="detail">
					<span class="detail-label">Flight Number</span>
					<span class="detail-value">${flight.flightNo}</span>
				</div>
				<div class="detail">
					<span class="detail-label">Route</span>
					<span class="detail-value">${flight.from} to ${flight.to}</span>
				</div>
				<div class="detail">
					<span class="detail-label">Departure</span>
					<span class="detail-value">${flight.departDate} | ${flight.departTime}</span>
				</div>
				${isRoundTrip ? `
				<div class="detail">
					<span class="detail-label">Return</span>
					<span class="detail-value">${flight.returnDate} | ${flight.returnTime}</span>
				</div>
				` : ''}
			</div>
			<div>
				<div class="detail">
					<span class="detail-label">Duration</span>
					<span class="detail-value">${flight.duration}</span>
				</div>
				<div class="detail">
					<span class="detail-label">Fare Type</span>
					<span class="detail-value">${flight.fareType}</span>
				</div>
				<div class="detail">
					<span class="detail-label">Terminal</span>
					<span class="detail-value">${flight.terminal}</span>
				</div>
				<div class="detail">
					<span class="detail-label">Total Price</span>
					<span class="detail-value">₱${(flight.price * bookingData.passengers).toLocaleString()}</span>
				</div>
			</div>
		`;
	}
}

submitPassengersBtn.addEventListener('click', () => {
	if (validatePassengerForms()) {
		collectPassengerData();
		displaySummary();
		showTab('passenger', 'summary');
	}
});

bookNowBtn.addEventListener('click', () => {
	successMessage.classList.remove('hidden');
	document.getElementById('summary').classList.remove('active');
	resetBooking();
});

finishBookingBtn.addEventListener('click', () => {
	successMessage.classList.add('hidden');
	document.getElementById('booking-details').classList.add('active');
	
});

function resetBooking() {
	bookingData = {
		flightType: "",
		from: "",
		to: "",
		departDate: "",
		returnDate: "",
		passengers: 1,
		selectedFlight: null,
		passengerInfo: []
	};
	
	
	document.getElementById('from').value = "";
	document.getElementById('to').value = "";
	document.getElementById('depart-date').value = "2023-11-15";
	document.getElementById('return-date').value = "2023-11-20";
	document.getElementById('passengers').value = "1";
	

	flightOptions.forEach(opt => {
		if (opt.getAttribute('data-type') === 'roundtrip') {
			opt.classList.add('selected');
		} else {
			opt.classList.remove('selected');
		}
	});
	
	returnDate.style.display = 'block';
}