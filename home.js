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
    { title:"Where Winds Meet", desc:"Let the wind carry your legend to the boundless adventure....Where Winds Meet is an epic adventure through breathtaking valleys and towering mountains.Dynamic winds and changing weather challenge your navigation and strategy.Meet fascinating characters and make choices that shape your destiny.Solve puzzles, master survival skills, and explore a world full of secrets", img:"images/wherewindsmeet.jpg", download:"downloads/spiderman.apk", rating:4.5, price: 5},
    { title:"Black Myth:Wukong", desc:"Open world action adventure game.", img:"images/blackmythwukong.jpg", download:"downloads/gta.apk", rating:5, price: 0 },
    { title:"Red Dead Redemption", desc:"High speed racing game with many cars.", img:"images/reddeadredemption.jpg", download:"downloads/racing.apk", rating:4, price: 0},
    { title:"Spiderman3", desc:"web will grow time will tell people will be saved buy spider", img:"images/spiderman3.jpg", download:"downloads/spiderman3.apk", rating:3, price: 10},

{
title:"Grand Theft Auto V",
desc:`Grand Theft Auto V is a massive open world action game set in Los Santos.
Players control three criminals planning dangerous heists across the city.
The world includes highways, mountains, deserts and oceans to explore.
Hundreds of vehicles, weapons and missions keep gameplay exciting.
The online mode allows players to build businesses and complete jobs.
It is one of the most successful games ever released.`,
img:"images/gta5.jpg",
download:"#",
rating:5,
price: 7  
},

{
title:"Red Dead Redemption 2",
desc:`Red Dead Redemption 2 is an open world western adventure game.
Players follow Arthur Morgan, a member of the Van der Linde gang.
The story explores loyalty, survival and the end of the outlaw era.
Players can hunt animals, explore towns and ride horses across the wild west.
The game features an extremely realistic world and detailed characters.
It is widely praised for its storytelling and graphics.`,
img:"images/rdr2.jpg",
download:"#",
rating:5,
price: 15  
},

{
title:"Cyberpunk 2077",
desc:`Cyberpunk 2077 takes place in the futuristic Night City.
Players control a mercenary named V trying to survive in a dangerous world.
Cybernetic upgrades allow powerful abilities and hacking skills.
The city is filled with gangs, corporations and advanced technology.
Players can explore freely and make choices that affect the story.
The game combines RPG elements with action combat.`,
img:"images/cyberpunk.jpg",
download:"#",
rating:4,
price: 12
},

{
title:"The Witcher 3",
desc:`The Witcher 3 is a fantasy RPG based on the Witcher novels.
Players control Geralt, a monster hunter known as a Witcher.
The game features a massive open world full of creatures and quests.
Players fight monsters, craft potions and upgrade equipment.
Choices in the story affect the outcome of many characters.
It is considered one of the best RPG games ever made.`,
img:"images/witcher3.jpg",
download:"#",
rating:5,
price: 9
},

{
title:"Elden Ring",
desc:`Elden Ring is a dark fantasy RPG created by FromSoftware.
Players explore a mysterious world known as the Lands Between.
The game is filled with powerful bosses and hidden secrets.
Combat requires careful timing, strategy and exploration.
Players can build their character in many different ways.
It offers one of the largest and most mysterious worlds in RPG games.`,
img:"images/eldenring.jpg",
download:"#",
rating:5,
price: 0
},

{
title:"Spider-Man Remastered",
desc:`Spider-Man Remastered lets players swing through New York City.
Players control Peter Parker fighting famous villains.
The web swinging mechanics are smooth and satisfying.
Players complete story missions and help citizens across the city.
Combat mixes gadgets, acrobatics and powerful combos.
It captures the feeling of truly being Spider-Man.`,
img:"images/spiderman.jpg",
download:"#",
rating:4,
price: 12
},

{
title:"Fortnite",
desc:`Fortnite is a popular battle royale game with colorful graphics.
Players fight to survive against many other players on a large map.
Building structures during combat adds a unique gameplay mechanic.
New seasons introduce skins, events and special modes.
The game constantly changes with updates and collaborations.
It remains one of the biggest online games worldwide.`,
img:"images/fortnite.jpg",
download:"#",
rating:5,
price: 0
},

{
title:"PUBG Mobile",
desc:`PUBG Mobile is a survival battle royale game.
Players land on an island and search for weapons and equipment.
The safe zone slowly shrinks forcing players to fight.
Strategy and teamwork are important for victory.
Players must survive longer than all other opponents.
It is one of the most played mobile games globally.`,
img:"images/pubgm.jpg",
download:"#",
rating:5,
price: 0
},

{
title:"Free Fire",
desc:`Free Fire is a fast paced mobile battle royale game.
Matches are shorter making it perfect for quick gameplay.
Players choose characters with special abilities.
Weapons and vehicles help players survive intense fights.
The game runs well even on low-end mobile phones.
It has millions of players around the world.`,
img:"images/freefire.jpg",
download:"#",
rating:4,
price: 0
},

{
title:"Forza Horizon 5",
desc:`Forza Horizon 5 is an open world racing game set in Mexico.
Players drive hundreds of real world vehicles.
The map includes deserts, jungles, cities and volcanoes.
Players participate in races and explore beautiful environments.
The graphics are extremely realistic and detailed.
It is one of the best racing games ever created.`,
img:"images/forza5.jpg",
download:"#",
rating:5,
price: 5
},

{
title:"Need for Speed Heat",
desc:`Need for Speed Heat focuses on underground street racing.
Players compete in legal races during the day.
At night illegal races attract police attention.
Players must escape police while earning reputation.
Cars can be customized with many performance upgrades.
The game captures the excitement of street racing culture.`,
img:"images/nfsheat.jpg",
download:"#",
rating:4,
price: 4
},

{
title:"Minecraft",
desc:`Minecraft is a sandbox game about creativity and survival.
Players can build houses, castles or entire cities using blocks.
The world is randomly generated and full of resources.
Players can explore caves, fight monsters and craft tools.
Multiplayer allows building with friends online.
It is one of the best selling games in history.`,
img:"images/minecraft.jpg",
download:"#",
rating:5,
price: 4
},

{
title:"Resident Evil Village",
desc:`Resident Evil Village is a survival horror game.
Players explore a mysterious village filled with danger.
The story follows Ethan Winters searching for his daughter.
Players fight monsters while solving puzzles.
The atmosphere is dark and terrifying.
It continues the famous Resident Evil storyline.`,
img:"images/revillage.jpg",
download:"#",
rating:4,
price: 12
},

{
title:"Call of Duty Warzone",
desc:`Call of Duty Warzone is a battle royale shooter.
Players drop into a large map and fight to survive.
Weapons, vehicles and teamwork are essential.
The game features intense gunfights and tactical gameplay.
Players can revive teammates and complete contracts.
It remains one of the top online shooters.`,
img:"images/warzone.jpg",
download:"#",
rating:5,
price: 0
},

{
title:"Dream League Soccer 2026",
desc:`Dream League Soccer 2026 is a football simulation game.
Players build their own team and compete in leagues.
You can sign famous players and improve your stadium.
Matches feature smooth gameplay and realistic animations.
Training and upgrades help improve team performance.
It is a favorite football game among mobile players.`,
img:"images/dls2026.jpg",
download:"#",
rating:5,
price: 0
}
    ,
{
title:"FIFA 23",
desc:`FIFA 23 is a realistic football simulation game.
Players control professional teams from leagues around the world.
The game features improved physics and player animations.
Career mode allows managing clubs and signing players.
Online modes allow players to compete against friends.
It is one of the most popular sports games globally.`,
img:"images/fifa23.jpg",
download:"#",
rating:5,
price: 2
},

{
title:"EA Sports FC 24",
desc:`EA Sports FC 24 continues the legacy of football simulation games.
Players can control famous clubs and international teams.
The game introduces advanced movement and tactical systems.
Players can create their dream squad and compete online.
Career mode allows managing players and building teams.
It offers a highly realistic football experience.`,
img:"images/fc24.jpg",
download:"#",
rating:5,
price: 9
},

{
title:"Assassin's Creed Valhalla",
desc:`Assassin's Creed Valhalla is an open world action RPG.
Players control a Viking warrior exploring medieval England.
The game features raids, exploration and large battles.
Players can upgrade weapons and build settlements.
Choices in the story influence alliances and conflicts.
It combines history with action adventure gameplay.`,
img:"images/acvalhalla.jpg",
download:"#",
rating:4,
price: 3
},

{
title:"Assassin's Creed Odyssey",
desc:`Assassin's Creed Odyssey takes place in ancient Greece.
Players explore islands, cities and battlefields.
The game features naval combat and large scale battles.
Players can choose dialogue options affecting the story.
The open world is filled with quests and historical locations.
It offers a huge RPG adventure experience.`,
img:"images/acodyssey.jpg",
download:"#",
rating:4
},

{
title:"Far Cry 6",
desc:`Far Cry 6 is an open world shooter set in a tropical island.
Players join a revolution against a powerful dictator.
The game features a large map with cities and jungles.
Players can craft weapons and use vehicles during combat.
The story focuses on freedom and resistance.
It delivers intense action gameplay.`,
img:"images/farcry6.jpg",
download:"#",
rating:4
},

{
title:"Watch Dogs Legion",
desc:`Watch Dogs Legion is a hacking based open world game.
Players fight against an oppressive system in London.
The game allows recruiting any character in the city.
Each character has unique abilities and skills.
Players hack technology and control drones.
It offers a unique gameplay experience.`,
img:"images/watchdogslegion.jpg",
download:"#",
rating:4
},

{
title:"Apex Legends",
desc:`Apex Legends is a fast paced battle royale shooter.
Players choose heroes with special abilities.
Teams must survive against many other squads.
The game focuses on teamwork and tactical gameplay.
Weapons and abilities create intense battles.
It remains one of the most competitive shooters.`,
img:"images/apex.jpg",
download:"#",
rating:5
},

{
title:"Valorant",
desc:`Valorant is a competitive tactical shooter game.
Players join teams and complete objectives.
Each agent has unique abilities that affect gameplay.
The game requires strategy and precise aiming.
Matches are intense and highly competitive.
It has become a major esports title.`,
img:"images/valorant.jpg",
download:"#",
rating:5
},

{
title:"Counter Strike 2",
desc:`Counter Strike 2 is a classic competitive shooter.
Players join terrorist or counter terrorist teams.
The game focuses on strategy and precise shooting.
Rounds require teamwork and communication.
Maps are carefully designed for competitive play.
It is one of the most famous esports games.`,
img:"images/cs2.jpg",
download:"#",
rating:5
},

{
title:"Rainbow Six Siege",
desc:`Rainbow Six Siege is a tactical shooter game.
Players plan attacks and defend objectives.
Each operator has unique gadgets and abilities.
Destructible environments add strategy to gameplay.
Communication is essential for success.
It offers intense team based combat.`,
img:"images/r6.jpg",
download:"#",
rating:4
},

{
title:"Asphalt 9 Legends",
desc:`Asphalt 9 Legends is an arcade racing game.
Players race exotic supercars across the world.
The game features high speed action and stunts.
Cars can be upgraded and customized.
Online races allow competing with other players.
It is one of the best mobile racing games.`,
img:"images/asphalt9.jpg",
download:"#",
rating:4
},

{
title:"Real Racing 3",
desc:`Real Racing 3 is a realistic racing simulator.
Players drive licensed cars on real world tracks.
The game focuses on realistic driving physics.
Players can upgrade cars and compete in tournaments.
Multiplayer races allow competing globally.
It delivers a realistic racing experience.`,
img:"images/realracing3.jpg",
download:"#",
rating:4
},

{
title:"Clash of Clans",
desc:`Clash of Clans is a strategy building game.
Players build villages and train powerful armies.
Battles allow attacking other players worldwide.
Upgrades improve defenses and troops.
Clan wars allow teamwork between players.
It remains one of the most successful mobile games.`,
img:"images/clashofclans.jpg",
download:"#",
rating:5
},

{
title:"Clash Royale",
desc:`Clash Royale is a real time strategy card game.
Players collect cards representing troops and spells.
Battles take place in fast paced arenas.
Players must destroy enemy towers to win.
Strategy and quick decisions are important.
It is a popular competitive mobile game.`,
img:"images/clashroyale.jpg",
download:"#",
rating:4
},

{
title:"Among Us",
desc:`Among Us is a multiplayer social deduction game.
Players work together to complete spaceship tasks.
Hidden impostors attempt to sabotage the crew.
Players discuss and vote to identify impostors.
The game encourages teamwork and deception.
It became extremely popular worldwide.`,
img:"images/amongus.jpg",
download:"#",
rating:4
}
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
          <p>${game.desc.substring(0,60)}...</p>
          <div class="game-rating">${"★".repeat(Math.floor(game.rating))}</div>
          <div class="game-price">${game.price === 0 ? "Free" : "$" + game.price}</div>
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
// Sidebar toggle
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const closeSidebar = document.getElementById("closeSidebar");

menuBtn.addEventListener("click", () => sidebar.classList.add("open"));
closeSidebar.addEventListener("click", () => sidebar.classList.remove("open"));

// Redirect pages
const menuPages = {
  menuSettings: "settings.html",
  menuPrivacy: "privacy.html",
  menuShare: "share.html",
  menuHelp: "help.html",
  menuRate: "rate.html",
  menuAbout: "about.html",
  menuLogout: "logout.html"
};

Object.keys(menuPages).forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("click", () => {
      window.location.href = menuPages[id];
    });
  }
});
// Dark/Light theme toggle
const themeBtn = document.getElementById("menuTheme");
const themeLabel = document.getElementById("themeLabel");

// Check saved theme on load
let currentTheme = localStorage.getItem("theme") || "dark";
document.body.classList.toggle("light-theme", currentTheme === "light");
themeLabel.innerText = currentTheme === "light" ? "Light" : "Dark";

// Toggle on click
themeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("light-theme")) {
    document.body.classList.remove("light-theme");
    localStorage.setItem("theme", "dark");
    themeLabel.innerText = "Dark";
  } else {
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
    themeLabel.innerText = "Light";
  }
});
const popupDownload = document.getElementById("popupDownload");

if(game.price === 0){
  popupDownload.href = game.download;
  popupDownload.innerText = "Download";
} else {
  popupDownload.href = "#";
  popupDownload.innerText = "Buy Game";
  popupDownload.onclick = () => alert("Payments coming soon 💳");
}
