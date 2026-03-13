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

  // ===== MENU / NOTIFICATION / DOTS =====
  const menuBtn = document.getElementById("menuBtn");
  if(menuBtn) menuBtn.addEventListener("click", () => alert("Sidebar menu will open here 🔥"));

  const notificationBtn = document.getElementById("notificationBtn");
  if(notificationBtn) notificationBtn.addEventListener("click", () => alert("No new notifications 🔔"));

  const dotsBtn = document.getElementById("dotsBtn");
  if(dotsBtn) dotsBtn.addEventListener("click", () => alert("More options menu ⚙️"));

  // ===== SLIDER =====
  const slides = document.getElementById("slides");
  if(slides){
    const slideImages = Array.from(slides.children);
    const totalSlides = slideImages.length;

    // Clone first and last slide for infinite loop
    const firstClone = slideImages[0].cloneNode(true);
    const lastClone = slideImages[totalSlides - 1].cloneNode(true);

    slides.appendChild(firstClone);
    slides.insertBefore(lastClone, slides.children[0]);

    let index = 1; // start from first real slide
    slides.style.transform = `translateX(-${index * 100}%)`;

    function nextSlide() {
      index++;
      slides.style.transition = "transform 0.7s ease-in-out";
      slides.style.transform = `translateX(-${index * 100}%)`;
    }

    // Auto slide every 3 seconds
    let sliderInterval = setInterval(nextSlide, 3000);

    slides.addEventListener("transitionend", () => {
      if(index >= slides.children.length - 1){ // reached cloned first
        slides.style.transition = "none";
        index = 1;
        slides.style.transform = `translateX(-${index * 100}%)`;
      }
      if(index <= 0){ // reached cloned last
        slides.style.transition = "none";
        index = slides.children.length - 2;
        slides.style.transform = `translateX(-${index * 100}%)`;
      }
    });
  }

  // ===== GAMES POPUP =====
  const games = [
    { title:"Where Winds Meet", desc:"Let the wind carry your legend to the bottomless....", img:"images/wherewindsmeet.jpg", download:"downloads/spiderman.apk", rating:4.5 },
    { title:"Black Myth:Wukong", desc:"Open world action adventure game.", img:"images/blackmythwukong.jpg", download:"downloads/gta.apk", rating:5 },
    { title:"Red Dead Redemption", desc:"High speed racing game with many cars.", img:"images/reddeadredemption.jpg", download:"downloads/racing.apk", rating:4 },
    { title:"Spiderman3", desc:"web will grow time will tell people will be saved buy spider", img:"images/spiderman3.jpg", download:"downloads/spiderman3.apk", rating:3 }   
    ];

const container = document.getElementById("gamesContainer");

  function renderGames(list){
    container.innerHTML = "";

    list.forEach(game => {
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
  }

  // show all games first
  renderGames(games);

  // ===== SEARCH =====
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    const filteredGames = games.filter(game =>
      game.title.toLowerCase().includes(query) ||
      game.desc.toLowerCase().includes(query)
    );

    renderGames(filteredGames);
  });

  window.closeGame = function(){
    document.getElementById("gamePopup").style.display = "none";
  }

});
