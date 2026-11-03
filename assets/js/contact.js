const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

function setContactStatus(type, message) {
  if (!contactStatus) return;
  contactStatus.className = `alert contact-status alert-${type}`;
  contactStatus.textContent = message;
  contactStatus.classList.remove("d-none");
  contactStatus.scrollIntoView({ behavior: "smooth", block: "center" });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    contactStatus.classList.add("d-none");

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const subject = document.getElementById("contactSubject");
    const message = document.getElementById("contactMessage");

    let valid = true;

    [name, email, subject, message].forEach((field) => {
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

    if (subject.value.trim().length < 3) {
      subject.classList.add("is-invalid");
      valid = false;
    } else {
      subject.classList.add("is-valid");
    }

    if (message.value.trim().length < 10) {
      message.classList.add("is-invalid");
      valid = false;
    } else {
      message.classList.add("is-valid");
    }

    if (!valid) {
      event.preventDefault();
      setContactStatus("danger", "Please check the highlighted fields before sending your message.");
      return;
    }

    // The form is intentionally allowed to continue to FormSubmit when valid.
    // FormSubmit sends the message to the email configured in the form action.
    setContactStatus("success", "Your message is valid and is being sent...");
  });
}
