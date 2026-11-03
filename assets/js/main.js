const destinations = [
  {
    city: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=82"
  },
  {
    city: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=82"
  },
  {
    city: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=82"
  },
  {
    city: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=82"
  },
  {
    city: "Queenstown",
    country: "New Zealand",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=82"
  },
  {
    city: "Istanbul",
    country: "Turkey",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=82"
  },
  {
    city: "Venice",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1000&q=82"
  },
  {
    city: "Barcelona",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=82"
  },
  {
    city: "Vancouver",
    country: "Canada",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1000&q=82"
  },
  {
    city: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1000&q=82"
  },
  {
    city: "Rio de Janeiro",
    country: "Brazil",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=82"
  },
  {
    city: "London",
    country: "England",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=82"
  }
];

const featuredDestinations = destinations.slice(0, 5);
const grid = document.getElementById("destinationGrid");

if (grid) {
  featuredDestinations.forEach((destination, index) => {
    const col = document.createElement("div");

    if (index < 3) {
      col.className = "col-sm-6 col-lg-4 reveal";
    } else {
      col.className = "col-sm-6 col-lg-6 reveal";
    }

    col.innerHTML = `
      <a href="destinations.html" class="destination-card d-block" style="background-image:url('${destination.image}')">
        <span class="destination-arrow"><i class="bi bi-arrow-up-right"></i></span>
        <div class="destination-content">
          <h3>${destination.city}</h3>
          <span>${destination.country}</span>
        </div>
      </a>
    `;

    grid.appendChild(col);
  });
}

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

const navbar = document.getElementById("mainNavbar");
window.addEventListener("scroll", () => {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}


// Phase 7: accessibility and mobile navigation polish
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("show"));
}

document.querySelectorAll("#navcol-1 .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navMenu = document.getElementById("navcol-1");
    if (!navMenu || !navMenu.classList.contains("show")) return;

    const collapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
    collapse.hide();
  });
});
