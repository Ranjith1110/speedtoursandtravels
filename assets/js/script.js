
// Navbar Start
async function loadNavbar() {
    try {
        const response = await fetch('components/navbar.html');

        if (!response.ok) {
            throw new Error('Could not load navbar. Make sure you are running a Local Server.');
        }

        const html = await response.text();
        document.getElementById('navbar-container').innerHTML = html;

        initNavbarScripts();

    } catch (error) {
        console.error("Error:", error);
        document.getElementById('navbar-container').innerHTML = "<p class='text-red-500 text-center'>Error loading navbar. Please open this via 'Live Server'.</p>";
    }
}

function initNavbarScripts() {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY === 0) {
            navbar.classList.remove('fixed', 'nav-hidden', 'shadow-md');
            navbar.classList.add('absolute', 'nav-visible');
        }
        else if (currentScrollY > 0 && currentScrollY < 200) {
            navbar.classList.remove('nav-visible');
            navbar.classList.add('nav-hidden');
        }
        else if (currentScrollY >= 200) {
            navbar.classList.remove('absolute', 'nav-hidden');
            navbar.classList.add('fixed', 'nav-visible', 'shadow-md');
        }
    });
}

loadNavbar();
// Navbar End

// Footer Start
async function loadFooter() {
    try {
        const response = await fetch('components/footer.html');

        if (!response.ok) {
            throw new Error('Could not load footer. Make sure you are running Live Server.');
        }

        const html = await response.text();
        document.getElementById('footer-container').innerHTML = html;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById('footer-container').innerHTML =
            "<p class='text-red-500 text-center'>Error loading footer. Please open via Live Server.</p>";
    }
}

loadFooter();
// Footer End

// Hero Swiper Start
const hero = document.getElementById("heroSection");
const title = document.getElementById("heroTitle");
const subtitle = document.getElementById("heroSubtitle");

const cards = {
    1: document.getElementById("card1"),
    2: document.getElementById("card2"),
    3: document.getElementById("card3"),
    4: document.getElementById("card4"),
};

const slides = {
    1: { img: "assets/images/destination/destination1.jpg", title: "Hire Cabs in Rameswaram", subtitle: "Best Taxi Services with 24/7 Support" },
    2: { img: "assets/images/destination/destination2.jpg", title: "Rameswaram Tour Packages", subtitle: "Explore all tourist places comfortably, Explore all tourist places comfortably" },
    3: { img: "assets/images/destination/destination3.jpg", title: "Top Attractions in Rameswaram", subtitle: "Visit all the famous sightseeing spots, Explore all tourist places comfortably" },
    4: { img: "assets/images/destination/destination4.jpg", title: "Hotels & Resorts", subtitle: "Find the best rated hotels for your stay, Explore all tourist places comfortably" }
};

let current = 1;
let autoSlide;

function setActive(index) {
    Object.values(cards).forEach(c => c.classList.remove("active"));
    cards[index].classList.add("active");
}

function changeHero(index) {
    hero.style.opacity = 0;

    setTimeout(() => {
        hero.style.backgroundImage = `url('${slides[index].img}')`;
        title.innerText = slides[index].title;
        subtitle.innerText = slides[index].subtitle;
        hero.style.opacity = 1;
    }, 300);

    setActive(index);
}

function autoSlideStart() {
    autoSlide = setInterval(() => {
        current = current === 4 ? 1 : current + 1;
        changeHero(current);
    }, 6000);
}

function manualChange(index) {
    clearInterval(autoSlide);
    current = index;
    changeHero(index);
    autoSlideStart();
}

setActive(1);
autoSlideStart();
// Hero Swiper End

// Counter Animation Function
function startCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const speed = 80;
    let count = 0;

    const updateCount = () => {
        count += Math.ceil(target / 50);
        if (count < target) {
            counter.innerText = count;
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
}

// Trigger animation on scroll using IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document.querySelectorAll(".counter").forEach(counter => startCounter(counter));
            observer.disconnect();
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector("#counter-section"));
// Counter Animation End

// Load More / Load Less Functionality
document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadLessBtn = document.getElementById('load-less-btn');
    const cards = document.querySelectorAll('.package-card');
    const itemsToShow = 8;

    loadMoreBtn.addEventListener('click', function () {
        const hiddenCards = document.querySelectorAll('.package-card.hidden');
        hiddenCards.forEach(card => {
            card.classList.remove('hidden');
        });

        loadMoreBtn.classList.add('hidden');
        loadLessBtn.classList.remove('hidden');
    });

    loadLessBtn.addEventListener('click', function () {
        cards.forEach((card, index) => {
            if (index >= itemsToShow) {
                card.classList.add('hidden');
            }
        });

        loadLessBtn.classList.add('hidden');
        loadMoreBtn.classList.remove('hidden');

        document.getElementById('packages-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
// Load More / Load Less Functionality End

// Testimonial Swiper Start
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    effect: "fade", // Optional: Fade effect looks classy for testimonials
    fadeEffect: { crossFade: true },
    navigation: {
        nextEl: ".custom-next", 
        prevEl: ".custom-prev",
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});
// Testimonial Swiper End