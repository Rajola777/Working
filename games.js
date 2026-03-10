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

function switchTab(tab){
  activeTab = tab;

  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(tab + "Tab").classList.add("active");

  displayGames(games[tab]);
}

function searchGames(){
  const value = document.getElementById("gameSearch").value.toLowerCase();
  const filtered = games[activeTab].filter(g =>
    g.name.toLowerCase().includes(value)
  );
  displayGames(filtered);
}

/* Notifications */
function openNotifications(){
  document.getElementById("notificationPanel").classList.remove("hidden");
}

function closeNotifications(){
  document.getElementById("notificationPanel").classList.add("hidden");
}

/* Menu */
function openMenu(){
  document.getElementById("menuPanel").classList.remove("hidden");
}

function closeMenu(){
  document.getElementById("menuPanel").classList.add("hidden");
}

/* Upload */
function uploadGame(){
  alert("Upload feature coming soon (demo)");
}

/* Navigation */
function goHome(){ window.location.href = "./home.html"; }
function goChats(){ window.location.href = "./chats.html"; }
function goTournaments(){ window.location.href = "./tournaments.html"; }
function goAccount(){ window.location.href = "./account.html"; }

/* Default PC page */
displayGames(games.pc);
// NAVIGATION
const homeNav = document.getElementById("homeNav");
const gamesNav = document.getElementById("gamesNav");
const tournamentsNav = document.getElementById("tournamentsNav");
const chatNav = document.getElementById("chatNav");
const accountNav = document.getElementById("accountNav");

// Go to pages
homeNav.onclick = () => {
  window.location.href = "home.html";
};

AccountNav.onclick = () => {
  window.location.href = "account.html";
};

tournamentsNav.onclick = () => {
  window.location.href = "tournaments.html";
};

chatNav.onclick = () => {
  window.location.href = "chat.html";
};

accountNav.onclick = () => {
  window.location.href = "account.html";
};
