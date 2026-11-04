const appointmentForm = document.getElementById("appointmentForm");
const appointmentAlert = document.getElementById("appointmentAlert");
const preferredDate = document.getElementById("preferredDate");

if (preferredDate) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  preferredDate.min = localToday;
}

function showAppointmentMessage(type, message) {
  if (!appointmentAlert) return;

  appointmentAlert.className = `alert appointment-alert alert-${type}`;
  appointmentAlert.textContent = message;
  appointmentAlert.classList.remove("d-none");
  appointmentAlert.scrollIntoView({ behavior: "smooth", block: "center" });
}

if (appointmentForm) {
  appointmentForm.addEventListener("submit", (event) => {
    appointmentAlert.classList.add("d-none");

    const name = document.getElementById("appointmentName");
    const email = document.getElementById("appointmentEmail");
    const phone = document.getElementById("appointmentPhone");
    const date = document.getElementById("preferredDate");
    const message = document.getElementById("appointmentMessage");

    let valid = true;

    [name, email, phone, date, message].forEach((field) => {
      field.classList.remove("is-invalid", "is-valid");
    });

    if (name.value.trim().length < 2) {
      name.classList.add("is-invalid");
      valid = false;
    } else {
      name.classList.add("is-valid");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      email.classList.add("is-invalid");
      valid = false;
    } else {
      email.classList.add("is-valid");
    }

    const phonePattern = /^[0-9+\s()\-]{8,20}$/;
    if (!phonePattern.test(phone.value.trim())) {
      phone.classList.add("is-invalid");
      valid = false;
    } else {
      phone.classList.add("is-valid");
    }

    if (!date.value) {
      date.classList.add("is-invalid");
      valid = false;
    } else {
      const selectedDate = new Date(`${date.value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        date.classList.add("is-invalid");
        valid = false;
      } else {
        date.classList.add("is-valid");
      }
    }

    if (message.value.trim().length < 10) {
      message.classList.add("is-invalid");
      valid = false;
    } else {
      message.classList.add("is-valid");
    }

    if (!valid) {
      event.preventDefault();
      showAppointmentMessage("danger", "Please check the highlighted fields and complete the form correctly.");
      return;
    }

  });
}
