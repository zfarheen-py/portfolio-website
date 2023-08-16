const header = document.querySelector("header");

const links = document.querySelectorAll(".nav-links");

const toggle_btn = document.querySelector(".toggle-btn");

const hamburger = document.querySelector(".hamburger");

const parentContainer = document.querySelector(".info");

window.addEventListener("scroll", () => {
    activeLink();
})

/* Sticky Navbar */

function stickyNavbar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}
stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

/* Reveal Animation */

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", {delay: 600});
sr.reveal(".showcase-image", {delay: 600});
sr.reveal(".about-info", {delay: 600});
sr.reveal(".box-heading", {delay: 600});
sr.reveal(".portfolio-header", {delay: 600});
sr.reveal(".contact-info", {delay: 600});
sr.reveal(".sub-info", {delay: 600});

/* Change Active Link On Scroll */

function activeLink(){
    let sections = document.querySelectorAll("section[id]");
    let passedSections = Array.from(sections).map((sct, i) => {
        return {
            y: sct.getBoundingClientRect().top - header.offsetHeight,
            id: i,
        };
    })
    .filter((sct) => sct.y <= 0);

    let currSectionID = passedSections.at(-1).id;

    links.forEach((l) => l.classList.remove("active"));
    links[currSectionID].classList.add("active");
}
activeLink();

/* Portfolio Filter Animation */

let mixer = mixitup('.portfolio-gallery', {
    selectors: {
        target: '.prt-card'
    },
    animation: {
        duration: 500
    }
});

/* Change Page Theme */

let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark){
    if(isDark){
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon", "uil-sun");
        localStorage.setItem("dark", 1);
    } else{
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun", "uil-moon");
        localStorage.setItem("dark", 0);
    }
}
toggle_btn.addEventListener("click", () => {
    changeTheme(!document.body.classList.contains("dark"));
})

/* Open & Close Navbar Menu */

hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
})

links.forEach(links => links.addEventListener("click", () => {
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
}))


/* Read More Read Less */

parentContainer.addEventListener('click', event => {
    const current = event.target;
    const isReadMoreBtn = current.className.includes('read-more-btn');

    if(!isReadMoreBtn) return;
    const currentText = event.target.parentNode.querySelector('.read-more-text');
    currentText.classList.toggle('read-more-text--show');
    
    if(current.textContent.includes('read more')){
        current.innerHTML = 'read less <i class="uil uil-angle-double-left"></i>';
    }
    else{
        current.innerHTML = 'read more <i class="uil uil-angle-double-right"></i>';
    }
})
