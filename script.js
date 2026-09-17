/* ===== MOBILE NAVIGATION ===== */

const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");

if (menuButton && navbar) {
    menuButton.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("is-open");
        menuButton.classList.toggle("is-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu after clicking a navigation link
    navbar.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("is-open");
            menuButton.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}



/* ===== LIGHTBOX ===== */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const screenshots = document.querySelectorAll(".screenshot");

screenshots.forEach((screenshot) => {
    screenshot.addEventListener("click", () => {
        const imageSource = screenshot.dataset.image;
        const image = screenshot.querySelector("img");
        if (imageSource) {
            lightboxImage.src = imageSource;
        } else if (image) {
            lightboxImage.src = image.src;
        }
        if (image) {
            lightboxImage.alt = image.alt || "Project screenshot";
        }
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    });
});

function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
}

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener(
        "click",
        (event) => {
            if (event.target === lightbox) { closeLightbox(); }
        }
    );

}



/* ===== ESCAPE KEY ===== */

document.addEventListener(
    "keydown",
    (event) => {
        if (event.key === "Escape") {
            if ( lightbox && lightbox.classList.contains("is-open") ) {
                closeLightbox();
            }
            if ( navbar && navbar.classList.contains("is-open") ) {
                navbar.classList.remove("is-open");
                menuButton.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
            }
        }
    }
);



/* ===== CURRENT YEAR ===== */

const currentYear = document.getElementById("currentYear");
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}



/* ===== ACTIVE NAVIGATION ===== */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".navbar a");

const observer =
    new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                const currentId = entry.target.getAttribute("id");
                navigationLinks.forEach((link) => {
                    const linkTarget = link.getAttribute("href");
                    link.classList.toggle("active", linkTarget === `#${currentId}`);
                });
            });
        },
        {
            threshold: 0.25
        }
    );

sections.forEach((section) => { observer.observe(section); });