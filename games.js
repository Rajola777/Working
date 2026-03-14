const gameList = document.getElementById("gameList");
let activeTab = "pc";

// ===== Fetch Games from API =====
async function fetchGames(tab){
  let url = "";

  // Change these URLs to real APIs that provide downloadable game info
  if(tab === "pc"){
    url = "https://api.example.com/pc-games";
  } else if(tab === "psp"){
    url = "https://api.example.com/psp-games";
  } else if(tab === "hacked"){
    url = "https://api.example.com/hacked-games";
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    // Assuming each game has: name, desc, img, download
    displayGames(data);
  } catch (err) {
    console.error("Error fetching games:", err);
    gameList.innerHTML = `<p style="text-align:center; opacity:0.7;">Failed to load ${tab.toUpperCase()} games.</p>`;
  }
}

// ===== Display Games =====
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

// ===== Tab Switching =====
function switchTab(tab){
  activeTab = tab;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(tab + "Tab").classList.add("active");

  fetchGames(tab);
}

// ===== Search =====
function searchGames(){
  const value = document.getElementById("gameSearch").value.toLowerCase();
  const cards = Array.from(document.querySelectorAll(".game-card"));
  cards.forEach(card => {
    const name = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = name.includes(value) ? "flex" : "none";
  });
}

// ===== Notifications & Menu =====
function openNotifications(){ document.getElementById("notificationPanel").classList.remove("hidden"); }
function closeNotifications(){ document.getElementById("notificationPanel").classList.add("hidden"); }
function openMenu(){ document.getElementById("menuPanel").classList.remove("hidden"); }
function closeMenu(){ document.getElementById("menuPanel").classList.add("hidden"); }

// ===== Upload Demo =====
function uploadGame(){ alert("Upload feature coming soon!"); }

// ===== Navigation =====
function goHome(){ window.location.href = "home.html"; }
function goChats(){ window.location.href = "chat.html"; }
function goTournaments(){ window.location.href = "tournaments.html"; }
function goAccount(){ window.location.href = "account.html"; }

// ===== Bottom Navigation =====
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
    if(pageMap[id] === currentPage){
      item.classList.add("active");
    }
    item.addEventListener("click", () => {
      window.location.href = pageMap[id];
    });
  });
});

// ===== Initial Load =====
switchTab("pc");
