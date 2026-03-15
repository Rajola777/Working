document.addEventListener("DOMContentLoaded", () => {

  function go(page){
    window.location.href = page;
  }

  // NAVIGATION
  const home = document.getElementById("homeNav");
  const games = document.getElementById("gamesNav");
  const tournaments = document.getElementById("tournamentsNav");
  const chat = document.getElementById("chatNav");
  const account = document.getElementById("accountNav");

  if(home) home.onclick = () => go("home.html");
  if(games) games.onclick = () => go("games.html");
  if(tournaments) tournaments.onclick = () => go("tournaments.html");
  if(account) account.onclick = () => go("account.html");

  if(chat){
    chat.onclick = () => {
      alert("Chat page not ready yet 🚧");
    };
  }

  // BACK
  const back = document.getElementById("backBtn");
  if(back) back.onclick = () => go("index.html");

  // NOTIFICATION
  const bell = document.getElementById("notificationBtn");
  if(bell){
    bell.onclick = () => {
      alert("🔔 No new notifications.");
    };
  }

  // DOTS
  const dots = document.getElementById("dotsBtn");
  if(dots){
    dots.onclick = () => {
      alert("⚙️ Options coming soon.");
    };
  }

  // GAME ITEMS
  document.querySelectorAll(".chat-item").forEach(item => {
    item.onclick = () => {
      const page = item.getAttribute("data-page");
      if(page) go(page);
    };
  });

  // SEARCH
  const search = document.getElementById("tournamentSearch");

  if(search){
    search.addEventListener("keyup", () => {
      const value = search.value.toLowerCase();

      document.querySelectorAll(".chat-item").forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(value) ? "flex" : "none";
      });
    });
  }

});
