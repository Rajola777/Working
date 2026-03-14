// GLOBAL BOTTOM NAVIGATION

document.addEventListener("DOMContentLoaded", () => {

  const navItems = document.querySelectorAll(".bottom-nav .nav-item");

  const pageMap = {
    homeNav: "home.html",
    gamesNav: "games.html",
    tournamentsNav: "tournaments.html",
    chatNav: "chat.html",
    accountNav: "account.html"
  };

  const currentPage = window.location.pathname.split("/").pop();

  navItems.forEach(item => {

    const id = item.id;

    // highlight current page
    if(pageMap[id] === currentPage){
      item.classList.add("active");
    }

    // navigation click
    item.addEventListener("click", () => {
      window.location.href = pageMap[id];
    });

  });

});
