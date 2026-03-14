// ===============================
// CONFIG
// ===============================
const API_KEY = "b6eb9c2e474d41e3bcc8550e873623de";
const BASE_URL = "https://api.rawg.io/api";

// Containers
const gamesContainer = document.getElementById("gamesContainer");
const slides = document.getElementById("slides");
const dots = document.getElementById("dots");
const searchInput = document.getElementById("searchInput");
const trendingSlides = document.getElementById("trendingSlides");
const trendingDots = document.getElementById("trendingDots");

// Popup
const gamePopup = document.getElementById("gamePopup");
const popupTitle = document.getElementById("popupTitle");
const popupDesc = document.getElementById("popupDesc");
const popupImg = document.getElementById("popupImg");
const popupTrailer = document.getElementById("popupTrailer");
const popupScreens = document.getElementById("popupScreens");
const popupDownload = document.getElementById("popupDownload");

let currentSlide = 0;
let sliderGames = [];

// ===============================
// FETCH PLATFORMS (optional, for info)
// ===============================
async function getPlatforms() {
  const res = await fetch(`${BASE_URL}/platforms?key=${API_KEY}`);
  const data = await res.json();
  console.log("Platforms:", data.results);
}
getPlatforms();

// ===============================
// FETCH MAIN GAMES
// ===============================
async function fetchGames() {
  const res = await fetch(`${BASE_URL}/games?key=${API_KEY}&platforms=4,187&page_size=24`);
  const data = await res.json();
  renderGames(data.results);
  createSlider(data.results.slice(0,5));
}
fetchGames();

// ===============================
// RENDER GAME CARDS
// ===============================
function renderGames(games) {
  gamesContainer.innerHTML = "";

  games.forEach(game => {
    const stars = "⭐".repeat(Math.round(game.rating));

    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <img src="${game.background_image}" />
      <div class="game-info">
        <div class="game-title">${game.name}</div>
        <div class="game-rating">${stars}</div>
        <div class="game-date">Release: ${game.released}</div>
      </div>
    `;

    card.onclick = () => openGame(game.id);
    gamesContainer.appendChild(card);
  });
}

// ===============================
// SEARCH FUNCTION
// ===============================
searchInput.addEventListener("input", async () => {
  const q = searchInput.value.trim();
  if(q.length < 2) return fetchGames();

  const res = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${q}`);
  const data = await res.json();
  renderGames(data.results);
});

// ===============================
// MAIN SLIDER (trending)
// ===============================
async function fetchTrending() {
  const res = await fetch(`${BASE_URL}/games/lists/popular?key=${API_KEY}&page_size=10`);
  const data = await res.json();
  createTrendingSlider(data.results);
}

function createTrendingSlider(games) {
  let currentSlide = 0;

  trendingSlides.innerHTML = "";
  trendingDots.innerHTML = "";

  games.forEach((game,i) => {
    trendingSlides.innerHTML += `<img src="${game.background_image}" class="slide" onclick="openGame(${game.id})">`;
    trendingDots.innerHTML += `<span class="dot" onclick="goTrendingSlide(${i})"></span>`;
  });

  function goTrendingSlide(i) {
    currentSlide = i;
    trendingSlides.style.transform = `translateX(-${i*100}%)`;
    document.querySelectorAll("#trendingDots .dot").forEach((dot,index)=>{
      dot.classList.toggle("active", index===currentSlide);
    });
  }

  window.goTrendingSlide = goTrendingSlide;
  goTrendingSlide(0);

  setInterval(() => {
    currentSlide = (currentSlide+1)%games.length;
    goTrendingSlide(currentSlide);
  }, 5000);
}

fetchTrending();

// ===============================
// POPUP FUNCTION
// ===============================
async function openGame(id) {
  const res = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
  const game = await res.json();

  popupTitle.innerText = game.name;
  popupDesc.innerText = game.description_raw.substring(0, 150) + "...";
  popupImg.src = game.background_image;

  // Screenshots
  const shotRes = await fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
  const shots = await shotRes.json();
  popupScreens.innerHTML = "";
  shots.results.slice(0, 6).forEach(pic => {
    popupScreens.innerHTML += `<img src="${pic.image}" class="screen">`;
  });

  // Trailer
  const trailerRes = await fetch(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`);
  const trailerData = await trailerRes.json();
  const trailer = trailerData.results[0]?.data?.max || "";
  popupTrailer.innerHTML = trailer
    ? `<video controls width="100%"><source src="${trailer}" type="video/mp4"></video>`
    : "No trailer available";

  // Download button (link to game website for now)
  popupDownload.onclick = () => {
    window.open(game.website || "#", "_blank");
  };

  gamePopup.style.display = "flex";
}

// Close popup by X or clicking outside
gamePopup.addEventListener("click", (e) => {
  if (e.target === gamePopup || e.target.classList.contains("close")) closeGame();
});
function closeGame() {
  gamePopup.style.display = "none";
}

// ===============================
// MAIN SLIDER (small top slider for homepage)
// ===============================
function createSlider(games) {
  sliderGames = games;
  const sliderContainer = document.getElementById("slides");
  const sliderDots = document.getElementById("dots");
  sliderContainer.innerHTML = "";
  sliderDots.innerHTML = "";

  games.forEach((game,i)=>{
    sliderContainer.innerHTML += `<img src="${game.background_image}" class="slide">`;
    sliderDots.innerHTML += `<span class="dot" onclick="goSlide(${i})"></span>`;
  });

  activateDot();
}

function goSlide(i) {
  currentSlide = i;
  slides.style.transform = `translateX(-${i*100}%)`;
  activateDot();
}

function activateDot() {
  document.querySelectorAll("#dots .dot").forEach((dot,index)=>{
    dot.classList.toggle("active", index===currentSlide);
  });
}
