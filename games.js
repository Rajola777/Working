const gameList = document.getElementById("gameList");
let activeTab = "pc";

// RAWG API key (you need to get your free key at https://rawg.io/apidocs)
const API_KEY = "84cda4988dbc42d8878b2faa461495e2";

// Platform IDs (example)
// PC = 4, PSP = 8, Hacked = we will simulate (no real hacked games)
const PLATFORMS = {
  pc: 4,
  psp: 8,
  hacked: 0 // simulate hacked content
};

// Fetch games from RAWG
async function fetchGames(tab){
  gameList.innerHTML = `<p style="text-align:center; opacity:0.7;">Loading ${tab.toUpperCase()} games...</p>`;

  try {
    let url = "";
    if(tab === "hacked"){
      // For hacked, we simulate content
      const hackedGames = [
        { name: "Hacked Subway Surfers", desc: "Unlimited coins", img: "https://i.imgur.com/7Q5aH7u.png", download: "#" },
        { name: "Hacked Candy Crush", desc: "Infinite lives", img: "https://i.imgur.com/7Q5aH7u.png", download: "#" }
      ];
      displayGames(hackedGames);
      return;
    }

    url = `https://api.rawg.io/api/games?platforms=${PLATFORMS[tab]}&page_size=12&key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    const games = data.results.map(g => ({
      name: g.name,
      desc: g.released ? `Released: ${g.released}` : "No release date",
      img: g.background_image || "https://i.imgur.com/7Q5aH7u.png",
      download: "#" // RAWG doesn't provide direct download, use placeholder or link to store
    }));

    displayGames(games);

  } catch (err) {
    console.error("Error fetching games:", err);
    gameList.innerHTML = `<p style="text-align:center; opacity:0.7;">Failed to load ${tab.toUpperCase()} games.</p>`;
  }
}

// Display cards
function displayGames(list){
  gameList.innerHTML = "";
  if(list.length === 0){
    gameList.innerHTML = `<p style="text-align:center; opacity:0.7;">No games found.</p>`;
    return;
  }

  list.forEach(g => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${g.img}" alt="${g.name}">
      <div class="game-text">
        <h3>${g.name}</h3>
        <p>${g.desc}</p>
        <a href="${g.download}" class="upload-btn" target="_blank">Download</a>
      </div>
    `;
    gameList.appendChild(card);
  });
}

// Tabs
function switchTab(tab){
  activeTab = tab;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(tab + "Tab").classList.add("active");

  fetchGames(tab);
}

// Search
function searchGames(){
  const value = document.getElementById("gameSearch").value.toLowerCase();
  const cards = Array.from(document.querySelectorAll(".game-card"));
  cards.forEach(card => {
    const name = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = name.includes(value) ? "flex" : "none";
  });
}

// Notifications & menu
function openNotifications(){ document.getElementById("notificationPanel").classList.remove("hidden"); }
function closeNotifications(){ document.getElementById("notificationPanel").classList.add("hidden"); }
function openMenu(){ document.getElementById("menuPanel").classList.remove("hidden"); }
function closeMenu(){ document.getElementById("menuPanel").classList.add("hidden"); }

// Upload demo
function uploadGame(){ alert("Upload feature coming soon!"); }

// Navigation
function goHome(){ window.location.href = "home.html"; }
function goChats(){ window.location.href = "chat.html"; }
function goTournaments(){ window.location.href = "tournaments.html"; }
function goAccount(){ window.location.href = "account.html"; }

// Bottom nav
document.addEventListener("DOMContentLoaded", () => {
  const pageMap = {
    homeNav: "home.html",
    gamesNav: "games.html",
    tournamentsNav: "tournaments.html",
    chatNav: "chat.html",
    accountNav: "account.html"
  };
  const currentPage = window.location.pathname.split("/").pop();
  const navItems = document.querySelectorAll(".bottom-nav .nav-item");

  navItems.forEach(item => {
    const id = item.id;
    if(pageMap[id] === currentPage) item.classList.add("active");
    item.addEventListener("click", () => { window.location.href = pageMap[id]; });
  });
});

// Initial load
switchTab("pc");
