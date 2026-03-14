// ===============================
// CONFIG
// ===============================
const API_KEY = "b6eb9c2e474d41e3bcc8550e873623de";
const BASE_URL = "https://api.rawg.io/api";

// ===============================
// ELEMENTS
// ===============================
const gamesContainer = document.getElementById("gamesContainer");
const searchInput = document.getElementById("searchInput");
const slidesContainer = document.querySelector(".slides");
const dotsContainer = document.querySelector(".dots");

// Popup elements
const gamePopup = document.getElementById("gamePopup");
const popupContent = document.querySelector(".popup-content");
const popupTitle = document.getElementById("popupTitle");
const popupDesc = document.getElementById("popupDesc");
const popupImg = document.getElementById("popupImg");
const popupTrailer = document.getElementById("popupTrailer");
const popupScreens = document.getElementById("popupScreens");
const popupDownload = document.getElementById("popupDownload");

// Hamburger / Sidebar
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");
const menuTheme = document.getElementById("menuTheme");
const themeLabel = document.getElementById("themeLabel");

// Bottom nav links
document.getElementById("homeNav").onclick = () => (window.location.href = "index.html");
document.getElementById("gamesNav").onclick = () => (window.location.href = "games.html");
document.getElementById("tournamentsNav").onclick = () => (window.location.href = "tournaments.html");
document.getElementById("chatNav").onclick = () => (window.location.href = "chat.html");
document.getElementById("accountNav").onclick = () => (window.location.href = "account.html");

// ===============================
// THEME TOGGLE
// ===============================
menuTheme.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  themeLabel.innerText = document.body.classList.contains("light-theme") ? "Light" : "Dark";
});

// ===============================
// SIDEBAR TOGGLE
// ===============================
menuBtn.addEventListener("click", () => sidebar.classList.add("open"));
closeSidebar.addEventListener("click", () => sidebar.classList.remove("open"));

// ===============================
// FETCH GAMES
// ===============================
let sliderGames = [];
let currentSlide = 0;

// Fetch games (PC + Switch as example: platforms=4,187)
async function fetchGames() {
  try {
    const res = await fetch(`${BASE_URL}/games?key=${API_KEY}&platforms=4,187&page_size=24`);
    const data = await res.json();
    const games = data.results || [];
    renderGames(games);
    createSlider(games.slice(0, 5));
  } catch (err) {
    console.error("Error fetching games:", err);
    gamesContainer.innerHTML = "<p style='text-align:center;color:#ff6b6b'>Failed to load games.</p>";
  }
}
fetchGames();

// ===============================
// SEARCH WITH DEBOUNCE
// ===============================
let searchTimeout;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    const query = searchInput.value.trim();
    if (query.length < 2) return fetchGames();
    try {
      const res = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${query}`);
      const data = await res.json();
      renderGames(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    }
  }, 500);
});

// ===============================
// RENDER GAME CARDS
// ===============================
function renderGames(games) {
  gamesContainer.innerHTML = "";
  games.forEach((game) => {
    const stars = "⭐".repeat(Math.round(game.rating));
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <img src="${game.background_image || 'placeholder.png'}" alt="${game.name}" />
      <div class="game-info">
        <div class="game-title">${game.name}</div>
        <div class="game-date">${game.released || ""}</div>
        <div class="game-rating">${stars}</div>
      </div>
    `;

    card.onclick = () => openGame(game.id);
    gamesContainer.appendChild(card);
  });
}

// ===============================
// SLIDER
// ===============================
function createSlider(games) {
  sliderGames = games;
  slidesContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  games.forEach((game, i) => {
    slidesContainer.innerHTML += `<img src="${game.background_image}" class="slide" onclick="openGame(${game.id})">`;
    dotsContainer.innerHTML += `<span class="dot" onclick="goSlide(${i})"></span>`;
  });

  goSlide(0);

  setInterval(() => {
    currentSlide = (currentSlide + 1) % sliderGames.length;
    goSlide(currentSlide);
  }, 5000);
}

function goSlide(index) {
  currentSlide = index;
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll(".dot").forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentSlide);
  });
}

// ===============================
// GAME POPUP
// ===============================
async function openGame(id) {
  try {
    const res = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
    const game = await res.json();

    popupTitle.innerText = game.name;
    const desc = game.description_raw || "";
    popupDesc.innerText =
      desc.length > 200 ? desc.substr(0, desc.lastIndexOf(" ", 200)) + "..." : desc;

    popupImg.src = game.background_image || "placeholder.png";

    // Screenshots
    const shotRes = await fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
    const shots = await shotRes.json();
    popupScreens.innerHTML = "";
    (shots.results || []).slice(0, 6).forEach((s) => {
      const img = document.createElement("img");
      img.src = s.image;
      img.className = "screen";
      popupScreens.appendChild(img);
    });

    // Trailer
    const trailerRes = await fetch(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`);
    const trailerData = await trailerRes.json();
    const trailer = trailerData.results?.[0]?.data?.max || "";
    popupTrailer.innerHTML = trailer
      ? `<video controls width="100%" style="border-radius:12px;background:#000"><source src="${trailer}" type="video/mp4"></video>`
      : "<div style='color:#ffb400'>No trailer available</div>";

    popupDownload.onclick = () => window.open(game.website || "#", "_blank");

    gamePopup.style.display = "flex";
  } catch (err) {
    console.error("Error opening game:", err);
  }
}

// Close popup
gamePopup.addEventListener("click", (e) => {
  if (e.target === gamePopup || e.target.classList.contains("close")) closeGame();
});
popupContent.addEventListener("click", (e) => e.stopPropagation()); // prevent closing when clicking inside
function closeGame() {
  gamePopup.style.display = "none";
}

// ===============================
// INITIALIZATION DONE
// ===============================
