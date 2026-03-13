document.addEventListener("DOMContentLoaded", () => {

  // ===== NAVIGATION =====
  const pages = {
    homeNav: "index.html",
    gamesNav: "games.html",
    tournamentsNav: "tournaments.html",
    chatNav: "chat.html",
    accountNav: "account.html"
  };

  Object.keys(pages).forEach(id => {
    const element = document.getElementById(id);
    if(element){
      element.addEventListener("click", () => {
        window.location.href = pages[id];
      });
    }
  });

  // ===== MENU BUTTON (Three Lines) =====
  const menuBtn = document.getElementById("menuBtn");
  if(menuBtn){
    menuBtn.addEventListener("click", () => {
      alert("Sidebar menu will open here 🔥");
    });
  }

  // ===== NOTIFICATION =====
  const notificationBtn = document.getElementById("notificationBtn");
  if(notificationBtn){
    notificationBtn.addEventListener("click", () => {
      alert("No new notifications 🔔");
    });
  }

  // ===== THREE DOTS =====
  const dotsBtn = document.getElementById("dotsBtn");
  if(dotsBtn){
    dotsBtn.addEventListener("click", () => {
      alert("More options menu ⚙️");
    });
  }

  // ===== IMAGE SLIDER =====
  let currentIndex = 0;
  const slides = document.getElementById("slides");

  if(slides){
    setInterval(() => {
      const total = slides.children.length;
      currentIndex = (currentIndex + 1) % total;
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 3000);
  }

});
const games = [
  {
    title:"Where Winds Meet",
    desc:"Let the wind carry your legend to the bottomless....",
    img:"images/wherewindsmeet.jpg",
    download:"downloads/spiderman.apk",
    rating:4.5
  },
  {
    title:"Black Myth:Wukong",
    desc:"Open world action adventure game.",
    img:"images/blackmythwukong.jpg",
    download:"downloads/gta.apk",
    rating:5
  },
  {
    title:"Red Dead Redemption",
    desc:"High speed racing game with many cars.",
    img:"images/reddeadredemption.jpg",
    download:"downloads/racing.apk",
    rating:4
  }
];

const container = document.getElementById("gamesContainer");

games.forEach(game => {
  const card = document.createElement("div");
  card.className = "game-card";

  card.innerHTML = `
    <img src="${game.img}">
    <div class="game-info">
      <h3>${game.title}</h3>
      <p>${game.desc}</p>
      <div class="game-rating">${"★".repeat(Math.floor(game.rating))}</div>
    </div>
  `;

  card.addEventListener("click", () => {
    document.getElementById("popupImg").src = game.img;
    document.getElementById("popupTitle").innerText = game.title;
    document.getElementById("popupDesc").innerText = game.desc;
    document.getElementById("popupDownload").href = game.download;
    document.getElementById("gamePopup").style.display = "flex";
  });

  container.appendChild(card);
});

function closeGame(){
  document.getElementById("gamePopup").style.display = "none";
}
