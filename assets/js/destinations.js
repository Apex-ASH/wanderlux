const destinationData = [
  {
    city: "Bali",
    country: "Indonesia",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=82",
    description: "Tropical beaches, temples, rice terraces and relaxed island experiences.",
    bestFor: "Beach & Culture"
  },
  {
    city: "Paris",
    country: "France",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=82",
    description: "Iconic landmarks, museums, café culture and romantic city experiences.",
    bestFor: "City Break"
  },
  {
    city: "Santorini",
    country: "Greece",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=82",
    description: "Whitewashed villages, dramatic sea views and unforgettable sunsets.",
    bestFor: "Romance"
  },
  {
    city: "Tokyo",
    country: "Japan",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=82",
    description: "A vibrant mix of modern neighbourhoods, tradition, food and technology.",
    bestFor: "Culture & Food"
  },
  {
    city: "Queenstown",
    country: "New Zealand",
    region: "Oceania",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=82",
    description: "Mountain scenery, lakes and outdoor adventures in every season.",
    bestFor: "Adventure"
  },
  {
    city: "Istanbul",
    country: "Turkey",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=82",
    description: "Historic mosques, bazaars and a unique city stretching across two continents.",
    bestFor: "History & Food"
  },
  {
    city: "Venice",
    country: "Italy",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1000&q=82",
    description: "Canals, historic architecture and atmospheric neighbourhoods made for wandering.",
    bestFor: "Romance & Culture"
  },
  {
    city: "Barcelona",
    country: "Spain",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=82",
    description: "Gaudí architecture, Mediterranean beaches and lively neighbourhoods.",
    bestFor: "City & Beach"
  },
  {
    city: "Vancouver",
    country: "Canada",
    region: "North America",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1000&q=82",
    description: "A scenic waterfront city surrounded by mountains, parks and nature.",
    bestFor: "Nature & City"
  },
  {
    city: "New York",
    country: "USA",
    region: "North America",
    image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1000&q=82",
    description: "World-famous landmarks, entertainment, shopping and endless neighbourhoods to explore.",
    bestFor: "Urban Experience"
  },
  {
    city: "Rio de Janeiro",
    country: "Brazil",
    region: "South America",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1000&q=82",
    description: "Beaches, mountain views, music and energetic Brazilian culture.",
    bestFor: "Beach & Culture"
  },
  {
    city: "London",
    country: "England",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=82",
    description: "Historic landmarks, theatre, museums and one of the world's most diverse city scenes.",
    bestFor: "City & History"
  }
];

const destinationList = document.getElementById("allDestinationGrid");
const destinationSearch = document.getElementById("destinationSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const emptyState = document.getElementById("emptyState");

let currentRegion = "All";
let currentSearch = "";

function renderDestinations() {
  if (!destinationList) return;

  const filtered = destinationData.filter((item) => {
    const regionMatch = currentRegion === "All" || item.region === currentRegion;
    const searchText = `${item.city} ${item.country} ${item.region}`.toLowerCase();
    const searchMatch = searchText.includes(currentSearch.toLowerCase());
    return regionMatch && searchMatch;
  });

  destinationList.innerHTML = "";

  filtered.forEach((item) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-xl-4 reveal show";
    col.innerHTML = `
      <article class="destination-page-card">
        <div class="destination-page-image" style="background-image:url('${item.image}')">
          <span class="destination-region">${item.region}</span>
        </div>
        <div class="card-body">
          <h3>${item.city}</h3>
          <div class="destination-country">${item.country}</div>
          <p class="destination-desc">${item.description}</p>
          <div class="destination-facts">
            <span><i class="bi bi-stars me-1"></i>${item.bestFor}</span>
            <span><i class="bi bi-geo-alt me-1"></i>${item.region}</span>
          </div>
          <a href="calculator.html?destination=${encodeURIComponent(item.city + ", " + item.country)}" class="btn btn-outline-brand w-100 mt-4">
            Estimate This Trip
          </a>
        </div>
      </article>
    `;
    destinationList.appendChild(col);
  });

  if (emptyState) {
    emptyState.style.display = filtered.length ? "none" : "block";
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentRegion = button.dataset.region;
    renderDestinations();
  });
});

if (destinationSearch) {
  destinationSearch.addEventListener("input", (event) => {
    currentSearch = event.target.value.trim();
    renderDestinations();
  });
}

renderDestinations();
