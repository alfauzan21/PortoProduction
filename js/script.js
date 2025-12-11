// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ==================== HAMBURGER MENU TOGGLE ====================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    const spans = hamburger.querySelectorAll("span");
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(8px, 8px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(8px, -8px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
}

// ==================== CLOSE MENU WHEN CLICKING NAV LINKS ====================
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("active");

      if (hamburger) {
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    }
  });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ==================== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

document
  .querySelectorAll(".service-card, .doc-card, .team-card")
  .forEach((card) => {
    observer.observe(card);
  });

// ==================== FILE UPLOAD DISPLAY ====================
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");

if (fileInput && fileName) {
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileSize = (file.size / 1024).toFixed(2);
      fileName.textContent = `📎 ${file.name} (${fileSize} KB)`;
      fileName.classList.add("active");
    } else {
      fileName.textContent = "";
      fileName.classList.remove("active");
    }
  });
}

// ==================== FORM SUBMISSION WITH RESULT DISPLAY ====================
const contactForm = document.getElementById("contactForm");
const submissionResult = document.getElementById("submissionResult");
const resultBody = document.getElementById("resultBody");

if (contactForm && submissionResult && resultBody) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const service = formData.get("service");
    const budget = formData.get("budget");
    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const details = formData.get("details");
    const file = fileInput ? fileInput.files[0] : null;

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
    submissionResult.classList.add("active");

    // Scroll to result smoothly
    setTimeout(() => {
      submissionResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);

    // Reset form
    contactForm.reset();
    if (fileName) {
      fileName.textContent = "";
      fileName.classList.remove("active");
    }

    // Optional: Hide result after 10 seconds
    setTimeout(() => {
      submissionResult.classList.remove("active");
    }, 10000);
  });
}

// ==================== CLIENTS SLIDER INTERACTION ====================
const clientsTrack = document.querySelector(".clients-track");

if (clientsTrack) {
  clientsTrack.addEventListener("mouseenter", () => {
    clientsTrack.style.animationDuration = "80s";
  });

  clientsTrack.addEventListener("mouseleave", () => {
    clientsTrack.style.animationDuration = "40s";
  });
}

// ==================== PORTFOLIO FILTER SYSTEM ====================
// Portfolio Data
const portfolioData = [
  {
    id: 1,
    title: "Tech Summit 2024",
    category: "corporate",
    categoryName: "Corporate Event",
    year: "2024",
    views: "15K",
    image: "assets/img/Laurel JAFF.jpg",
  },
  {
    id: 2,
    title: "Elegant Wedding Day",
    category: "wedding",
    categoryName: "Wedding Photography",
    year: "2024",
    views: "23K",
    image: "assets/img/Laurel JAFF.jpg",
  },
  {
    id: 3,
    title: "Premium Product Launch",
    category: "product",
    categoryName: "Product Photography",
    year: "2024",
    views: "18K",
    image: "assets/img/Laurel JAFF.jpg",
  },
  {
    id: 4,
    title: "Music Festival 2024",
    category: "event",
    categoryName: "Event Coverage",
    year: "2024",
    views: "31K",
    image: "assets/img/Laurel JAFF.jpg",
  },
  {
    id: 5,
    title: "Brand Commercial",
    category: "commercial",
    categoryName: "Commercial Ad",
    year: "2024",
    views: "42K",
    image: "assets/img/Laurel JAFF.jpg",
  },
  {
    id: 6,
    title: "City Life Documentary",
    category: "documentary",
    categoryName: "Documentary Film",
    year: "2024",
    views: "28K",
    image: "assets/img/Laurel JAFF.jpg",
  },
  {
    id: 7,
    title: "Annual Conference",
    category: "corporate",
    categoryName: "Corporate Event",
    year: "2024",
    views: "12K",
    image: "assets/img/Laurel JAFF.jpg",
  },
  {
    id: 8,
    title: "Dream Wedding",
    category: "wedding",
    categoryName: "Wedding Video",
    year: "2024",
    views: "19K",
    image: "assets/img/Laurel JAFF.jpg",
  },
  {
    id: 9,
    title: "Fashion Product Line",
    category: "product",
    categoryName: "Product Video",
    year: "2024",
    views: "25K",
    image: "assets/img/Laurel JAFF.jpg",
  },
  {
    id: 10,
    title: "Food Festival",
    category: "event",
    categoryName: "Event Documentation",
    year: "2024",
    views: "16K",
    image: "assets/img/Laurel JAFF.jpg",
  },
  {
    id: 11,
    title: "TV Commercial 2024",
    category: "commercial",
    categoryName: "Commercial Production",
    year: "2024",
    views: "38K",
    image: "assets/img/Laurel JAFF.jpg",
  },
  {
    id: 12,
    title: "Ocean Conservation",
    category: "documentary",
    categoryName: "Documentary Series",
    year: "2024",
    views: "35K",
    image: "assets/img/Laurel JAFF.jpg",
  },
];

// ==================== DOCUMENTATION DATA - DECLARE FIRST ====================
const docData = {
  corporate: {
    title: "Corporate Event 2024",
    synopsis:
      "A comprehensive documentation of our corporate event held in Jakarta. This event showcased the latest innovations in production technology and creative storytelling techniques.",
    director: "Porto Production Team",
    writers: "Creative Team",
    location: "Jakarta Convention Center",
    year: "2024",
    rating: "9.5",
    duration: "15 min",
    categories: ["Corporate", "Event", "Documentary", "Business"],
    videoSrc: "assets/video/video-porto.mp4",
  },
  product: {
    title: "Product Launch Bali",
    synopsis:
      "An exclusive product launch event captured in the beautiful island of Bali. Featuring stunning cinematography and compelling brand storytelling.",
    director: "Michael Anderson",
    writers: "Sarah Johnson, Mike Chen",
    location: "Bali Seminyak",
    year: "2024",
    rating: "9.2",
    duration: "12 min",
    categories: ["Product", "Launch", "Commercial", "Lifestyle"],
    videoSrc: "assets/video/video-porto.mp4",
  },
  music: {
    title: "Music Festival Bandung",
    synopsis:
      "A three-day music festival documentation featuring local and international artists. Captured with multi-camera setup and drone cinematography.",
    director: "David Lee",
    writers: "Porto Creative Studio",
    location: "Trans Studio Bandung",
    year: "2024",
    rating: "9.8",
    duration: "20 min",
    categories: ["Music", "Festival", "Concert", "Live Event"],
    videoSrc: "assets/video/video-porto.mp4",
  },
  brand: {
    title: "Brand Campaign Surabaya",
    synopsis:
      "A creative brand campaign shoot in Surabaya featuring lifestyle and product photography. Showcasing modern urban aesthetics and innovative compositions.",
    director: "Lisa Williams",
    writers: "Brand Team",
    location: "Surabaya City Center",
    year: "2024",
    rating: "9.0",
    duration: "10 min",
    categories: ["Brand", "Campaign", "Photography", "Creative"],
    videoSrc: "assets/video/video-porto.mp4",
  },
};

// ==================== RENDER PORTFOLIO ====================
function renderPortfolio(filter = "all") {
  const grid = document.getElementById("portfolioGrid");
  const noResults = document.getElementById("noResults");

  if (!grid) {
    console.error("Portfolio grid not found");
    return;
  }

  // Filter data
  const filteredData =
    filter === "all"
      ? portfolioData
      : portfolioData.filter((item) => item.category === filter);

  // Show/hide no results
  if (noResults) {
    if (filteredData.length === 0) {
      noResults.classList.add("show");
      grid.style.display = "none";
      return;
    } else {
      noResults.classList.remove("show");
      grid.style.display = "grid";
    }
  }

  // Clear grid
  grid.innerHTML = "";

  // Render items with stagger animation
  filteredData.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "portfolio-card";
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-badge">${item.categoryName}</div>
                <div class="portfolio-overlay"></div>
            </div>
            <div class="portfolio-info">
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-category">${item.categoryName}</p>
                <div class="portfolio-meta">
                    <span><i class="fas fa-calendar"></i> ${item.year}</span>
                    <span><i class="fas fa-eye"></i> ${item.views} views</span>
                </div>
            </div>
        `;

    grid.appendChild(card);
  });
}

// ==================== FILTER BUTTON HANDLER ====================
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((b) => b.classList.remove("active"));

    // Add active class to clicked button
    btn.classList.add("active");

    // Get filter value
    const filter = btn.getAttribute("data-filter");

    // Render portfolio
    renderPortfolio(filter);
  });
});

// ==================== DOCUMENTATION MODAL FUNCTIONS ====================
// Open Modal Function
// Documentation Modal
function openDocModal(docKey) {
  const modal = document.getElementById("docModal");
  const data = docData[docKey];

  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalSynopsis").textContent = data.synopsis;
  document.getElementById("modalDirector").textContent = data.director;
  document.getElementById("modalWriters").textContent = data.writers;
  document.getElementById("modalLocation").textContent = data.location;

  modal.classList.add("active");
}

function closeDocModal() {
  const modal = document.getElementById("docModal");
  const video = document.getElementById("modalVideo");
  modal.classList.remove("active");
  video.pause();
}

// Add click handlers to doc cards
document.querySelectorAll(".doc-card").forEach((card) => {
  card.addEventListener("click", function () {
    const docKey = this.getAttribute("data-doc");
    openDocModal(docKey);
  });
});

// Close modal on outside click
document.getElementById("docModal").addEventListener("click", function (e) {
  if (e.target === this) closeDocModal();
});

// Initialize
renderPortfolio("all");
console.log("✅ All systems initialized!");

// Read More
function readMoreDoc() {
  alert(
    "Read More clicked! This would navigate to detailed documentation page."
  );
}

// Watchlist
function addToWatchlist() {
  const modalTitle = document.getElementById("modalTitle");
  const title = modalTitle ? modalTitle.textContent : "This item";
  alert(`"${title}" added to Watchlist! ✓`);
}

// Make functions globally accessible
window.openDocModal = openDocModal;
window.closeDocModal = closeDocModal;
window.readMoreDoc = readMoreDoc;
window.addToWatchlist = addToWatchlist;

// ==================== INITIALIZE ON DOM READY ====================
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎬 Porto Production Website Loaded!");

  // Initialize portfolio
  renderPortfolio("all");
  console.log("✅ Portfolio initialized");

  // Add click handlers to doc cards
  const docCards = document.querySelectorAll(".doc-card");
  docCards.forEach((card) => {
    card.addEventListener("click", function () {
      const docKey = this.getAttribute("data-doc");
      if (docKey) {
        openDocModal(docKey);
      }
    });
  });
  console.log(`✅ Documentation cards initialized (${docCards.length} cards)`);

  // Modal outside click handler
  const modal = document.getElementById("docModal");
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === this) closeDocModal();
    });
    console.log("✅ Modal handlers initialized");
  }

  // Escape key handler
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const modal = document.getElementById("docModal");
      if (modal && modal.classList.contains("active")) {
        closeDocModal();
      }
    }
  });

  console.log("✅ All features initialized successfully!");
});

console.log("📝 Script loaded - waiting for DOM...");
