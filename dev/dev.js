const menuButton = document.getElementById("menu-button");
const mainNav = document.getElementById("main-nav");


menuButton.addEventListener("click", function () {

    mainNav.classList.toggle("open");

    const isOpen = mainNav.classList.contains("open");

    menuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

});


const navLinks = mainNav.querySelectorAll("a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        mainNav.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});
