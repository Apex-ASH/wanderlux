const calculatorRates = {
  "Bali, Indonesia": { daily: 120, transport: 480 },
  "Paris, France": { daily: 185, transport: 850 },
  "Santorini, Greece": { daily: 170, transport: 900 },
  "Tokyo, Japan": { daily: 180, transport: 780 },
  "Queenstown, New Zealand": { daily: 165, transport: 420 },
  "Istanbul, Turkey": { daily: 135, transport: 820 },
  "Venice, Italy": { daily: 175, transport: 900 },
  "Barcelona, Spain": { daily: 160, transport: 880 },
  "Vancouver, Canada": { daily: 175, transport: 1050 },
  "New York, USA": { daily: 210, transport: 1250 },
  "Rio de Janeiro, Brazil": { daily: 150, transport: 1350 },
  "London, England": { daily: 195, transport: 920 }
};

const styleMultipliers = {
  Budget: 0.8,
  Standard: 1.0,
  Luxury: 1.5
};

const destinationInput = document.getElementById("calcDestination");
const travellersInput = document.getElementById("calcTravellers");
const daysInput = document.getElementById("calcDays");
const styleInput = document.getElementById("calcStyle");
const calculatorForm = document.getElementById("tripCalculatorForm");
const resetButton = document.getElementById("resetCalculator");
const resultContent = document.getElementById("resultContent");

function currency(value) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0
  }).format(value);
}

function populateFromQueryString() {
  const params = new URLSearchParams(window.location.search);

  const destination = params.get("destination");
  const travellers = params.get("travellers");
  const days = params.get("days");
  const style = params.get("style");

  if (destination && calculatorRates[destination]) {
    destinationInput.value = destination;
  }

  if (travellers && Number(travellers) > 0) {
    travellersInput.value = travellers;
  }

  if (days && Number(days) > 0) {
    daysInput.value = days;
  }

  if (style && styleMultipliers[style]) {
    styleInput.value = style;
  }

  // Auto-calculate only when the user arrived with all calculator fields,
  // such as from the Estimate Trip form on the Home page.
  return Boolean(
    destination &&
    calculatorRates[destination] &&
    travellers &&
    Number(travellers) > 0 &&
    days &&
    Number(days) > 0 &&
    style &&
    styleMultipliers[style]
  );
}

function showDefaultResult() {
  resultContent.innerHTML = `
    <div class="estimate-placeholder">
      <i class="bi bi-calculator"></i>
      <h3 class="mt-3">Your estimate will appear here</h3>
      <p class="mb-0">Complete the form and select “Calculate Estimated Cost”.</p>
    </div>
  `;
}

function calculateTrip(event) {
  event.preventDefault();

  const destination = destinationInput.value;
  const travellers = Number(travellersInput.value);
  const days = Number(daysInput.value);
  const travelStyle = styleInput.value;

  if (!destination || !calculatorRates[destination]) {
    destinationInput.focus();
    destinationInput.classList.add("is-invalid");
    return;
  }

  destinationInput.classList.remove("is-invalid");

  if (!Number.isFinite(travellers) || travellers < 1 || travellers > 20) {
    travellersInput.focus();
    travellersInput.classList.add("is-invalid");
    return;
  }

  travellersInput.classList.remove("is-invalid");

  if (!Number.isFinite(days) || days < 1 || days > 60) {
    daysInput.focus();
    daysInput.classList.add("is-invalid");
    return;
  }

  daysInput.classList.remove("is-invalid");

  const rate = calculatorRates[destination];
  const multiplier = styleMultipliers[travelStyle];

  const dailyTravelCost = rate.daily * travellers * days;
  const transportCost = rate.transport * travellers;
  const subtotal = dailyTravelCost + transportCost;
  const total = Math.round(subtotal * multiplier);
  const styleAdjustment = total - subtotal;

  resultContent.innerHTML = `
    <span class="estimate-badge">${travelStyle} Travel Package</span>
    <div class="estimate-total">${currency(total)}</div>
    <p class="summary-message">
      Estimated cost for ${travellers} ${travellers === 1 ? "traveller" : "travellers"} to
      <strong>${destination}</strong> for ${days} ${days === 1 ? "day" : "days"}:
      <strong>${currency(total)}</strong> – ${travelStyle} Travel Package.
    </p>

    <div class="breakdown-list">
      <div class="breakdown-row">
        <span>Daily travel cost</span>
        <strong>${currency(dailyTravelCost)}</strong>
      </div>
      <div class="breakdown-row">
        <span>Estimated transport</span>
        <strong>${currency(transportCost)}</strong>
      </div>
      <div class="breakdown-row">
        <span>Travel style adjustment</span>
        <strong>${styleAdjustment >= 0 ? "+" : "−"}${currency(Math.abs(styleAdjustment))}</strong>
      </div>
      <div class="breakdown-row">
        <span>Total estimate</span>
        <strong>${currency(total)}</strong>
      </div>
    </div>

    <div class="calculator-note">
      .
    </div>

    <a href="appointment.html" class="btn btn-light w-100 mt-4">Request A Personalised Quote</a>
  `;
}

calculatorForm.addEventListener("submit", calculateTrip);

resetButton.addEventListener("click", () => {
  calculatorForm.reset();
  travellersInput.value = 2;
  daysInput.value = 5;
  styleInput.value = "Standard";

  [destinationInput, travellersInput, daysInput].forEach((field) => {
    field.classList.remove("is-invalid");
  });

  showDefaultResult();
});

const shouldAutoCalculate = populateFromQueryString();
showDefaultResult();

if (shouldAutoCalculate) {
  calculatorForm.requestSubmit();
}
