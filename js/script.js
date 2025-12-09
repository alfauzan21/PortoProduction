// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== HAMBURGER MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ==================== CLOSE MENU WHEN CLICKING NAV LINKS ====================
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .doc-card, .team-card').forEach(card => {
    observer.observe(card);
});

// ==================== PORTFOLIO SLIDER WITH MOUSE DRAG & TOUCH SUPPORT ====================
const portfolioSlider = document.getElementById('portfolioSlider');
const portfolioTrack = document.getElementById('portfolioTrack');
let isDown = false;
let startX;
let scrollLeft;

// Mouse drag functionality
portfolioSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    portfolioSlider.classList.add('grabbing');
    startX = e.pageX - portfolioSlider.offsetLeft;
    scrollLeft = portfolioTrack.style.transform ? 
        parseInt(portfolioTrack.style.transform.replace('translateX(', '').replace('px)', '')) : 0;
});

portfolioSlider.addEventListener('mouseleave', () => {
    isDown = false;
    portfolioSlider.classList.remove('grabbing');
});

portfolioSlider.addEventListener('mouseup', () => {
    isDown = false;
    portfolioSlider.classList.remove('grabbing');
});

portfolioSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - portfolioSlider.offsetLeft;
    const walk = (x - startX) * 2;
    const newPosition = scrollLeft + walk;
    
    // Limit scrolling
    const maxScroll = -(portfolioTrack.scrollWidth - portfolioSlider.offsetWidth);
    const limitedPosition = Math.max(Math.min(newPosition, 0), maxScroll);
    
    portfolioTrack.style.transform = `translateX(${limitedPosition}px)`;
});

// Touch support for mobile
let touchStartX = 0;
let touchScrollLeft = 0;

portfolioSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = portfolioTrack.style.transform ? 
        parseInt(portfolioTrack.style.transform.replace('translateX(', '').replace('px)', '')) : 0;
});

portfolioSlider.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - touchStartX) * 2;
    const newPosition = touchScrollLeft + walk;
    
    const maxScroll = -(portfolioTrack.scrollWidth - portfolioSlider.offsetWidth);
    const limitedPosition = Math.max(Math.min(newPosition, 0), maxScroll);
    
    portfolioTrack.style.transform = `translateX(${limitedPosition}px)`;
});

// Mouse wheel horizontal scroll
portfolioSlider.addEventListener('wheel', (e) => {
    e.preventDefault();
    const currentTransform = portfolioTrack.style.transform ? 
        parseInt(portfolioTrack.style.transform.replace('translateX(', '').replace('px)', '')) : 0;
    
    const newPosition = currentTransform - (e.deltaY * 2);
    const maxScroll = -(portfolioTrack.scrollWidth - portfolioSlider.offsetWidth);
    const limitedPosition = Math.max(Math.min(newPosition, 0), maxScroll);
    
    portfolioTrack.style.transform = `translateX(${limitedPosition}px)`;
}, { passive: false });

// ==================== FILE UPLOAD DISPLAY ====================
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');

if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const fileSize = (file.size / 1024).toFixed(2);
            fileName.textContent = `📎 ${file.name} (${fileSize} KB)`;
            fileName.classList.add('active');
        } else {
            fileName.textContent = '';
            fileName.classList.remove('active');
        }
    });
}

// ==================== FORM SUBMISSION WITH RESULT DISPLAY ====================
const contactForm = document.getElementById('contactForm');
const submissionResult = document.getElementById('submissionResult');
const resultBody = document.getElementById('resultBody');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const service = formData.get('service');
        const budget = formData.get('budget');
        const fullname = formData.get('fullname');
        const email = formData.get('email');
        const details = formData.get('details');
        const file = fileInput.files[0];
        
        // Build result HTML
        let resultHTML = `
            <div class="result-item">
                <div class="result-label">Service:</div>
                <div class="result-value">${service}</div>
            </div>
            <div class="result-item">
                <div class="result-label">Budget:</div>
                <div class="result-value">${budget}</div>
            </div>
            <div class="result-item">
                <div class="result-label">Full Name:</div>
                <div class="result-value">${fullname}</div>
            </div>
            <div class="result-item">
                <div class="result-label">Email:</div>
                <div class="result-value">${email}</div>
            </div>
            <div class="result-item">
                <div class="result-label">Project Details:</div>
                <div class="result-value">${details}</div>
            </div>
        `;
        
        if (file) {
            const fileSize = (file.size / 1024).toFixed(2);
            resultHTML += `
                <div class="result-item">
                    <div class="result-label">Attached File:</div>
                    <div class="result-value">${file.name} (${fileSize} KB)</div>
                </div>
            `;
        }
        
        // Display result
        resultBody.innerHTML = resultHTML;
        submissionResult.classList.add('active');
        
        // Scroll to result smoothly
        setTimeout(() => {
            submissionResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        // Reset form
        contactForm.reset();
        fileName.textContent = '';
        fileName.classList.remove('active');
        
        // Optional: Hide result after 10 seconds
        setTimeout(() => {
            submissionResult.classList.remove('active');
        }, 10000);
    });
}

// ==================== CLIENTS SLIDER INTERACTION ====================
const clientsTrack = document.querySelector('.clients-track');

if (clientsTrack) {
    clientsTrack.addEventListener('mouseenter', () => {
        clientsTrack.style.animationDuration = '80s'; // Slower on hover
    });
    
    clientsTrack.addEventListener('mouseleave', () => {
        clientsTrack.style.animationDuration = '40s'; // Normal speed
    });
}

console.log('   ✅ Clients slider animation');

// ==================== DOCUMENTATION MODAL FUNCTIONS ====================

// Data for each documentation
const docData = {
    'Corporate Event 2024': {
        year: '2024',
        rating: '9.5',
        duration: '15 min',
        categories: ['Corporate', 'Event', 'Documentary', 'Business'],
        videoSrc: 'assets/video/video-porto.mp4'
    },
    'Product Launch Bali': {
        year: '2024',
        rating: '9.2',
        duration: '12 min',
        categories: ['Product', 'Launch', 'Commercial', 'Lifestyle'],
        videoSrc: 'assets/video/video-porto.mp4'
    },
    'Music Festival Bandung': {
        year: '2024',
        rating: '9.8',
        duration: '20 min',
        categories: ['Music', 'Festival', 'Concert', 'Live Event'],
        videoSrc: 'assets/video/video-porto.mp4'
    },
    'Brand Campaign Surabaya': {
        year: '2024',
        rating: '9.0',
        duration: '10 min',
        categories: ['Brand', 'Campaign', 'Photography', 'Creative'],
        videoSrc: 'assets/video/video-porto.mp4'
    }
};

// Open Modal Function
function openDocModal(title, synopsis, director, writers, location) {
    const modal = document.getElementById('docModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSynopsis = document.getElementById('modalSynopsis');
    const modalDirector = document.getElementById('modalDirector');
    const modalWriters = document.getElementById('modalWriters');
    const modalLocation = document.getElementById('modalLocation');
    const modalVideo = document.getElementById('modalVideo');
    
    // Get data
    const data = docData[title] || docData['Corporate Event 2024'];
    
    // Update content
    modalTitle.textContent = title;
    modalSynopsis.textContent = synopsis;
    modalDirector.textContent = director;
    modalWriters.textContent = writers;
    modalLocation.textContent = location;
    
    // Update badges
    document.querySelector('.modal-badge.year').textContent = data.year;
    document.querySelector('.modal-badge.rating').textContent = `⭐ ${data.rating}`;
    document.querySelector('.modal-badge.duration').textContent = `🎬 ${data.duration}`;
    
    // Update categories
    const categoriesContainer = document.querySelector('.modal-categories');
    categoriesContainer.innerHTML = data.categories
        .map(cat => `<span class="modal-category">${cat}</span>`)
        .join('');
    
    // Update video
    modalVideo.src = data.videoSrc;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalVideo.play();
}

// Close Modal
function closeDocModal() {
    const modal = document.getElementById('docModal');
    const modalVideo = document.getElementById('modalVideo');
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    modalVideo.pause();
    modalVideo.currentTime = 0;
}

// Read More
function readMoreDoc() {
    alert('Read More clicked!');
}

// Watchlist
function addToWatchlist() {
    alert('Added to Watchlist! ✓');
}

// Click outside to close
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('docModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeDocModal();
        });
    }
});

// Escape key to close
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('docModal');
        if (modal && modal.classList.contains('active')) {
            closeDocModal();
        }
    }
});

console.log('   ✅ Documentation modal initialized');

// ==================== CONSOLE LOG ====================
console.log('🎬 Porto Production Website Loaded Successfully! ✨');
console.log('📝 All features initialized:');
console.log('   ✅ Navbar scroll effect');
console.log('   ✅ Hamburger menu');
console.log('   ✅ Smooth scrolling');
console.log('   ✅ Active nav links');
console.log('   ✅ Scroll animations');
console.log('   ✅ Portfolio slider (drag, touch, wheel)');
console.log('   ✅ File upload display');
console.log('   ✅ Form submission with results');