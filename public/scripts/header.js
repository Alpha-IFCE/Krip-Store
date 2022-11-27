path = window.location.pathname;

const navLinks = document.querySelectorAll('header .nav-link');

navLinks.forEach(navLink => {
    navLink.classList.remove('active');
    navLink.ariaCurrent="";

    const link = navLink.href;
    const category = `${link.slice('http://localhost:3000'.length)}`;

    if(category === path) {
        navLink.classList.add('active');
        navLink.ariaCurrent="page";
    }
});