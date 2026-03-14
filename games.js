// ===== GAME DATA =====
const gameList = document.getElementById("gameList");
let activeTab = "pc";

const games = {
  pc: [
    { name: "GTA V", desc: "Open world action", img: "https://i.imgur.com/7Q5aH7u.png" },
    { name: "FIFA 24", desc: "Football simulation", img: "https://i.imgur.com/7Q5aH7u.png" }
  ],
  psp: [
    { name: "God of War", desc: "Action adventure", img: "https://i.imgur.com/7Q5aH7u.png" }
  ],
  hacked: [
    { name: "Hacked Subway Surfers", desc: "Unlimited coins", img: "https://i.imgur.com/7Q5aH7u.png" }
  ]
};

// ===== DISPLAY GAMES =====
function displayGames(list){
  gameList.innerHTML = "";
  list.forEach(g => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${g.img}">
      <div class="game-text">
        <h3>${g.name}</h3>
        <p>${g.desc}</p>
      </div>
    `;
    gameList.appendChild(card);
  });
}

// ===== TAB SWITCH =====
function switchTab(tab){
  activeTab = tab;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(tab + "Tab").classList.add("active");
  displayGames(games[tab]);
}

// ===== SEARCH GAMES =====
function searchGames(){
  const value = document.getElementById("gameSearch").value.toLowerCase();
  const filtered = games[activeTab].filter(g =>
    g.name.toLowerCase().includes(value)
  );
  displayGames(filtered);
}

// ===== NOTIFICATIONS =====
function openNotifications(){
  document.getElementById("notificationPanel").classList.remove("hidden");
}
function closeNotifications(){
  document.getElementById("notificationPanel").classList.add("hidden");
}

// ===== MENU =====
function openMenu(){
  document.getElementById("menuPanel").classList.remove("hidden");
}
function closeMenu(){
  document.getElementById("menuPanel").classList.add("hidden");
}

// ===== UPLOAD =====
function uploadGame(){
  alert("Upload feature coming soon (demo)");
}

// ===== NAVIGATION SHORTCUTS =====
function goHome(){ window.location.href = "./home.html"; }
function goChats(){ window.location.href = "./chat.html"; }
function goTournaments(){ window.location.href = "./tournaments.html"; }
function goAccount(){ window.location.href = "./account.html"; }

// ===== INITIAL DISPLAY =====
displayGames(games.pc);

// ===== BOTTOM NAVIGATION =====
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

    // set active page
    if(pageMap[id] === currentPage){
      item.classList.add("active");
    }

    // navigation click
    item.addEventListener("click", () => {
      window.location.href = pageMap[id];
    });
  });
});
