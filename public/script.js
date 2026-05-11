// ======================================================
// YOUR PORTFOLIO DATA (With Prices, PNGs, and Descriptions)
// ======================================================

const designs = [
    { 
        id: 1, 
        name: "UI/UX Enthusiast", 
        price: 30,
        src: "./images/yellow.png",
        description: "A vibrant, interactive profile design with floating animated background elements and direct resume download links.",
        url: "https://your-live-website-link.com/1" 
    },
    { 
        id: 2, 
        name: "Cyber-Tech Architecture", 
        price: 40,
        src: "./images/Screenshot 2026-05-03 102817.png",
        description: "A dark-mode cyber aesthetic featuring glowing cyan accents, perfect for highlighting interactive UI/UX architecture.",
        url: "https://your-live-website-link.com/2" 
    },
    { 
        id: 3, 
        name: "Professional Minimalist", 
        price: 25,
        src: "images/Screenshot 2026-05-03 102342.png",
        description: "A high-contrast yellow and black theme focusing on clean typography and straightforward professional presentation.",
        url: "https://your-live-website-link.com/3" 
    },
    { 
        id: 4, 
        name: "Glassmorphism Frontend", 
        price: 35,
        src: "images/Screenshot 2026-05-03 101801.png",
        description: "Modern gradient text with smooth scroll interactions, ideal for showcasing mobile and software development experience.",
        url: "https://your-live-website-link.com/4" 
    },
    { 
        id: 5, 
        name: "CSE Developer Portfolio", 
        price: 45,
        src: "images/Screenshot 2026-05-03 100720.png",
        description: "A clean command-line style terminal interface designed specifically for Computer Science Engineers and full-stack developers.",
        url: "https://your-live-website-link.com/5" 
    },
    { 
        id: 6, 
        name: "Bold Typography", 
        price: 30,
        src: "images/Screenshot 2026-05-03 095723.png",
        description: "An ultra-modern, text-heavy landing page that immediately grabs attention with massive, responsive typography.",
        url: "https://your-live-website-link.com/6" 
    },
    { 
        id: 7, 
        name: "Hardware/Embedded Hub", 
        price: 40,
        src: "images/Screenshot 2026-05-03 094808.png",
        description: "A specialized portfolio theme featuring circuit board imagery and glowing green accents for embedded systems developers.",
        url: "https://your-live-website-link.com/7" 
    },
    { 
        id: 8, 
        name: "Future ECE Portfolio", 
        price: 35,
        src: "images/Screenshot 2026-05-03 093319.png",
        description: "A sleek, centered card-based design with soft blue ambient glows, tailored for Electronics & Communication Engineering students.",
        url: "https://your-live-website-link.com/8" 
    }
];

// --- RENDER LOGIC ---
const grid = document.getElementById('product-grid');

function renderDesigns() {
    grid.innerHTML = designs.map(design => {
        return `
        <div class="card" onmousemove="rotateCard(event, this)" onmouseleave="resetCard(this)" style="display: flex; flex-direction: column;">
            <div class="media-container">
                <img src="${design.src}" alt="${design.name}" class="card-media" style="object-fit: cover; width: 100%; height: 100%;">
            </div>
            
            <div class="card-content" style="display: flex; flex-direction: column; flex-grow: 1; padding: 20px;">
                <h3 class="card-title" style="margin-bottom: 5px;">${design.name}</h3>
                <span style="color: var(--secondary); font-weight: bold; margin-bottom: 10px; display: block;">$${design.price}</span>
                
                <p style="color: #bbb; font-size: 14px; line-height: 1.6; margin-bottom: 20px; flex-grow: 1;">
                    ${design.description}
                </p>
                
                <div style="display: flex; gap: 10px; width: 100%;">
                    <a href="${design.url}" target="_blank" style="flex: 1; text-align: center; text-decoration: none; padding: 10px; border-radius: 8px; background: transparent; color: white; border: 2px solid var(--primary); transition: 0.3s; font-weight: bold; font-size: 14px;">View Site</a>
                    
                    <button onclick="addToCart(${design.id})" style="flex: 1; padding: 10px; border-radius: 8px; background: linear-gradient(45deg, var(--primary), #9965f4); color: white; border: none; font-weight: bold; cursor: pointer; transition: 0.3s; font-size: 14px;">Add to Cart</button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// --- 3D CARD ANIMATION ---
function rotateCard(e, card) {
    const cardRect = card.getBoundingClientRect();
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;
    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;
    const rotateX = ((y - centerY) / 10) * -1;
    const rotateY = (x - centerX) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
}

function resetCard(card) {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
}

// --- SCROLL ANIMATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('show'); }
    });
});
document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

// --- CART & CHECKOUT ---
let cart = [];
const cartCountEl = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

function addToCart(id) {
    const item = designs.find(d => d.id === id);
    if(item) {
        cart.push(item);
        updateCartUI();
        alert(`${item.name} added to your cart!`);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    if(cartCountEl) cartCountEl.innerText = cart.length;
    
    let total = 0;
    if (cart.length === 0) {
        if(cartItemsContainer) cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        if(totalPriceEl) totalPriceEl.innerText = '0';
        if(document.getElementById('checkout-btn')) document.getElementById('checkout-btn').style.display = 'none';
    } else {
        total = cart.reduce((sum, item) => sum + item.price, 0);
        if(cartItemsContainer) {
            cartItemsContainer.innerHTML = cart.map((item, index) => `
                <div style="display:flex; justify-content:space-between; margin:10px 0; border-bottom:1px solid #333; padding-bottom:10px;">
                    <span>${item.name}</span>
                    <div>
                        <span style="color:#03dac6">$${item.price}</span>
                        <span style="color:red; cursor:pointer; margin-left:10px;" onclick="removeFromCart(${index})">&times;</span>
                    </div>
                </div>
            `).join('');
        }
        if(totalPriceEl) totalPriceEl.innerText = total;
        if(document.getElementById('checkout-btn')) document.getElementById('checkout-btn').style.display = 'block';
    }
}

function openCart() { 
    if(cartModal) cartModal.style.display = 'block'; 
}

function closeModal() { 
    if(cartModal) cartModal.style.display = 'none'; 
}

// --- WHATSAPP CHECKOUT ---
function checkoutWithWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello C.R Web Designing, I am interested in purchasing the following templates:\n\n";
    cart.forEach(item => {
        message += `▪️ ${item.name} ($${item.price})\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `\n*Total: $${total}*\n\nPlease let me know how to proceed with the payment!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "917989004552"; 
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
}

// --- WHATSAPP CONTACT FORM ---
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const userMessage = document.getElementById("message").value;
            
            const whatsappMessage = `Hello, my name is ${name}.\nEmail: ${email}\n\nMessage: ${userMessage}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappNumber = "917989004552";
            
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
            
            document.getElementById("successMessage").style.display = "block";
            this.reset();
            setTimeout(() => {
                document.getElementById("successMessage").style.display = "none";
            }, 3000);
        });
    }
});

// --- PHONE NUMBER POPUP LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    const phoneModal = document.getElementById('phone-modal');
    const hasProvidedPhone = localStorage.getItem('phoneProvided');

    if (!hasProvidedPhone && phoneModal) {
        setTimeout(() => {
            phoneModal.style.display = 'block';
        }, 5000); 
    }
});

function closePhoneModal() {
    const modal = document.getElementById('phone-modal');
    if(modal) modal.style.display = 'none';
}

function submitPhone() {
    const phoneVal = document.getElementById('visitor-phone').value;
    if(phoneVal.length >= 7) { 
        localStorage.setItem('phoneProvided', 'true'); 
        closePhoneModal();
        alert("Thank you! Your number has been received.");
    } else {
        alert("Please enter a valid phone number.");
    }
}

// Initial Render
renderDesigns();