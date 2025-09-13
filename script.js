// ==== CART FUNCTIONALITY =====
let cart = [];
let currentOrder = null;

// Function to update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const mobileCartCount = document.getElementById('mobile-cart-count');
    
    if (cart.length > 0) {
        cartCount.textContent = cart.length;
        cartCount.classList.remove('hidden');
        mobileCartCount.textContent = cart.length;
    } else {
        cartCount.classList.add('hidden');
        mobileCartCount.textContent = '0';
    }
}

// Function to show cart notification
function showCartNotification(message) {
    const notification = document.getElementById('cart-notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = message;
    notification.classList.add('active');
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Function to add product to cart
function addToCart(productId, productName, productPrice) {
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1
        });
    }
    
    updateCartCount();
    showCartNotification(`${productName} added to cart!`);
}

// Function to handle buy now
function buyNow(productId, productName, productPrice) {
    cart = [{
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        quantity: 1
    }];
    
    updateCartCount();
    showOrderModal();
}

// Function to show order modal
function showOrderModal() {
    const orderModal = document.getElementById('order-modal');
    const orderSummary = document.getElementById('order-summary');
    const orderTotal = document.getElementById('order-total');
    
    let total = 0;
    let summaryHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        summaryHTML += `
            <div class="flex justify-between items-center mb-2">
                <span>${item.name} x${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    orderSummary.innerHTML = summaryHTML;
    orderTotal.textContent = `$${total.toFixed(2)}`;
    
    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to handle order form submission
function handleOrderSubmission(e) {
    e.preventDefault();
    
    const name = document.getElementById('order-name').value;
    const email = document.getElementById('order-email').value;
    
    alert(`Thank you for your order, ${name}! A confirmation has been sent to ${email}.`);
    
    closeOrderModal();
    cart = [];
    updateCartCount();
}

// Function to close order modal
function closeOrderModal() {
    const orderModal = document.getElementById('order-modal');
    orderModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== SEARCH FUNCTIONALITY =====
function showSearchModal() {
    const searchModal = document.getElementById('search-modal');
    searchModal.classList.add('active');
    document.getElementById('search-input').focus();
    document.body.style.overflow = 'hidden';
}

function closeSearchModal() {
    const searchModal = document.getElementById('search-modal');
    searchModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    
    if (searchTerm.length < 2) {
        searchResults.classList.add('hidden');
        return;
    }
    
    const products = [
        { name: 'Classic Black Frames', price: '$149.99', category: 'Eyeglasses' },
        { name: 'Blue Light Glasses', price: '$129.99', category: 'Eyeglasses' },
        { name: 'Gold Metal Frames', price: '$189.99', category: 'Eyeglasses' },
        { name: 'Sport Sunglasses', price: '$159.99', category: 'Sunglasses' },
        { name: 'Aviator Sunglasses', price: '$139.99', category: 'Sunglasses' },
        { name: 'Designer Cat-Eye Frames', price: '$179.99', category: 'Eyeglasses' }
    ];
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm)
    );
    
    let resultsHTML = '';
    
    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            resultsHTML += `
                <div class="glass-effect rounded-lg p-4 flex justify-between items-center">
                    <div>
                        <h5 class="font-medium text-slate-100">${product.name}</h5>
                        <p class="text-slate-400 text-sm">${product.category}</p>
                    </div>
                    <span class="text-indigo-300 font-semibold">${product.price}</span>
                </div>
            `;
        });
    } else {
        resultsHTML = '<p class="text-slate-400 text-center py-4">No products found. Try a different search term.</p>';
    }
    
    searchResults.innerHTML = resultsHTML;
    searchResults.classList.remove('hidden');
}

// ===== MOBILE MENU FUNCTIONALITY =====
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeMenu.addEventListener('click', closeMobileMenu);
menuOverlay.addEventListener('click', closeMobileMenu);

const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            addToCart(id, name, price);
        });
    });
    
    // Buy now buttons
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            buyNow(id, name, price);
        });
    });
    
    // Search functionality
    document.getElementById('search-btn').addEventListener('click', showSearchModal);
    document.getElementById('mobile-search-btn').addEventListener('click', function() {
        closeMobileMenu();
        showSearchModal();
    });
    document.getElementById('close-search').addEventListener('click', closeSearchModal);
    document.getElementById('search-input').addEventListener('input', performSearch);
    
    // Order functionality
    document.getElementById('order-form').addEventListener('submit', handleOrderSubmission);
    document.getElementById('close-order').addEventListener('click', closeOrderModal);
    
    // Cart button
    document.getElementById('cart-btn').addEventListener('click', function() {
        if (cart.length > 0) {
            showOrderModal();
        } else {
            showCartNotification('Your cart is empty!');
        }
    });
    
    document.getElementById('mobile-cart-btn').addEventListener('click', function() {
        closeMobileMenu();
        if (cart.length > 0) {
            showOrderModal();
        } else {
            showCartNotification('Your cart is empty!');
        }
    });
    
    // Logo click to go home
    document.getElementById('logo-link').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.getElementById('mobile-logo-link').addEventListener('click', function(e) {
        e.preventDefault();
        closeMobileMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ==== Contact form using Formspree JSON submit ====
    document.getElementById('contact-form').addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const formData = { name, email, message };

        try {
            const response = await fetch('https://formspree.io/f/xwpnzaak', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            alert('Error sending message: ' + error.message);
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Initialize cart count
    updateCartCount();
});
