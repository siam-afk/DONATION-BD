
let totalBalance = 1000;
let donationHistory = [];

function toggleSection(section) {
    const donateSection = document.querySelector('.donate');
    const historySection = document.querySelector('.history');
    const donateButton = document.getElementById('donateButton');
    const historyButton = document.getElementById('historyButton');

    if (section === 'donate') {
        donateSection.style.display = 'block';
        historySection.style.display = 'none';
        donateButton.classList.add('active');
        historyButton.classList.remove('active');
    } else {
        donateSection.style.display = 'none';
        historySection.style.display = 'block';
        donateButton.classList.remove('active');
        historyButton.classList.add('active');
        displayHistory();
    }
}

window.onload = function () {
    toggleSection('donate');
}



function validateDonation(event, card) {
    event.preventDefault();
    const donationInputField = document.getElementById(`donate-input-${card}`);
    const donationInput = donationInputField.value;
    const cardTitle = document.getElementById(`card-title-${card}`).innerText;

    if (donationInput > 0) {
        const donationAmount = parseFloat(donationInput);
        if (donationAmount <= totalBalance) {
            updateBalances(donationAmount, card);
            recordDonation(donationAmount, cardTitle);
            showModal();
            donationInputField.value = '';
        } else {
            alert("Insufficient balance.");
        }
    } else {
        alert("Please enter a valid donation amount greater than 0.");
    }
}

function updateBalances(donationAmount, card) {
    totalBalance -= donationAmount;
    document.querySelector('.balance span').textContent = `${totalBalance}`;

    const cardBalance = document.getElementById(`card-balance-${card}`);
    const currentCardBalance = parseFloat(cardBalance.textContent);
    cardBalance.textContent = `${currentCardBalance + donationAmount}`;
}


function recordDonation(amount, title) {
    const dateTime = new Date();
    const formattedDate = dateTime.toString();
    donationHistory.push(`${amount} Taka is donated for ${title} <br><span>Date: ${formattedDate}</span>`);
}


function displayHistory() {
    const historyContainer = document.getElementById('historyList');
    historyContainer.innerHTML = '';
    if (donationHistory.length === 0) {
        historyContainer.innerHTML = '<p>Your donation history will appear here.</p>';
        return;
    }

    donationHistory.forEach(donation => {
        const donationCard = document.createElement('div');
        donationCard.classList.add('donation-card');

        const donationInfo = document.createElement('p');
        donationInfo.innerHTML = donation;
        donationCard.appendChild(donationInfo);
        historyContainer.appendChild(donationCard);
    });
}


function showModal() {
    const modal = document.getElementById('donationModal');
    modal.style.display = "block";
}


function closeModal() {
    const modal = document.getElementById('donationModal');
    modal.style.display = "none";
}


function updateBalanceDisplay() {
    document.querySelector('.balance span').textContent = `${totalBalance}`;
}