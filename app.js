// Application Data
const applicationData = {
  "artist_info": {
    "name": "Pixel Art Master",
    "tagline": "High-Detail Pixel Art for Indie Games & Commercial Projects",
    "description": "Professional pixel artist specializing in Gothic architecture, Fantasy characters, and Cyberpunk environments. Featured on Pinterest with 10K+ followers and 1.4K daily impressions."
  },
  "free_collections": [
    {
      "name": "Gothic Interiors",
      "description": "Atmospheric abandoned mansions and gothic architecture",
      "folder": "gothic-interiors",
      "preview": "gothic-preview.png",
      "count": 12,
      "tags": ["Gothic", "Architecture", "Horror", "Medieval"]
    },
    {
      "name": "Surreal Weddings", 
      "description": "Dreamlike wedding venues with impossible geometry",
      "folder": "surreal-weddings",
      "preview": "surreal-preview.png", 
      "count": 8,
      "tags": ["Wedding", "Surreal", "Fantasy", "Venues"]
    },
    {
      "name": "Fantasy Characters",
      "description": "Mystical beings and legendary creatures",
      "folder": "fantasy-characters",
      "preview": "fantasy-preview.png",
      "count": 15,
      "tags": ["Characters", "Fantasy", "RPG", "Creatures"]
    }
  ],
  "premium_collections": [
    {
      "name": "Mech Warriors Pack",
      "description": "Industrial mechs and futuristic battle suits",
      "folder": "mech-warriors",
      "preview": "mech-preview.png",
      "price": "$25",
      "count": 20,
      "tags": ["Mech", "Sci-Fi", "Robots", "Cyberpunk"]
    },
    {
      "name": "Royal Palaces Collection", 
      "description": "Luxurious Rococo ballrooms and golden halls",
      "folder": "royal-palaces",
      "preview": "palace-preview.png",
      "price": "$35", 
      "count": 16,
      "tags": ["Rococo", "Palace", "Luxury", "Architecture"]
    },
    {
      "name": "Cyberpunk Cities",
      "description": "Neon-lit urban landscapes and futuristic buildings", 
      "folder": "cyberpunk-cities",
      "preview": "cyber-preview.png",
      "price": "$40",
      "count": 24,
      "tags": ["Cyberpunk", "Cities", "Neon", "Future"]
    }
  ],
  "contact_info": {
    "email": "orders@pixelartmaster.com",
    "pinterest": "@pixelartmaster",
    "portfolio": "github.com/pixelartmaster"
  },
  "pricing": {
    "simple_asset": "$15-30",
    "complex_scene": "$50-150", 
    "full_game_pack": "$200-500",
    "custom_commission": "от $100"
  }
};

// DOM Elements
let preloader, scrollProgress, header, nav, mobileMenuBtn, backToTop;
let freeCollectionsGrid, premiumCollectionsGrid;
let lightbox, lightboxImage, lightboxTitle, lightboxDescription, lightboxClose;
let downloadModal, downloadModalClose, downloadBtn, downloadCancelBtn, downloadDescription;
let successModal, successModalClose, successOkBtn;
let orderForm, submitOrderBtn, fileUploadArea, uploadedFiles;
let emailLink;

// State
let isMenuOpen = false;
let currentCollection = null;
let uploadedFilesData = [];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeEventListeners();
    loadCollections();
    setTimeout(hidePreloader, 1500);
});

// Initialize DOM Elements
function initializeElements() {
    preloader = document.getElementById('preloader');
    scrollProgress = document.getElementById('scrollProgress');
    header = document.getElementById('header');
    nav = document.getElementById('nav');
    mobileMenuBtn = document.getElementById('mobileMenuBtn');
    backToTop = document.getElementById('backToTop');
    
    freeCollectionsGrid = document.getElementById('freeCollectionsGrid');
    premiumCollectionsGrid = document.getElementById('premiumCollectionsGrid');
    
    lightbox = document.getElementById('lightbox');
    lightboxImage = document.getElementById('lightboxImage');
    lightboxTitle = document.getElementById('lightboxTitle');
    lightboxDescription = document.getElementById('lightboxDescription');
    lightboxClose = document.getElementById('lightboxClose');
    
    downloadModal = document.getElementById('downloadModal');
    downloadModalClose = document.getElementById('downloadModalClose');
    downloadBtn = document.getElementById('downloadBtn');
    downloadCancelBtn = document.getElementById('downloadCancelBtn');
    downloadDescription = document.getElementById('downloadDescription');
    
    successModal = document.getElementById('successModal');
    successModalClose = document.getElementById('successModalClose');
    successOkBtn = document.getElementById('successOkBtn');
    
    orderForm = document.getElementById('orderForm');
    submitOrderBtn = document.getElementById('submitOrderBtn');
    fileUploadArea = document.getElementById('fileUploadArea');
    uploadedFiles = document.getElementById('uploadedFiles');
    
    emailLink = document.getElementById('emailLink');
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Scroll Events
    window.addEventListener('scroll', handleScroll);
    
    // Mobile Menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Back to Top
    backToTop.addEventListener('click', scrollToTop);
    
    // Lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Download Modal
    downloadModalClose.addEventListener('click', closeDownloadModal);
    downloadCancelBtn.addEventListener('click', closeDownloadModal);
    downloadBtn.addEventListener('click', handleDownload);
    downloadModal.addEventListener('click', function(e) {
        if (e.target === downloadModal) closeDownloadModal();
    });
    
    // Success Modal
    successModalClose.addEventListener('click', closeSuccessModal);
    successOkBtn.addEventListener('click', closeSuccessModal);
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) closeSuccessModal();
    });
    
    // Order Form
    orderForm.addEventListener('submit', handleOrderSubmit);
    
    // File Upload
    const fileInput = document.getElementById('references');
    fileInput.addEventListener('change', handleFileUpload);
    fileUploadArea.addEventListener('dragover', handleDragOver);
    fileUploadArea.addEventListener('drop', handleFileDrop);
    
    // Email Copy
    emailLink.addEventListener('click', copyEmail);
    
    // Keyboard Events
    document.addEventListener('keydown', handleKeyDown);
}

// Preloader
function hidePreloader() {
    preloader.classList.add('hidden');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
}

// Scroll Handling
function handleScroll() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update scroll progress
    scrollProgress.style.width = scrollPercent + '%';
    
    // Show/hide back to top button
    if (scrollTop > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Header background opacity
    const opacity = Math.min(scrollTop / 100, 0.95);
    header.style.background = `rgba(10, 10, 15, ${opacity})`;
}

// Mobile Menu
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    nav.classList.toggle('active', isMenuOpen);
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (isMenuOpen) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = '';
            span.style.opacity = '';
        }
    });
}

// Navigation
function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMobileMenu();
    }
}

// Back to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Load Collections
async function loadCollections() {
    loadFreeCollections();
    loadPremiumCollections();
}

function loadFreeCollections() {
    if (!freeCollectionsGrid) return;
    
    applicationData.free_collections.forEach(collection => {
        const card = createCollectionCard(collection, false);
        freeCollectionsGrid.appendChild(card);
    });
}

function loadPremiumCollections() {
    if (!premiumCollectionsGrid) return;
    
    applicationData.premium_collections.forEach(collection => {
        const card = createCollectionCard(collection, true);
        premiumCollectionsGrid.appendChild(card);
    });
}

function createCollectionCard(collection, isPremium) {
    const card = document.createElement('div');
    card.className = 'collection-card';
    
    const tagsHtml = collection.tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
    
    const actionsHtml = isPremium 
        ? `<button class="btn btn--primary btn-sm" onclick="openPurchaseLink('${collection.folder}')">
             <span class="btn-icon">💳</span>
             Купить ${collection.price}
           </button>
           <button class="btn btn--outline btn-sm" onclick="previewCollection('${collection.folder}')">
             <span class="btn-icon">👁</span>
             Превью
           </button>`
        : `<button class="btn btn--primary btn-sm download-btn" onclick="downloadCollection('${collection.folder}')">
             <span class="btn-icon">⬇</span>
             Скачать бесплатно
           </button>
           <button class="btn btn--outline btn-sm" onclick="previewCollection('${collection.folder}')">
             <span class="btn-icon">👁</span>
             Просмотр
           </button>`;
    
    card.innerHTML = `
        <div class="collection-preview">
            <div class="collection-placeholder">🎨</div>
        </div>
        <div class="collection-info">
            <h3 class="collection-title">${collection.name}</h3>
            <p class="collection-description">${collection.description}</p>
            <div class="collection-meta">
                <span class="collection-count">${collection.count} файлов</span>
                ${isPremium ? `<span class="collection-price">${collection.price}</span>` : ''}
            </div>
            <div class="collection-tags">
                ${tagsHtml}
            </div>
            <div class="collection-actions">
                ${actionsHtml}
            </div>
        </div>
    `;
    
    // Simulate image loading after card creation
    setTimeout(() => {
        const previewContainer = card.querySelector('.collection-preview');
        previewContainer.innerHTML = `<img src="#" alt="${collection.name}" class="collection-image">`;
        
        // Add delay to simulate loading
        setTimeout(() => {
            const img = previewContainer.querySelector('img');
            
            // Apply random background color based on collection
            const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            img.style.backgroundColor = randomColor;
            img.style.objectFit = 'cover';
            
            // Set placeholder image style
            img.style.width = '100%';
            img.style.height = '100%';
            
            // Add pixel art effect pattern
            const overlay = document.createElement('div');
            overlay.className = 'pixel-overlay';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVQImWNgYGD4z4AE/gMADwMB25C7lAAAAAASUVORK5CYII=")';
            overlay.style.backgroundSize = '2px 2px';
            overlay.style.opacity = '0.2';
            overlay.style.pointerEvents = 'none';
            
            previewContainer.appendChild(overlay);
        }, 300);
    }, 100);
    
    return card;
}

// Collection Actions
function downloadCollection(folder) {
    const collection = applicationData.free_collections.find(c => c.folder === folder);
    if (!collection) return;
    
    currentCollection = collection;
    downloadDescription.textContent = `Скачать коллекцию "${collection.name}" (${collection.count} файлов)`;
    downloadModal.classList.add('active');
}

function previewCollection(folder) {
    // Find collection in both free and premium
    let collection = applicationData.free_collections.find(c => c.folder === folder);
    if (!collection) {
        collection = applicationData.premium_collections.find(c => c.folder === folder);
    }
    
    if (!collection) return;
    
    // Create placeholder image for lightbox preview
    const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const previewColor = colors[randomIndex];
    
    // Create a temporary canvas for demo preview image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;
    
    // Fill with collection color
    ctx.fillStyle = previewColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add pixel art patterns
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    for (let x = 0; x < canvas.width; x += 10) {
        for (let y = 0; y < canvas.height; y += 10) {
            if (Math.random() > 0.8) {
                ctx.fillRect(x, y, 10, 10);
            }
        }
    }
    
    // Add collection name
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '30px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(collection.name, canvas.width / 2, canvas.height / 2);
    
    const imageDataUrl = canvas.toDataURL('image/png');
    openLightbox(imageDataUrl, collection.name, collection.description);
}

function openPurchaseLink(folder) {
    // In real implementation, this would redirect to payment system
    alert('Функция покупки будет доступна после интеграции с платежной системой. Свяжитесь с нами для заказа: orders@pixelartmaster.com');
}

function handleDownload() {
    if (!currentCollection) return;
    
    // Update button text and style to indicate download starting
    downloadBtn.textContent = 'Загрузка...';
    downloadBtn.disabled = true;
    
    // Show loading animation
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'spinner';
    loadingSpinner.style.display = 'inline-block';
    loadingSpinner.style.marginLeft = '10px';
    loadingSpinner.style.width = '20px';
    loadingSpinner.style.height = '20px';
    loadingSpinner.style.border = '2px solid rgba(255, 255, 255, 0.3)';
    loadingSpinner.style.borderTop = '2px solid var(--pixel-bg)';
    loadingSpinner.style.borderRadius = '50%';
    loadingSpinner.style.animation = 'spin 1s linear infinite';
    
    downloadBtn.appendChild(loadingSpinner);
    
    // Simulate download delay
    setTimeout(() => {
        // Close modal after "download"
        closeDownloadModal();
        
        // Show download success notification
        const notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.innerHTML = `<div class="download-notification-content">
            <span class="notification-icon">✅</span>
            <span class="notification-text">Коллекция "${currentCollection.name}" успешно загружена!</span>
            <button class="notification-close">×</button>
        </div>`;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--pixel-surface)';
        notification.style.color = 'var(--pixel-text)';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '0';
        notification.style.boxShadow = '0 0 20px var(--pixel-glow)';
        notification.style.zIndex = '10000';
        notification.style.borderLeft = '4px solid var(--pixel-primary)';
        notification.style.animation = 'slideInRight 0.3s ease forwards';
        
        // Create keyframes for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            
            .download-notification-content {
                display: flex;
                align-items: center;
            }
            
            .notification-icon {
                margin-right: 10px;
                font-size: 20px;
            }
            
            .notification-text {
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--pixel-text-muted);
                cursor: pointer;
                font-size: 20px;
                margin-left: 15px;
            }
            
            .notification-close:hover {
                color: var(--pixel-primary);
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        // Close notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease forwards reverse';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideInRight 0.3s ease forwards reverse';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
    }, 2000);
}

// Lightbox
function openLightbox(imageSrc, title, description) {
    lightboxImage.src = imageSrc;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Modals
function closeDownloadModal() {
    downloadModal.classList.remove('active');
    
    // Reset download button
    if (downloadBtn.querySelector('.spinner')) {
        downloadBtn.removeChild(downloadBtn.querySelector('.spinner'));
    }
    downloadBtn.textContent = 'Скачать ZIP';
    downloadBtn.disabled = false;
    
    currentCollection = null;
}

function closeSuccessModal() {
    successModal.classList.remove('active');
}

// Order Form
async function handleOrderSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setButtonLoading(true);
    
    // Simulate form submission
    try {
        await simulateFormSubmission();
        showSuccessModal();
        resetForm();
    } catch (error) {
        alert('Ошибка при отправке заявки. Пожалуйста, свяжитесь с нами напрямую: orders@pixelartmaster.com');
    }
    
    setButtonLoading(false);
}

function validateForm() {
    const requiredFields = ['clientName', 'clientEmail', 'projectDescription'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.focus();
            alert(`Пожалуйста, заполните поле "${field.previousElementSibling.textContent}"`);
            return false;
        }
    }
    
    const email = document.getElementById('clientEmail').value;
    if (!emailRegex.test(email)) {
        document.getElementById('clientEmail').focus();
        alert('Пожалуйста, введите корректный email адрес');
        return false;
    }
    
    return true;
}

async function simulateFormSubmission() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
}

function setButtonLoading(loading) {
    const btnText = submitOrderBtn.querySelector('.btn-text');
    const btnLoader = submitOrderBtn.querySelector('.btn-loader');
    
    if (loading) {
        btnText.style.opacity = '0';
        btnLoader.classList.remove('hidden');
        submitOrderBtn.disabled = true;
    } else {
        btnText.style.opacity = '1';
        btnLoader.classList.add('hidden');
        submitOrderBtn.disabled = false;
    }
}

function showSuccessModal() {
    successModal.classList.add('active');
}

function resetForm() {
    orderForm.reset();
    uploadedFilesData = [];
    updateUploadedFiles();
}

// File Upload
function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    processFiles(files);
}

function handleDragOver(e) {
    e.preventDefault();
    fileUploadArea.style.borderColor = 'var(--pixel-primary)';
    fileUploadArea.style.background = 'rgba(0, 255, 136, 0.1)';
}

function handleFileDrop(e) {
    e.preventDefault();
    fileUploadArea.style.borderColor = '';
    fileUploadArea.style.background = '';
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
}

function processFiles(files) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert(`Файл "${file.name}" слишком большой. Максимальный размер: 10MB`);
            return;
        }
        
        uploadedFilesData.push({
            file: file,
            name: file.name,
            size: formatFileSize(file.size)
        });
    });
    
    updateUploadedFiles();
}

function updateUploadedFiles() {
    uploadedFiles.innerHTML = '';
    
    uploadedFilesData.forEach((fileData, index) => {
        const fileElement = document.createElement('div');
        fileElement.className = 'uploaded-file';
        fileElement.innerHTML = `
            <span class="file-name">${fileData.name} (${fileData.size})</span>
            <button type="button" class="file-remove" onclick="removeFile(${index})">×</button>
        `;
        uploadedFiles.appendChild(fileElement);
    });
}

function removeFile(index) {
    uploadedFilesData.splice(index, 1);
    updateUploadedFiles();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Email Copy
function copyEmail(e) {
    e.preventDefault();
    const email = 'orders@pixelartmaster.com';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
            showCopyFeedback();
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyFeedback();
    }
}

function showCopyFeedback() {
    const originalText = emailLink.textContent;
    emailLink.textContent = 'Email скопирован!';
    emailLink.style.color = 'var(--pixel-primary)';
    
    setTimeout(() => {
        emailLink.textContent = originalText;
        emailLink.style.color = '';
    }, 2000);
}

// Keyboard Events
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        if (lightbox.classList.contains('active')) {
            closeLightbox();
        } else if (downloadModal.classList.contains('active')) {
            closeDownloadModal();
        } else if (successModal.classList.contains('active')) {
            closeSuccessModal();
        }
    }
}

// Add pixel hover effects to collection cards
function addPixelHoverEffects() {
    document.querySelectorAll('.collection-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const mouseX = e.clientX - cardRect.left;
            const mouseY = e.clientY - cardRect.top;
            
            // Calculate distance from center
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            // Max tilt is 15 degrees
            const maxTilt = 5;
            
            // Calculate tilt
            const tiltX = ((mouseY - centerY) / centerY) * maxTilt;
            const tiltY = ((centerX - mouseX) / centerX) * maxTilt;
            
            // Apply transform
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
            
            // Add glow effect based on mouse position
            const glowX = ((mouseX / cardRect.width) * 100);
            const glowY = ((mouseY / cardRect.height) * 100);
            
            card.style.boxShadow = `
                0 0 30px var(--pixel-shadow),
                inset 0 0 30px rgba(0, 255, 136, 0.1),
                0 5px 15px rgba(0, 0, 0, 0.3)
            `;
            
            // Add a radial gradient for glow effect
            card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0, 255, 136, 0.2) 0%, var(--pixel-surface) 60%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.background = '';
        });
    });
}

// Initialize animations after collections are loaded
setTimeout(() => {
    observeElements();
    addPixelHoverEffects();
}, 500);

// Intersection Observer for Animations
function observeElements() {
    if (!('IntersectionObserver' in window)) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add initial styles to collection cards for animation
    document.querySelectorAll('.collection-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Progressive Enhancement
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration could be added here for PWA features
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Make functions globally available for inline event handlers
window.downloadCollection = downloadCollection;
window.previewCollection = previewCollection;
window.openPurchaseLink = openPurchaseLink;
window.removeFile = removeFile;