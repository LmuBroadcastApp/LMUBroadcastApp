const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxImg = document.getElementById('lightbox-img');
const lightbox = document.getElementById('lightbox');

const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

let lastFocused = null;
let lightboxImages = [];
let currentIndex = 0;

function showImage(index) {
    currentIndex = (index + lightboxImages.length) % lightboxImages.length;
    lightboxImg.src = lightboxImages[currentIndex].src;
    lightboxImg.alt = lightboxImages[currentIndex].alt;
}

document.querySelectorAll('img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        lastFocused = document.activeElement;
        lightboxImages = document.querySelectorAll('img');
        showImage(Array.prototype.indexOf.call(lightboxImages, img));
        lightbox.classList.add('active');
        lightboxClose.focus();
    });
});

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
});

function closeLightbox() {
    lightbox.classList.remove('active');
    if (lastFocused) lastFocused.focus();
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    } else if (lightbox.classList.contains('active') && e.key === 'ArrowLeft') {
        showImage(currentIndex - 1);
    } else if (lightbox.classList.contains('active') && e.key === 'ArrowRight') {
        showImage(currentIndex + 1);
    }
});

lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        lightboxClose.focus();
        e.preventDefault();
    }
});


function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.innerHTML = theme === 'light' ? '&#9789;' : '&#9790;';
}

const saved = localStorage.getItem('theme') || 'dark';
setTheme(saved);

themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

async function fetchDownloads() {
    const cacheKey = 'github_downloads';
    const ttl = 60 * 60 * 1000;
    try {
        const cached = JSON.parse(localStorage.getItem(cacheKey));
        if (cached && Date.now() - cached.time < ttl) {
            document.getElementById('download-count').textContent = cached.total.toLocaleString();
            return;
        }
        const res = await fetch('https://api.github.com/repos/LMUBroadcastApp/LMUBroadcastApp/releases');
        const releases = await res.json();
        let total = 0;
        for (const release of releases) {
            for (const asset of release.assets) {
                total += asset.download_count;
            }
        }
        localStorage.setItem(cacheKey, JSON.stringify({
            total,
            time: Date.now()
        }));
        document.getElementById('download-count').textContent = total.toLocaleString();
    } catch (e) {
        document.getElementById('download-counter').style.display = 'none';
    }
}
//fetchDownloads();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealEls = document.querySelectorAll('.reveal');
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('visible'));
}

const heroImage = document.querySelector('.hero-image');
if (heroImage && !prefersReducedMotion) {
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
            heroImage.style.transform = `translateY(${y * 0.06}px)`;
        }
    }, { passive: true });
}
