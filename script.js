// Initialize the cart, loading from localStorage if available
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add an item to the cart
function addToCart(itemName, itemPrice) {
    const itemId = new Date().getTime(); // Unique ID based on timestamp
    cart.push({ id: itemId, name: itemName, price: itemPrice });

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart total and save it to localStorage
    updateCartSummary();

    // Immediately update the current page's display
    displayCart();
}

// Function to calculate and update the total
function updateCartSummary() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    localStorage.setItem("cartTotal", total.toFixed(2)); // Save the total to localStorage
    displayCartSummary();
}

// Function to display the cart summary (used on all pages)
function displayCartSummary() {
    const totalElement = document.getElementById("total");
    const cartCountElement = document.getElementById("cart-count");

    // Ensure elements exist before updating
    if (totalElement) {
        const total = localStorage.getItem("cartTotal") || "0.00";
        totalElement.textContent = total;
    }

    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCountElement.textContent = cart.length;
    }
}

// Function to display the cart items (specific to cart.html)
function displayCart() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartDetails = "";
    let total = 0;

    // Loop through each cart item to create the HTML content
    cart.forEach((item) => {
        cartDetails += `<div class="cart-item">
                      <p>${item.name} - $${item.price}</p>
                      <button onclick="removeFromCart(${item.id})">Remove</button>
                    </div>`;
        total += item.price;
    });

    // Display the cart items
    const cartItems = document.getElementById("cart-items");
    if (cartItems) {
        cartItems.innerHTML = cartDetails;
    }

    // Update the total price in the cart summary
    displayCartSummary();
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    // Filter out the removed item
    cart = cart.filter((item) => item.id !== itemId);

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart total and save it to localStorage
    updateCartSummary();

    // Immediately update the cart display
    displayCart();
}
function clearCart() {
    // Remove the cart data from localStorage
    localStorage.removeItem("cart");

    // Reinitialize the cart to an empty array
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart view after clearing the cart
    displayCart();
}

// Listen for storage events to update the summary in real-time across pages
window.addEventListener("storage", (event) => {
    if (event.key === "cart" || event.key === "cartTotal") {
        displayCartSummary();
    }
});

// Initialize the cart summary and display cart items on page load
document.addEventListener("DOMContentLoaded", () => {
    displayCartSummary();
    displayCart();
});
