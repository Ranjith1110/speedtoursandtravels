
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