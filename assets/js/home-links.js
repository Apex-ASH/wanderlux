"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const buttons = Array.from(document.querySelectorAll("button"));
  const findButton = (label) => buttons.find((button) =>
    button.textContent.replace(/\s+/g, " ").trim() === label
  );
  const go = (path) => { window.location.href = path; };
  const buttonLinks = {
    "Plan Your Trip": "appointment.html",
    "Estimate Your Trip": "calculator.html",
    "Talk To A Consultant": "appointment.html",
    "Book An Appointment": "appointment.html"
  };
  for (const [text, link] of Object.entries(buttonLinks)) {
    const button = findButton(text);
    if (button) button.addEventListener("click", () => go(link));
  }
  const scrollButtons = {
    "Explore Destinations": "Top Destinations",
    "View Packages": "Popular Travel Packages"
  };
  for (const [text, headingText] of Object.entries(scrollButtons)) {
    const button = findButton(text);
    if (!button) continue;
    button.addEventListener("click", () => {
      const target = Array.from(document.querySelectorAll("h1,h2,h3"))
        .find((element) => element.textContent.trim() === headingText);
      if (target) target.closest("section")?.scrollIntoView({behavior:"smooth"});
    });
  }
  const heroForm = document.querySelector(".hero-search form") || document.querySelector("form.hero-search");
  const estimate = findButton("Estimate Trip");
  if (heroForm && estimate) {
    estimate.addEventListener("click", () => {
      const selects = heroForm.querySelectorAll("select");
      const numbers = heroForm.querySelectorAll('input[type="number"]');
      if (selects.length < 2 || numbers.length < 2) return go("calculator.html");
      const destination = selects[0].selectedOptions[0]?.textContent.trim() || "";
      const style = selects[1].selectedOptions[0]?.textContent.trim() || "Standard";
      const travellers = numbers[0].value;
      const days = numbers[1].value;
      if (!destination || destination.toLowerCase().startsWith("choose")) {
        selects[0].setCustomValidity("Please choose a destination.");
        selects[0].reportValidity();
        selects[0].addEventListener("change", () => selects[0].setCustomValidity(""), {once:true});
        return;
      }
      if (Number(travellers) < 1 || Number(days) < 1) {
        (Number(travellers) < 1 ? numbers[0] : numbers[1]).reportValidity();
        return;
      }
      const args = new URLSearchParams({destination,travellers,days,style});
      go("calculator.html?" + args.toString());
    });
  }
});
