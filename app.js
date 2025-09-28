// Classmates data
const classmates = [
  {
    "vorname": "Anna",
    "nachname": "Müller", 
    "foto": "",
    "zitat": "Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben."
  },
  {
    "vorname": "Max",
    "nachname": "Schmidt",
    "foto": "", 
    "zitat": "Bildung ist die mächtigste Waffe, die man verwenden kann, um die Welt zu verändern."
  },
  {
    "vorname": "Lena",
    "nachname": "Wagner",
    "foto": "",
    "zitat": "Der Weg zum Erfolg ist immer im Bau."
  },
  {
    "vorname": "Tim",
    "nachname": "Fischer",
    "foto": "",
    "zitat": "Träume groß und wage es, zu scheitern."
  },
  {
    "vorname": "Sarah",
    "nachname": "Weber",
    "foto": "",
    "zitat": "Das Leben ist wie ein Fahrrad. Um das Gleichgewicht zu halten, musst du in Bewegung bleiben."
  },
  {
    "vorname": "Leon",
    "nachname": "Bauer",
    "foto": "",
    "zitat": "Erfolg ist nicht final, Versagen ist nicht fatal: Es ist der Mut weiterzumachen, der zählt."
  },
  {
    "vorname": "Lisa",
    "nachname": "Koch",
    "foto": "",
    "zitat": "Die beste Zeit, einen Baum zu pflanzen, war vor 20 Jahren. Die zweitbeste Zeit ist jetzt."
  },
  {
    "vorname": "VIPERRRR",
    "nachname": "RRR",
    "foto": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1200px-Flag_of_the_United_Kingdom_%283-5%29.svg.png",
    "zitat": "ЕСЛИ ТЫ НЕ ВАЙПЕР ЭТО СЛАБАЯ ПОЗИЦИЯ"
  },
  {
    "vorname": "Emma",
    "nachname": "Klein",
    "foto": "",
    "zitat": "Sei du selbst die Veränderung, die du dir wünschst für diese Welt."
  },
  {
    "vorname": "Finn",
    "nachname": "Wolf",
    "foto": "",
    "zitat": "Das Geheimnis des Erfolgs ist, den Standpunkt des anderen zu verstehen."
  },
  {
    "vorname": "Mia",
    "nachname": "Hoffmann",
    "foto": "",
    "zitat": "Jeder Tag ist eine neue Chance, das zu erreichen, was du dir wünschst."
  },
  {
    "vorname": "Paul",
    "nachname": "Neumann",
    "foto": "",
    "zitat": "Die Zukunft hängt davon ab, was wir heute tun."
  }
];

// DOM elements
const classmatesGrid = document.getElementById('classmates-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const modal = document.getElementById('quote-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalPhoto = document.getElementById('modal-photo');
const modalName = document.getElementById('modal-name');
const modalQuote = document.getElementById('modal-quote');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderClassmates(classmates);
    initializeEventListeners();
    initializeScrollAnimations();
    initializeSmoothScrolling();
});

// Render classmates cards
function renderClassmates(studentsList) {
    classmatesGrid.innerHTML = '';
    
    studentsList.forEach((student, index) => {
        const card = createClassmateCard(student, index);
        classmatesGrid.appendChild(card);
    });
    
    // Trigger animation for newly added cards
    setTimeout(() => {
        const cards = document.querySelectorAll('.classmate-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animationDelay = `${index * 0.1}s`;
            }, index * 100);
        });
    }, 100);
}

// Create individual classmate card
function createClassmateCard(student, index) {
    const card = document.createElement('div');
    card.className = 'classmate-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const truncatedQuote = student.zitat.length > 120 
        ? student.zitat.substring(0, 120) + '...' 
        : student.zitat;
    
    card.innerHTML = `
        <img class="classmate-photo" src="${student.foto}" alt="${student.vorname} ${student.nachname}" loading="lazy">
        <h3 class="classmate-name">${student.vorname} ${student.nachname}</h3>
        <p class="classmate-quote">${truncatedQuote}</p>
        <button class="read-more-btn">Vollständiges Zitat lesen</button>
    `;
    
    // Add click event for modal
    card.addEventListener('click', () => openModal(student));
    
    return card;
}

// Open modal with student details
function openModal(student) {
    modalPhoto.src = student.foto;
    modalPhoto.alt = `${student.vorname} ${student.nachname}`;
    modalName.textContent = `${student.vorname} ${student.nachname}`;
    modalQuote.textContent = student.zitat;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus trap
    modalClose.focus();
}

// Close modal
function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Search functionality
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderClassmates(classmates);
        return;
    }
    
    const filteredStudents = classmates.filter(student => {
        const fullName = `${student.vorname} ${student.nachname}`.toLowerCase();
        return fullName.includes(searchTerm) || 
               student.vorname.toLowerCase().includes(searchTerm) ||
               student.nachname.toLowerCase().includes(searchTerm);
    });
    
    renderClassmates(filteredStudents);
    
    // Show message if no results found
    if (filteredStudents.length === 0) {
        classmatesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h3 style="color: var(--graduation-navy); margin-bottom: 16px;">Keine Ergebnisse gefunden</h3>
                <p style="color: var(--color-text-secondary);">Versuchen Sie es mit einem anderen Namen.</p>
            </div>
        `;
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);
    
    // Enter key for search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Modal events
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
    
    // Prevent modal close when clicking inside modal content
    modal.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.classmate-card, .search-section');
    animateElements.forEach(el => observer.observe(el));
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const mainContent = document.querySelector('.main-content');
            mainContent.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Add scroll effect to hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - scrolled / window.innerHeight;
        }
    });
}

// Add loading animation for images
function addImageLoadingEffects() {
    const images = document.querySelectorAll('.classmate-photo');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiNEREREREQiLz4KPHBhdGggZD0iTTEwMCAyMDBMMTUwIDE1MEwyMDAgMjAwSDEwMFoiIGZpbGw9IiNEREREREQiLz4KPC9zdmc+';
            this.alt = 'Foto nicht verfügbar';
        });
    });
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update search to use debouncing
const debouncedSearch = debounce(performSearch, 300);
searchInput.addEventListener('input', debouncedSearch);

// Add keyboard navigation for cards
function initializeKeyboardNavigation() {
    const cards = document.querySelectorAll('.classmate-card');
    cards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Details für ${card.querySelector('.classmate-name').textContent} anzeigen`);
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

// Initialize keyboard navigation after cards are rendered
function initializeAccessibility() {
    setTimeout(initializeKeyboardNavigation, 500);
    addImageLoadingEffects();
}

// Call accessibility initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeAccessibility();
});

// Add random graduation quotes for variety
const graduationQuotes = [
    "Bildung ist das, was übrig bleibt, wenn man alles vergessen hat, was man gelernt hat.",
    "Der Anfang ist die Hälfte des Ganzen.",
    "Erfolg ist nicht der Schlüssel zum Glück. Glück ist der Schlüssel zum Erfolg.",
    "Die Zukunft gehört denen, die heute hart arbeiten.",
    "Jeder Absolvent ist ein Stern, der seinen eigenen Weg am Himmel findet."
];

// Add some Easter eggs for fun
let clickCount = 0;
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('graduation-icon')) {
        clickCount++;
        if (clickCount === 5) {
            const icons = ['🎓', '🌟', '🎉', '🏆', '📚'];
            e.target.textContent = icons[Math.floor(Math.random() * icons.length)];
            setTimeout(() => {
                e.target.textContent = '🎓';
                clickCount = 0;
            }, 2000);
        }
    }
});